import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

// Parses incoming requests with JSON payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home URL is introductory URL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

export default app;
