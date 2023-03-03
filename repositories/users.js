const fs = require("fs");
const crypto = require("crypto");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename."); //no filename passed into class
    }
    this.filename = filename; //set up file name
    try {
      fs.accessSync(this.filename); //see if file exists
    } catch (err) {
      fs.writeFileSync(this.filename, "[]"); //if file doesn't exist CREATE a new file called this.filename with an empty array inside
    }
  }

  async getAll() {
    //Open file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();
    //{email: 'email@email.com', password: 'password'}
    const records = await this.getAll();
    records.push(attrs);
    //write updates records array back to users.json (this.filename)
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.delete("192295b8");
};

test();
