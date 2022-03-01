import  {Generate_Db}  from "./app.js";

const country = new Generate_Db(50,'username');

await country.db_generator();
