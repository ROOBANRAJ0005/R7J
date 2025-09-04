const productJson = require('../data/products.json');
const productModel = require('../models/productModel');
const dotenv = require('dotenv');
const path = require('path');
const getDatabase = require('../config/database');

dotenv.config({path:path.join(__dirname,'..','config','config.env')});
getDatabase();
const seeder = async() =>{
    try{
        await productModel.deleteMany();
        console.log("deleted json");
        await productModel.insertMany(productJson);
        console.log("added database");
    }
    catch(err){
        console.log(err)
    }
    process.exit();
}

seeder();

