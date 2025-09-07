require('dotenv').config();
const { connectDB } = require('./db');
const Property = require('./models/Property');

async function run() {
  await connectDB(process.env.MONGO_URI);
  await Property.deleteMany({});
  const docs = await Property.insertMany([
    {
      title: '2BHK Apartment in Noida',
      price: 2500000,
      location: 'Sector 62, Noida',
      image: 'https://via.placeholder.com/600x400?text=2BHK+Noida',
      description: 'Spacious 2BHK with parking and security. Near IT parks.',
      bedrooms: 2, bathrooms: 2, areaSqFt: 980, propertyType: 'Apartment'
    },
    {
      title: '3BHK Apartment in Gurugram',
      price: 4800000,
      location: 'DLF Phase 3, Gurugram',
      image: 'https://via.placeholder.com/600x400?text=3BHK+Gurugram',
      description: 'Modern society with clubhouse and pool.',
      bedrooms: 3, bathrooms: 3, areaSqFt: 1450, propertyType: 'Apartment'
    },
    {
      title: 'Villa in Greater Noida',
      price: 9500000,
      location: 'Pari Chowk, Greater Noida',
      image: 'https://via.placeholder.com/600x400?text=Villa+Greater+Noida',
      description: 'Independent villa with lawn and parking for 2 cars.',
      bedrooms: 4, bathrooms: 4, areaSqFt: 2600, propertyType: 'Villa'
    }
  ]);
  console.log(`Seeded ${docs.length} properties.`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
