const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  origin: process.env.FRONTEND_URL || 'https://main.dv8lgo1pwq1w6.amplifyapp.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Proxy endpoint for the Routes API
app.post('/api/routes/matrix', async (req, res) => {
  try {
    const { origin, destinations, batchSize } = req.body;
    
    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Make the request to Google Routes API
    const response = await axios({
      method: 'POST',
      url: `https://routes.googleapis.com/directions/v2:computeRouteMatrix?key=${apiKey}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters,status,condition'
      },
      data: {
        origin: { address: origin },
        destinations: destinations.map(dest => ({ address: dest })),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false
        },
        languageCode: "en-US",
        units: "IMPERIAL"
      }
    });
    
    // Forward the response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Routes API:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch from Routes API',
      details: error.response?.data || error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Routes API proxy server running on port ${port}`);
});

// For use with npm run or node command
if (require.main === module) {
  // This block runs when the file is executed directly
  console.log('Starting server in standalone mode');
} else {
  // Export the configured app for potential use in a larger application
  module.exports = app;
} 