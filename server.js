
require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();


app.use(express.json());
app.use(cors());


console.log("MONGO_URI:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Connection error:", err));


const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
