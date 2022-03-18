import  {Generate_Db}  from "./app.js";

const country = new Generate_Db(50,'country');
const name = new Generate_Db(50,'name');


country.generate();
name.generate();