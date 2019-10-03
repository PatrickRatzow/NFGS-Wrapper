const nfgs = require("nfgs").NFGSHandler

let scripts = {}
const scriptsPath = __dirname + "/scripts"

fs.readdir(scriptsPath, (err, files) => {
  if (err) {
    console.error(err)

    return
  }

  files.forEach(file => {
    const filePath = `${__dirname}/scripts/${file}`
    const output = require(filePath)
    const receivers = output.getReceivers()
    const name = output.getName()
    output.send = (id, data) => {
      nfgs.sendMessage(name + "." + id, data)
    }
    for (let i in receivers) {
      nfgs.eventHandler.on(name + "." + i, receivers[i])
    }

    scripts[name] = output
  })

  console.log(scripts)
})