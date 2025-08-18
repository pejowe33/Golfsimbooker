const mongoose = require('mongoose');

const dbConfig = {
    uri: 'mongodb://localhost:27017/golf_simulator',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.uri, dbConfig.options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
};