const tables = require('./tablesList').tables
class DB {
  constructor() {
    this.id = Math.random() * 1000
    global._customers = {}
    this.memDB = global._customers

    tables.forEach((tableName) => {
      this.memDB[tableName] = []
    })
  }

  async get(table, key) {
    return key ? this.memDB[table][key] : undefined
  }

  async getMany(table, keys) {
    const ret = []
    for (const key of keys) {
      ret.push(await this.get(table, key))
    }
    return ret
  }

  async set(table, key, value) {
    return (this.memDB[table][key] = JSON.stringify(value))
  }

  async getAll(table) {
    let ret
    for (const key in this.memDB) {
      if (this.memDB.hasOwnProperty(key) && key.startsWith(table)) {
        ret = this.memDB[key]
      }
    }
    return ret
  }

  async getMany(table, keys) {
    const ret = []
    for (const key of keys) {
      ret.push(await this.get(table, key))
    }
    return ret
  }

  async deleteMany(table, keys) {
    for (const key of keys) {
      delete this.memDB[table][key]
    }
  }

  async delete(table, key) {
      delete this.memDB[table][key]
  }
}

module.exports = new DB()
