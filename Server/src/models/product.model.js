"use strict";

const { model, Schema } = require("mongoose"); // Erase if already required
const slugify = require("slugify");

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    categoy_id: { type: Schema.Types.ObjectId, ref: "Category" },
    product_price: { type: Number, required: true },
    product_slug: { type: Number, required: true },
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
    product_ratingsAvergage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

// Create index for search
productSchema.index({ product_name: "text", product_description: "text" });

// Document middleware: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

// define the product type = clothing
// find in category

const clothingSchema = new Schema(
  {
    brand: String,
    size: String,
    material: String,
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collection: "clothes",
    timestamps: true,
  }
);

const electronicSchema = new Schema(
  {
    manufacturer: String,
    model: String,
    color: String,
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collection: "electronics",
    timestamps: true,
  }
);

const furnitureSchema = new Schema(
  {
    brand: String,
    size: String,
    material: String,
    shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collection: "furnitures",
    timestamps: true,
  }
);

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  electronic: model("Electronic", electronicSchema),
  clothing: model("Clothing", clothingSchema),
  furniture: model("Furniture", furnitureSchema),
};
