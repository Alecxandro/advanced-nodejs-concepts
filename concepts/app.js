import casual from "casual";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

const folder = "./json_db";

export class Generate_Db {
  constructor(registers_numbers, registerType) {
    this.registers_numbers = registers_numbers;
    this.registerType = registerType;
  }

  async db_generator() {
    const users = [];
    try {
      for (let i = 0; i < this.registers_numbers; i++) {
        users.push({
          id: randomUUID(),
          [this.registerType]: casual[this.registerType],
        });
      }

      const jsonUsers = JSON.stringify(users);

      try {
        if (!existsSync(folder)) {
          mkdirSync(folder);
        }

        await writeFile(
          `./json_db/${this.registerType}.json`,
          jsonUsers,
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

const db = new Generate_Db(50, "country");
await db.db_generator();
