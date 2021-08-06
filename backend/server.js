import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

//Routers
import adminRouter from "./routers/adminrouter.js";
import facultyRouter from "./routers/facultyrouter.js";
import studentRouter from "./routers/studentrouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("server started at port 5000");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/student", studentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`server started at port ${PORT}`);
});
