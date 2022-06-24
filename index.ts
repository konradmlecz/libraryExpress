import * as express from "express";
import "express-async-errors";
import { urlencoded } from "express";
import "./utils/db";

const app = express();

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use("/", (req, res) => {
  res.send("ok");
});

app.listen(3000, "localhost", () => {
  console.log("Listening on http://localhost:3000");
});
