const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    console.log('userUpdated', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log('new user', newUser);
    res.json(newUser);
  }
};

exports.currenUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) throw new Error('no user was found with that email');
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
