// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { cars?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
   dotenv.config();

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

   await client.connect();

   const db: mongoDB.Db = client.db(process.env.DB_NAME);

   await db.command({
     "collMod": process.env.CARS_COLLECTION_NAME,
     "validator": {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["brand", "name", "production_year", "price"],
                    additionalProperties: false,
                    properties: {
                    _id: {},
                    brand: {
                        bsonType: "string",
                        description: "'brand' is required and is a string"
                    },
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string"
                    },
                    production_year: {
                        bsonType: "number",
                        description: "'production_year' is required and is a string"
                    },
                    price: {
                        bsonType: "number",
                        description: "'price' is required and is a number"
                    }
                    }
                }
             }
     });


   const carsCollection: mongoDB.Collection = db.collection(process.env.CARS_COLLECTION_NAME);

 collections.cars = carsCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${carsCollection.collectionName}`);
}
