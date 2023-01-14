// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Car from "../models/car";

// Global Config
export const carsRouter = express.Router();
carsRouter.use(express.json());

// GET
carsRouter.get("/", async (_req: Request, res: Response) => {
    try {
      //const cars_query = await collections.cars.find({}).toArray();
      //const cars = cars_query[0]
      const cars = (await collections.cars.find({}).toArray()) as Car[];

      res.status(200).send(cars);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


carsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {

        const query = { _id: new ObjectId(id) };
        const car = (await collections.cars.findOne(query)) as Car;

        if (car) {
          res.status(200).send(car);
        }else{
          throw new Error('Unable to retrieve car item');
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});


// POST
carsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newCar = req.body as Car;
        const result = await collections.cars.insertOne(newCar);

        result
            ? res.status(201).send(`Successfully created a new car with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new car.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


// PUT
carsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCar: Car = req.body as Car;
        const query = { _id: new ObjectId(id) };

        const result = await collections.cars.updateOne(query, { $set: updatedCar });
        console.log(result);
        (result.matchedCount > 0 && result.modifiedCount > 0)
            ? res.status(200).send(`Successfully updated car with id ${id}`)
            : res.status(304).send(`Car with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


// DELETE
carsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.cars.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed car with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove car with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Car with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
