import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';

// Load environment variables
dotenv.config()

// Api Routes
import login from './routes/login.routes.js';
import register from './routes/register.routes.js';

// Create express app
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());

// Routes
app.post("/api/v1/login", login);
app.post("/api/v1/register", register);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URI).catch((err) => { console.log(err) });

    console.log(`Example app listening on port ${process.env.PORT}!`);
});