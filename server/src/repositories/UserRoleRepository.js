// server/src/repositories/UserRoleRepository.js

import UserRole from "../models/UserRole.js";

export default class UserRoleRepository {
  static async create(payload, session = null) {
    if (session) {
      const [userRole] = await UserRole.create(
        [payload],
        { session }
      );

      return userRole;
    }

    return UserRole.create(payload);
  }

  static async findOne(userId, companyId) {
    return UserRole.findOne({
      user: userId,
      company: companyId,
      active: true
    })
      .populate("role")
      .populate("company");
  }

  static async findByUser(userId) {
    return UserRole.find({
      user: userId,
      active: true
    })
      .populate("role")
      .populate("company");
  }

  static async findByRole(roleId) {
    return UserRole.find({
      role: roleId,
      active: true
    })
      .populate("user")
      .populate("company");
  }

  static async list(companyId) {
    return UserRole.find({
      company: companyId,
      active: true
    })
      .populate("user", "firstName lastName email")
      .populate("role");
  }

  static async update(id, payload) {
    return UserRole.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("user", "firstName lastName email")
      .populate("role");
  }

  static async delete(id, session = null) {
    const query =
      UserRole.findByIdAndDelete(id);

    if (session) {
      query.session(session);
    }

    return query;
  }
}
