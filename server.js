require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./src/db');

const app = express();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// ✅ Handle multiple origins (comma-separated in .env)
const allowedOrigins = CORS_ORIGIN.split(',').map(o => o.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => res.send('URS Property API is running 🚀'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/properties', require('./src/routes/properties'));

// Start
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
