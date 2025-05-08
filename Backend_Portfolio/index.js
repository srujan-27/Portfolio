// Browser (/experience)
//  ↓
// index.js → app.use('/experience', experienceRoutes)
//  ↓
// experienceRoute.js → router.get('/')
//  ↓
// ExperienceModel.js → Model connects to MongoDB
//  ↓
// MongoDB Atlas → Collection: Experience

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const experienceRoutes = require('./routes/ExperienceRoute');
const AcheivementRoutes = require('./routes/AcheivementRoute')

app.use(cors());

app.use(express.json());

app.use('/experience', experienceRoutes);

app.use('/acheivement',AcheivementRoutes);


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('API Running');
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


