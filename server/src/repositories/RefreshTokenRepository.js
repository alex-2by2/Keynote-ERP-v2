// server/src/repositories/RefreshTokenRepository.js

import RefreshToken from "../models/RefreshToken.js";

export default class RefreshTokenRepository {
  static async create(payload) {
    return RefreshToken.create(payload);
  }

  static async findByToken(token) {
    return RefreshToken.findOne({ token }).populate("user");
  }

  static async revoke(token, revokedByIp = null) {
    return RefreshToken.findOneAndUpdate(
      { token },
      {
        revokedAt: new Date(),
        revokedByIp
      },
      {
        new: true
      }
    );
  }

  static async revokeAllForUser(userId, revokedByIp = null) {
    return RefreshToken.updateMany(
      {
        user: userId,
        revokedAt: null
      },
      {
        revokedAt: new Date(),
        revokedByIp
      }
    );
  }

  static async deleteExpired() {
    return RefreshToken.deleteMany({
      expiresAt: {
        $lte: new Date()
      }
    });
  }
}
