import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
  static create(data) {
    return UserRepository.create(data);
  }

  static findByEmail(email) {
    return UserRepository.findByEmail(email);
  }

  static findById(id) {
    return UserRepository.findById(id);
  }

  static exists(email) {
    return UserRepository.exists(email);
  }
}
