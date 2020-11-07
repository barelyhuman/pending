function PubSub () {}

PubSub.prototype = {
  channels: [],
  emit (channelName, message) {
    const channel = this._findChannel(channelName)
    if (channel) {
      channel.listeners.forEach((listenerInstance) => {
        listenerInstance.action(message)
      })
    } else {
      this._addChannel(channelName)
    }
  },
  subscribe (channelName, cb) {
    let channel = this._findChannel(channelName)
    if (!channel) {
      channel = this._addChannel(channelName)
    }

    const id = channel.listeners.length

    channel.listeners.push({
      id,
      action: cb
    })
    return this._createUnsubsciber(channelName, id)
  },
  _findChannel (name) {
    return this.channels.find((item) => item.name === name)
  },
  _addChannel (name) {
    this.channels.push({
      name,
      listeners: []
    })
    return this._findChannel(name)
  },
  _createUnsubsciber (channelName, actionId) {
    return () => {
      const channel = this._findChannel(channelName)
      channel.listeners.filter((item) => item.id !== actionId)
    }
  }
}

export default PubSub
