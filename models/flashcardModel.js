const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const cardSchema = new Schema({
  name: String,
  word: Array,
  creator: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;