module.exports = {
  name: 'join',
  description: 'Join the Bot',
  guildOnly: true,
  execute(msg, args, client) {
    msg.member.voice.channel.join();
  },
};
