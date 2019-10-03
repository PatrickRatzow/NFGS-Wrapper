const config = require("config")
const mysql = require("async-mysql")

const dbConfig = config.get("Database")

class Database {
  async connect() {
    try {
      this.connection = await mysql.connect(dbConfig)
    } catch(err) {
      console.error(err)
    }
  }

  async query(query) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.connection.query(query))
      } catch(err) {
        reject(err)
      }
    })
  }

  get() {
    return this.connection
  }
}

const db = new Database()
db.connect()

export default db