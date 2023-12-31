const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const ShopSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const ShopModel = model(DOCUMENT_NAME, ShopSchema);

module.exports = ShopModel;
