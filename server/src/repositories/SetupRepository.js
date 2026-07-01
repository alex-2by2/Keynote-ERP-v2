// server/src/repositories/SetupRepository.js

import Company from "../models/Company.js";
import User from "../models/User.js";

export default class SetupRepository {
  static async isInitialized() {
    const [companyCount, userCount] =
      await Promise.all([
        Company.countDocuments(),
        User.countDocuments({
          role: "admin"
        })
      ]);

    return companyCount > 0 && userCount > 0;
  }

  static async hasCompany() {
    return Company.exists({});
  }

  static async hasAdmin() {
    return User.exists({
      role: "admin"
    });
  }
}
