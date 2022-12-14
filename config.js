const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	mongoUri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@portfolio-cluster.z0ixmu0.mongodb.net/portfolio_data`,
	PORT: process.env.PORT || 3000,
};
