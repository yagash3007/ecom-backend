const User = require("../model/user");

const getUserDao = async () => {
  try {
    const users = await User.find();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const postUserDao = async (data) => {
  try {
    const user = new User(data);
    await user.save();
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error saving user:", error);
    return null;
  }
};

const getsingleid_dao = async (id) => {
  try {
    const user = await User.findById(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const update_data = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return user;
  } catch (error) {
    console.error("Error updating user in DB:", error.message);
    throw new Error("Failed to update user");
  }
};

const delete_dao = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

module.exports = {
  update_data,
  getUserDao,
  postUserDao,
  getsingleid_dao,
  delete_dao,
};
