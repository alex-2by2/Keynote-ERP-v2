// server/src/services/SetupService.js

import SetupRepository from "../repositories/SetupRepository.js";
import AppError from "../utils/AppError.js";

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

    return {
      initialized: false,
      message:
        "Initialization logic will be added in the next step.",
      payload
    };
  }
}
