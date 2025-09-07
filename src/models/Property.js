const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, default: 'https://via.placeholder.com/600x400?text=Property' },
  description: { type: String, default: '' },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  areaSqFt: { type: Number, default: 0 },
  propertyType: { type: String, enum: ['Apartment','House','Villa','Plot','Other'], default: 'Apartment' }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
