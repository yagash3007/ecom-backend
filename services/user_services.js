const userDao = require("../dao/user_dao");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

const getUser = async (req, res) => {
  try {
    const users = await userDao.getUserDao();
    console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  console.log("Logging out");
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logout successful" });
};

const postUser = async (req, res) => {
  const { firstname, lastname, name, email, password, phoneno } = req.body;

  if (!firstname || firstname.trim() === "") {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!lastname || lastname.trim() === "") {
    return res.status(400).json({ message: "Last name is required " });
  }

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "A valid email is required" });
  }

  if (!password || password.trim() === "" || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (!phoneno || phoneno.trim() === "") {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      name,
      email,
      password: hashedPassword,
      phoneno,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const getsingleid = async (req, res) => {
  try {
    const user = await userDao.getsingleid_dao(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const editby_id = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    for (const key in updateData) {
      if (
        typeof updateData[key] === "string" &&
        updateData[key].trim() === ""
      ) {
        return res
          .status(400)
          .json({ message: `${key} cannot be an empty string` });
      }
    }

    const user = await userDao.update_data(id, updateData);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const delete_by_id = async (req, res) => {
  try {
    const user = await userDao.delete_dao(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  logout,
  editby_id,
  getUser,
  postUser,
  getsingleid,
  delete_by_id,
};
