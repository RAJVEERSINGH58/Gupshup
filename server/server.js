import { app, server } from "./socket/socket.js";

import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoutes.js";
import { connectDb } from "./db/connection1Db.js";
import { errorMiddleware } from "./middlewares/error-middlewares.js";
import cors from "cors";

connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://gupshup-frontend.onrender.com"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
