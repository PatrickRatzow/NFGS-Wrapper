class Class {
  constructor() {
    this.receivers = {}
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  addReceiver(id, func) {
    this.receivers[id] = func
  }

  getReceivers() {
    return this.receivers
  }
}

export default new Class()