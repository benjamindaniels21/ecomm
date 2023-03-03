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

  async update(id, attrs) {
    const records = await this.getAll(); //bring in all the records
    const record = records.find((record) => record.id === id); //check to see if the particular record exists
    if (!record) {
      throw new Error(`Record with id ${id} not found`); //Error handling if record doesn't exist
    }

    Object.assign(record, attrs); //Take everything from attr and put it in the record

    await this.writeAll(records);
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.update("108a8dbadfdfdf", { password: "mypassword" });
};

test();
