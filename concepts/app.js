import casual from "casual";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

const globalRegisterType = "first_name";

const DB_GENERATOR = async (registers, registerType) => {
  const users = [];
  registerType = globalRegisterType;
  try {
    for (let i = 0; i < registers; i++) {
      users.push({
        id: randomUUID(),
        [registerType]: `${casual[registerType]}`,
      });
    }

    return users;
  } catch (error) {
    console.log(`Error details: ${error}`);
  }
};

const USERS = await DB_GENERATOR(50, globalRegisterType);

const toJSON = JSON.stringify(USERS);

async function writeJSON() {
  try {
    await writeFile(`./json_db/${globalRegisterType}.json`, toJSON, (err) => {
      if (err) throw err;
      console.log("data saved!");
    });
  } catch (err) {
    console.log(err);
  }
}

await writeJSON();
