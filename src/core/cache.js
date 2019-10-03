class Cache {
  constructor() {
    this.cache = {}
  }

  ensurePlayerExists(sid64) {
    this.cache[sid64] ? this.cache[sid64] : []
  }

  getCache(sid64, index) {
    ensurePlayerExists(sid64)

    return this.cache[sid64][index]
  }

  setCache(sid64, index, value) {
    ensurePlayerExists(sid64)

    this.cache[sid64][index] = value
  }

  deleteCache(sid64, index) {
    this.ensurePlayerExists(sid64)

    delete this.cache[sid64][index]
  }
}

export default new Cache()


