require('dotenv').config();
const app = require('./src/app');
const connectToDatabase = require('./src/db/db');

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});