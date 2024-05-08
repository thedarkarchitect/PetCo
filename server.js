import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello world!")
})

export default app;