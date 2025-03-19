import { Sequelize } from "sequelize";

export const sequilize = new Sequelize("Demo1", "postgres", "admin", {
  host: process.env.HOST as string,
  port: Number(process.env.PORT as string),
  dialect: "postgres",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequilize.authenticate();
    console.log("postgres is connected");
  } catch (error) {
    console.log("error in connecting to postgres");
  }
};
