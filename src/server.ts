import express from "express";
import { connectToDatabase } from "./services/database.service"
import { carsRouter } from "./routes/cars.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/cars", carsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
