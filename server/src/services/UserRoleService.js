// server/src/services/UserRoleService.js

import AppError from "../utils/AppError.js";

import UserRepository from "../repositories/UserRepository.js";
import RoleRepository from "../repositories/RoleRepository.js";
import CompanyRepository from "../repositories/CompanyRepository.js";
import UserRoleRepository from "../repositories/UserRoleRepository.js";

export default class UserRoleService {
  static async assign(payload) {
    const [user, role, company] = await Promise.all([
      UserRepository.findById(payload.user),
      RoleRepository.findById(payload.role),
      CompanyRepository.findById(payload.company)
    ]);

    if (!user) {
      throw new AppError(
        "User not found.",
        404,
        "USER_NOT_FOUND"
      );
    }

    if (!role) {
      throw new AppError(
        "Role not found.",
        404,
        "ROLE_NOT_FOUND"
      );
    }

    if (!company) {
      throw new AppError(
        "Company not found.",
        404,
        "COMPANY_NOT_FOUND"
      );
    }

    const existing = await UserRoleRepository.findOne(
      payload.user,
      payload.company
    );

    if (existing) {
      return UserRoleRepository.update(existing._id, {
        role: payload.role
      });
    }

    const created = await UserRoleRepository.create({
      user: payload.user,
      role: payload.role,
      company: payload.company,
      active: true
    });

    return UserRoleRepository.findOne(
      payload.user,
      payload.company
    ) || created;
  }

  static async list(companyId) {
    return UserRoleRepository.list(companyId);
  }
}
