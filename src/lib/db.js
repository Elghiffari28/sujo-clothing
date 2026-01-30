import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  // require("dotenv").config();
  dotenv.config();
}

// koneksi DB

let dialectModule = {};
try {
  dialectModule = require("mysql2"); // pakai require biar hanya load di server
} catch (e) {
  console.error("mysql2 not found", e);
}

// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_HOST:", process.env.DB_HOST);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+07:00",
    dialectModule,
    dateStrings: true,
    logging: false,
  }
);

// Promo
export const Promo = sequelize.define("Promo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// User
export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "user" },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// Testimoni
export const Testimoni = sequelize.define("Testimoni", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  keterangan: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// Artikel
export const Artikel = sequelize.define("Artikel", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  content: { type: DataTypes.TEXT("medium"), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// init DB
// export async function initDB() {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected");
//     await sequelize.sync();
//   } catch (err) {
//     console.error("❌ DB Error:", err);
//   }
// }

export default sequelize;
