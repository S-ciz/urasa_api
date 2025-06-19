const mongoose = require('mongoose');

const EditorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
 image: {
     type: String
  },
  public_id: {
    type: String
  }

}, {timestamps: true});

const EditorModel = mongoose.model('Editor', EditorSchema);

module.exports = EditorModel;