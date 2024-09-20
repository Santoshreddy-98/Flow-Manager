const mongoose = require('mongoose');

const DesignVariable = new mongoose.Schema({
  
  design: {
    type: String,
    required: true,
  },
  num_cpu: {
    type: String,
    default: 'Number'
  },
  power_opt: {
    type : Boolean,
    required:"true"
  },
  gen_eff: {
    type : String,
    required: true,
  },
});


module.exports =mongoose.model('DesignVariable',DesignVariable);