module.exports = {
  name: 'server',
  description: 'Server Info',
  guildOnly: true,
  execute(msg, args) {
    msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
  },
};
