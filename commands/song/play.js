const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'play song',
  guildOnly: true,
  args: true,
  usage: '<Video YT link>',
  execute(msg, args, client) {
    if (msg.member.voice) {
      msg.member.voice.channel.join().then((connection) => {
        const stream = ytdl(args[0], { filter: 'audioonly' });
        const dispatcher = connection.play(stream);
        isPlayingMusic = true;
        dispatcher.on('finish', () => voiceChannel.leave());
        isPlayingMusic = false;
      });
    } else {
      msg.reply('You are not an a voice channel!');
    }
  },
};
