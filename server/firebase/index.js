var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.FB_SERVICE_ACCOUNT);
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
