// import dotenv
import dotenv from 'dotenv';
dotenv.config();

//Other dependencies

import express from 'express';
import bodyParser from 'express';
import router from './routes/main.js';
import connectDB from './db/config.js';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;

const connection = connectDB();
// Middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(router);

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//     resave: false,
//     saveUninitialized: false,
// }))


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})


