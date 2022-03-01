import  {Generate_Db}  from "./app.js";

const country = new Generate_Db(50,'country');

await country.generate();
