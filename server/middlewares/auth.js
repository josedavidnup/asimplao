const admin = require('../firebase');
const Customer = require('../models/customer');

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseCustomer = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    req.customer = firebaseCustomer;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

exports.retailerCheck = async (req, res, next) => {
  const { email } = req.customer;

  const retailerAuth = await Retailer.findOne({ email }).exec();

  if (retailerAuth.role !== 'retailer') {
    res.status(403).json({
      err: 'retailer access denied',
    });
  } else {
    next();
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.customer;

  const adminAuth = await Customer.findOne({ email }).exec();

  if (adminAuth.role !== 'admin') {
    res.status(403).json({
      err: 'Admin access denied',
    });
  } else {
    next();
  }
};

exports.superAdminCheck = async (req, res, next) => {
  const { email } = req.customer;

  const superAdminAuth = await Superadmin.findOne({ email }).exec();

  if (superAdminAuth.role !== 'superadmin') {
    res.status(403).json({
      err: 'Admin access denied',
    });
  } else {
    next();
  }
};
