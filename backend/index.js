import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppRoutes from "./src/router/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(AppRoutes);

app.listen(process.env.PORT, () => console.log(`App is listening to ${process.env.PORT}`));
