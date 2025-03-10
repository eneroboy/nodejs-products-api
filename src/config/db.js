const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB połączone: ${conn.connection.host}`);
  } catch (error) {
    console.error('Błąd połączenia z MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
