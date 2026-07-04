// server/src/services/SetupService.js

import mongoose from "mongoose";

import AppError from "../utils/AppError.js";

import SetupRepository from "../repositories/SetupRepository.js";
import UserRoleRepository from "../repositories/UserRoleRepository.js";

import CompanyService from "./CompanyService.js";
import UserService from "./UserService.js";
import FinancialYearService from "./FinancialYearService.js";
import PermissionService from "./PermissionService.js";
import RoleService from "./RoleService.js";
import RefreshTokenService from "./RefreshTokenService.js";

import { generateAccessToken } from "../utils/jwt.js";

export default class SetupService {
  static async isInitialized() {
    return SetupRepository.isInitialized();
  }

  static async initialize(payload) {
    const initialized =
      await SetupRepository.isInitialized();

    if (initialized) {
      throw new AppError(
        "ERP is already initialized.",
        409,
        "ERP_ALREADY_INITIALIZED"
      );
    }

    const session =
      await mongoose.startSession();

    session.startTransaction();

    try {
      const {
        company,
        owner,
        financialYear
      } = payload;

      // Seed Default Permissions
      await PermissionService.seedDefaults(
        session
      );

      // Seed Default Roles
      const createdRoles = await RoleService.seedDefaults(
        session
      );

      const ownerRole = createdRoles.find(
        role => role.code === "OWNER"
      );

      if (!ownerRole) {
        throw new AppError(
          "Owner role could not be created.",
          500,
          "OWNER_ROLE_MISSING"
        );
      }

      // Create Company
      const createdCompany =
        await CompanyService.create(
          company,
          session
        );
            // Create Owner User
      const createdOwner =
        await UserService.create(
          {
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            password: owner.password,

            // Legacy field — still checked by the authorize()
            // middleware across existing routes
            role: "admin",

            isActive: true
          },
          session
        );

      // Link Owner to the seeded RBAC "OWNER" role
      // (source of truth once routes migrate off the
      // legacy role string above)
      await UserRoleRepository.create(
        {
          user: createdOwner._id,
          role: ownerRole._id,
          company: createdCompany._id,
          active: true
        },
        session
      );

      // Create Financial Year
      const createdFinancialYear =
        await FinancialYearService.create(
          {
            ...financialYear,
            company: createdCompany._id,
            isCurrent: true
          },
          session
        );

      // Generate JWT Access Token
      const accessToken =
        generateAccessToken({
          sub: createdOwner.id,
          role: createdOwner.role,
          email: createdOwner.email
        });

      // Issue Refresh Token
      const refreshToken =
        await RefreshTokenService.issue(
          createdOwner.id
        );
            // Commit Transaction
      await session.commitTransaction();

      return {
        initialized: true,

        accessToken,

        refreshToken: refreshToken.token,

        expiresAt: refreshToken.expiresAt,

        company: createdCompany,

        financialYear: createdFinancialYear,

        user: {
          id: createdOwner.id,
          firstName: createdOwner.firstName,
          lastName: createdOwner.lastName,
          email: createdOwner.email,
          role: createdOwner.role
        }
      };
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      session.endSession();
    }
  }
}
