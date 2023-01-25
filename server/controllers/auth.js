const Customer = require('../models/customer');

exports.createOrUpdateCustomer = async (req, res) => {
  const { name, picture, email } = req.customer;

  const customer = await Customer.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (customer) {
    console.log('customerUpdated', customer);
    res.json(customer);
  } else {
    const newCustomer = await new Customer({
      email,
      name,
      picture,
    }).save();
    console.log('new customer', newCustomer);
    res.json(newCustomer);
  }
};

exports.currentCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.customer.email });
    if (!customer) throw new Error('No customer was found with that email');
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).send('No existe');
  }
};
