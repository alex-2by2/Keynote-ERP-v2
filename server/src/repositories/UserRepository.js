import User from "../models/User.js";

export default class UserRepository {
  static create(data) {
    return User.create(data);
  }

  static findById(id) {
    return User.findById(id);
  }

  static findByEmail(email) {
    return User.findOne({
      email: email.toLowerCase()
    }).select("+password");
  }

  static exists(email) {
    return User.exists({
      email: email.toLowerCase()
    });
  }
}
