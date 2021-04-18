module.exports = {
  name: 'ping',
  aliases: ['ms'],
  description: 'Check ping of bot',
  execute(msg, args, client) {
    msg.channel.send(`My ping is ${client.ws.ping}ms.`);
  },
};
