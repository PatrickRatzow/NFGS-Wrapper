const base = require("../core/base")
const mysql = require("../core/mysql")
const cache = require("../core/cache")

const character = require("../core/class")
character.setName("Character")
character:addReceiver("loadSlot", async data => {
  return new Promise(async (resolve, reject) => {
    const { id, requestor } = data
    
    if (!base.playerIsOnline(requestor)) { reject("Player not online"); return }
    const cached = cache.getCache(requestor, `character.slot.${id}`)
    if (cached) {
      resolve(cached)

      return
    }

    const result = await mysql.query(`
      SELECT * FROM characters_player
      WHERE sid64 = '${requestor}'
      AND id = ${id}
    `)

    if (result.length == 0) {
      reject("No result")

      return
    }

    cache.setCache(requestor, `character.slot.${id}`, result[1])
    resolve(result[1])
  })
})

character:addReceiver("loadAll", async data => {
  return new Promise(async (resolve, reject) => {
    const requestor = data.requestor
    if (!base.playerIsOnline(requestor)) { return; }

    const result = await mysql.query(`
      SELECT * FROM characters_player
      WHERE sid64 = '${requestor}'
    `)

    if (result.length == 0) {
      reject("No result")

      return
    }

    resolve(result[1])
  })
})

export default character