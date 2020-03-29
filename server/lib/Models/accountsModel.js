const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, index: { unique: true } },
  accountName: String,
  type: String,
  role: String,
  state: {
    status: String
  },
  profilePhotoUrl: String,
  accountNumber: String,
  permissionLevel: String,
  organizationInfo: {
    registeredDomain: String,
    postalAddress: {
      revision: Number,
      regionCode: String,
      languageCode: String,
      postalCode: String,
      sortingCode: String,
      administrativeArea: String,
      locality: String,
      sublocality: String,
      addressLines: [String],
      recipients: [String],
      organization: String
    },
    phoneNumber: String
  }
});

module.exports = mongoose.model('accounts', accountSchema);
