module.exports = {
  name: 'dc',
  description: 'Disconnect the Bot',
  guildOnly: true,
  execute(msg, args, client) {
    msg.member.voice.channel.leave();
  },
};
