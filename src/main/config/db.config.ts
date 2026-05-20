export default {
    HOST: process.env.DB_HOST || "127.0.0.1",
    USER: process.env.DB_USER || "rey",
    PASSWORD: process.env.DB_PASSWORD || "rey",
    DB: process.env.DB_NAME || "electron_db",
    PORT: parseInt(process.env.DB_PORT || "3306", 10),
  };
  