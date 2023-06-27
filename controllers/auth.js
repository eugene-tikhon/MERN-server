import { User } from "../models/user.js";

/**
 * register
 */
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ err: "Please provide required values: name, email, password" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res
      .status(400)
      .json({ err: `User with such email already exists: ${email}` });
  }

  try {
    const user = new User(req.body);

    await user.save();
    res.status(201).json({
      isOk: true,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token: user.createJWT(),
    });
  } catch (error) {
    next(error); // will be handled by Error-handle middleware
  }
};

/**
 * login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ err: "Please provide required values: email, password" });
  }

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    res.status(401).json({ err: "Please provide valid email" });
  }

  const isValidPassword = await existingUser.comparePasswords(password);
  console.log("isValidPassword", isValidPassword);
  if (!isValidPassword) {
    res.status(401).json({ err: "Please provide valid password" });
  }

  existingUser.password = undefined; //Removing password from the response
  res.status(201).json({
    isOk: true,
    user: existingUser,
    token: existingUser.createJWT(),
    location: existingUser.location,
  });
};

/**
 * updateUser
 */
export const updateUser = async (req, res) => {
  const { name, lastName, email, location, password } = req.body;

  if (!name || !email) {
    res
      .status(400)
      .json({ err: "Please provide required values: name, email" });
  }

  // const existingUser = await User.findOneAndUpdate({_id: req.user.userId}, req.body, {new: true});
  const existingUser = await User.findOne({ _id: req.user.userId });
  if (!existingUser) {
    res.status(401).json({ err: "User is not found" });
  }

  existingUser.name = name;
  existingUser.lastName = lastName;
  existingUser.email = email;
  existingUser.location = location;
  if (password) existingUser.password = password;

  await existingUser.save();

  res.status(200).json({
    isOk: true,
    user: {
      name: existingUser.name,
      lastName: existingUser.lastName,
      email: existingUser.email,
      location: existingUser.location,
    },
    token: existingUser.createJWT(),
    location: existingUser.location,
  });
};
