import Car from "./models/car";
import fetch from "node-fetch";
import axios from "axios";
import { ObjectId } from "mongodb";

//server should be running, launch server.ts first
const serverURL = "http://localhost:8080/cars";

//Methods
//GET
const getItems = () => {
  try{
    console.log("Retrieving all cars in db...");
    axios({
      method: 'get',
      url: serverURL
    }).then(response => console.log(response.data)).catch(
      error => console.log(`${error.message}: ${error.response.data}`)
    );
  }catch(error){
    console.log(`Error while making the HTTP request: ${error.message}`);
  }
};


const getItem = (id: string) => {
  try{
    console.log(`Retrieving car with id=${id} in db...`);
    axios({
      method: 'get',
      url: serverURL+`/${id}`
    }).then(response => console.log(response.data)).catch(
      error => console.log(`${error.message}: ${error.response.data}`)
    );
  }catch(error){
    console.log(`Error while making the HTTP request: ${error.message}`);
  }
};


//PUT
const updateItem = (id: string, data: Car) => {
  try{
    console.log(`Updating car with id=${id} in db...`);
    axios({
      method: 'put',
      url: serverURL+`/${id}`,
      data: data
    }).then(response => console.log(response.data)).catch(
      error => console.log(`${error.message}: ${error.response.data}`)
    );
  }catch(error){
    console.log(`Error while making the HTTP request: ${error.message}`);
  }
};


//POST
const createItem = (data: Car) => {
  try{
    console.log("Creating new car object in db...");
    axios({
      method: 'post',
      url: serverURL,
      data: data
    }).then(response => console.log(response.data)).catch(
      error => console.log(`${error.message}: ${error.response.data}`)
    );
  }catch(error){
    console.log(`Error while making the HTTP request: ${error.message}`);
  }
};


//DELETE
const deleteItem = (id: string) => {
  try{
    console.log(`Deleting car object with id=${id} in db...`);
    axios({
      method: 'delete',
      url: serverURL+`/${id}`,
    }).then(response => console.log(response.data)).catch(
      error => console.log(`${error.message}: ${error.response.data}`)
    );
  }catch(error){
    console.log(`Error while making the HTTP request: ${error.message}`);
  }

};


//getItems();
//getItem("63c2d898833643319f4ffa62");
//http request freeze for item below => timeout
//getItem("63c2bd397ff56dbbac50b49d");
var carObj = {
  brand: "brand_E",
  name: "name_E",
  production_year: 1998,
  price: 99
} as Car;
//createItem(carObj);
updateItem("63c2d898833643319f4ffa62", carObj);
updateItem("63c1dd540e46388c79df2a27", carObj);
//deleteItem("63c2d95c833643319f4ffa65");
