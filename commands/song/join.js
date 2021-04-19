module.exports = {
  name: 'join',
  description: 'Join the Bot',
  guildOnly: true,
  execute(msg, args, client) {
    if(msg.member.voice) return msg.member.voice.channel.join();
    msg.respond("You are not in voice channel")
  },
};
