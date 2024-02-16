import express from 'express';
import cors from 'cors';
import AppRoutes from "./src/router/index.js";

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT
const app = express();
app.use(express.json());
app.use(cors());

app.use(AppRoutes);

app.listen(PORT, () => console.log(`App is listening to ${PORT}`));
