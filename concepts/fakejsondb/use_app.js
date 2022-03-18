import  {Generate_Db}  from "./app.js";

const country = new Generate_Db(50,'country');
const name = new Generate_Db(50,'name');
const street = new Generate_Db(100,'street');
const fullName = new Generate_Db(100,'full_name');

country.generate();
name.generate();
street.generate();
fullName.generate();