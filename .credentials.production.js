// need to change connectionString to environment variable
module.exports = {
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
  },
};
