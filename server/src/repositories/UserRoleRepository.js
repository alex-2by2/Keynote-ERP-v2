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

  static async delete(id, session = null) {
    const query =
      UserRole.findByIdAndDelete(id);

    if (session) {
      query.session(session);
    }

    return query;
  }
}
