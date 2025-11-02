const express = require("express");
const router = express.Router();
const Incident = require("../models/incidents");


router.get("/all", async (req, res) => {
  try {
    const { country, topic, end_year } = req.query;
    const filter = {};

    if (country) filter.country = country;
    if (topic) filter.topic = topic;
    if (end_year) filter.end_year = end_year;

    const docs = await Incident.find(filter).limit(50);
    res.json(docs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/aggregate/byEndYear", async (req, res) => {
  try {
    const { country, topic } = req.query;
    const match = {};
    if (country) match.country = country;
    if (topic) match.topic = topic;

    const data = await Incident.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$end_year",
          avgIntensity: { $avg: "$intensity" },
          avgLikelihood: { $avg: "$likelihood" },
          avgRelevance: { $avg: "$relevance" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/aggregate/byCountry", async (req, res) => {
  try {
    const { topic } = req.query;
    const match = {};
    if (topic) match.topic = topic;

    const data = await Incident.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
          avgIntensity: { $avg: "$intensity" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/filters", async (req, res) => {
  try {
    const countries = await Incident.distinct("country");
    const topics = await Incident.distinct("topic");
    const years = await Incident.distinct("end_year");
    res.json({ countries, topics, years });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
