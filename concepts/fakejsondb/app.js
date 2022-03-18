import casual from "casual";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import * as syncs from "fs";

export const DEFAULT_FOLDER = "./json_db/";

export class Generate_Db {
  constructor(registers_numbers, registerType) {
    this.registers_numbers = registers_numbers;
    this.registerType = registerType;
  }

  async generate() {
    const users = [];
    try {
      for (let i = 0; i < this.registers_numbers; i++) {
        users.push({
          id: randomUUID(),
          [this.registerType]: casual[this.registerType],
        });
      }

      try {
        if (!syncs.existsSync(DEFAULT_FOLDER)) {
          syncs.mkdirSync(DEFAULT_FOLDER);
        }

        await writeFile(
          `${DEFAULT_FOLDER}${this.registerType}.json`,
          JSON.stringify(users),
          (err) => {
            if (err) throw err;
            console.log("data saved");
          }
        );
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
