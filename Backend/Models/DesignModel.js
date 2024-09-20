// designModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DesignSchema = new Schema({
  defDirectory: String,
  lefDirectory: String,
  libDirectory: String,
  techDirectory: String
});

const Design = mongoose.model('DesignSchema', DesignSchema);

module.exports = Design;
