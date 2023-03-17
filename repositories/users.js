const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    //attrs is an object with an email and password {email: '', password: ''}
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs, //copy all properties off attrs
      password: `${buf.toString("hex")}.${salt}`, //replace password with this
    };

    records.push(record);
    //write updates records array back to users.json (this.filename)
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    //Saved --> password saved in our database. 'hashedPassword.salt'
    //Supplied -->password given to us by a user signing in

    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
