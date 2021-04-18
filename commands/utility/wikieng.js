const wikipedia = require('wtf_wikipedia');
module.exports = {
  name: 'wiki',
  aliases: ['w', 'ws'],
  description: 'Search on Wikipedia',
  guildOnly: true,
  args: true,
  usage: '<Arcticle name>',
  execute(msg, args,client) {
    msg.delete()
    let data = wikipedia.fetch(args, 'en').then((res) => {
      res = res.text();
      res = res.slice(0, 1000);
      const channel = client.channels.cache.get('832909289534128128')
      let upperArgs = args[0].toUpperCase()
      channel.send(`Search for ${upperArgs} \n${res}`)
    });
  },
};
