//config to use environment variable
export const config = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
};
