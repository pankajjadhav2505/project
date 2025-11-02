const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  end_year: Number,
  country: String,
  region: String,
  city: String,
  topics: [String],
  sector: String,
  pest: String,
  source: String,
  swot: String
}, { strict: false });

module.exports = mongoose.model('Incident', IncidentSchema);
