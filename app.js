import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import logger from "morgan";
import logger from "./logger/loggerAdapter.js";
import * as url from "url";
import cors from "cors";
import errorMiddleWare from "./middlewares/error.mw.js";
import apiRouter from "./routes/api.js";
import compression from "compression";

let app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(cors());
app.use(helmet());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

// app.use((req, res, next) => {
//   console.log("your req is:", req.url);
//   next();
// });
// app.use((req, res, next) => {
//   res.send("Hello world!");
// });
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });
// app.get("/api/cards", (req, res) => {
//   res.send("your req is done");
// });
// app.get("/api/user", (req, res) => {
//   res.send({ name: "user", age: 55 });
// });
// app.post("/", (req, res) => {
//   res.send([
//     { name: "user", age: 55 },
//     { name: "second", age: 3 },
//   ]);
// });
// app.delete("/1", (req, res) => {
//   res.send("user deleted");
// });
// app.put("/2", (req, res) => {
//   res.send("user was updated");
// });
// app.patch("/3", (req, res) => {
//   res.send("user like post");
// });

// app.get("/cards/:cardId", (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   res.send("done");
// });
// app.get("/cards", (req, res) => {
//   const filterValue = req.query.filter; // Extract the value of the "filter" query parameter
//   res.send(`Filter value: ${filterValue}`);
// });

// app.get("/cards/:id", (req, res) => {
//   res.send(`your id is :${req.params.id}`);
// });

// app.get("/cards/", (req, res) => {
//   res.send("all cards");
// });
// app.put("/cards/:id", (req, res) => {
//   res.set(`card with id : ${req.params.id}`);
// });
// app.delete("/cards/:id", (req, res) => {
//   res.set(` delete card with id : ${req.params.id}`);
// });

// app.post("/cards", (req, res) => {
//   console.log(req.body);
//   res.send("Card created");
// });

// app.get("/error", (req, res) => {
//   throw new Error("Error Occurred");
// });

// app.use((err, req, res, next) => {
//   console.log(Chalk.red(err.message));
//   res.status(500).send(err.message);
// });
app.use("/api", apiRouter);
app.use(errorMiddleWare);

export default app;
