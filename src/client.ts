import Car from "./models/car";
import axios from "axios";
import * as readline from "readline";
import * as readlineSync from "readline-sync";
//Read line interface
readlineSync.setDefaultOptions({print: (input: string) => {
   process.stdout.write(input);
}});

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


//Client CLI
const clientCLI = () => {
  const options = `
    1. Read All\n
    2. Read from id\n
    3. Create\n
    4. Update from id\n
    5. Delete from id\n
    6. Exit CLI\n\n
  Choice: `;
  let exit = false;
  let id, carObj;
  try{
  //while(!exit){
    let answer = readlineSync.question(`Please pick an option:\n${options}`, {hideEchoBack:false});
    if(answer==='6'){
      exit = true;
    }else{
      switch(answer) {
        case '1':
          getItems();
          break;
        case '2':
          id = readlineSync.question("\nEnter car id: ");
          getItem(id);
          break;
        case '3':
          console.log('\nEnter car attributes in JSON format like in the example below (using ""):');
          console.log('Example: {"brand": "brand_X", "name": "name_X", "production_year": 2000, "price": 5500}')
          carObj = JSON.parse(readlineSync.question('Enter car attributes: '));
          createItem(carObj);
          break;
        case '4':
          id = readlineSync.question("\nEnter car id: ");
          console.log('\nEnter car attributes in JSON format like in the example below (using ""):');
          console.log('Example: {"brand": "brand_X", "name": "name_X", "production_year": 2000, "price": 5500}')
          carObj = JSON.parse(readlineSync.question('Enter car attributes: '));
          updateItem(id, carObj);
          break;
        case '5':
          id = readlineSync.question("\nEnter car id: ");
          deleteItem(id);
          break;
        default:
          console.log("Chosen option wasn't found.");
          break;
      }
    }
  }catch(error){
    console.log(`Error in CLI: ${error.message}`);
  }
};

//Manual tests
//getItems();
//getItem("63c2d898833643319f4ffa62");
//getItem("63c2bd397ff56dbbac50b49d");
/*var carObj = {
  brand: "brand_E",
  name: "name_E",
  production_year: 1998,
  price: 99
} as Car;*/
//createItem(carObj);
//updateItem("63c2d898833643319f4ffa62", carObj);
//updateItem("63c1dd540e46388c79df2a27", carObj);
//deleteItem("63c2d95c833643319f4ffa65");


//
//Launch CLI
clientCLI();
