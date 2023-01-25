const admin = require('../firebase');
const Customer = require('../models/customer');

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseCustomer = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log(firebaseCustomer);
    req.customer = firebaseCustomer;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.customer;

  const adminCustomer = await Customer.findOne({ email }).exec();

  if (adminCustomer.role !== 'admin') {
    res.status(403).json({
      err: 'Admin access denied',
    });
  } else {
    next();
  }
};
