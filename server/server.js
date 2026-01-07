import "dotenv/config"
import express from "express";
import cors from "cors"
import chatRoute from "./routes/chatRoute.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT

connectDB();

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api', chatRoute);

app.listen(port, ()=> console.log(`app listening at port: ${port}`));