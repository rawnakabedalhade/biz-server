import mongoose from "mongoose";
import chalk from "chalk";

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_CON_STR + "bizdb")
      .then(() => {
        console.log(chalk.magentaBright.bold("connected to Mongodb"));
        resolve();
      })
      .catch((err) => {
        console.log(chalk.redBright.bold("not connected to Mongodb", err));
        reject(err);
        process.exit(1); //drop the server
      });
  });
};
export default connectToMongo;
