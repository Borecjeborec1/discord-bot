const wikipedia = require('wtf_wikipedia');
module.exports = {
  name: 'wikicz',
  aliases: ['wc', 'wsc'],
  description: 'Search on Czech Wikipedia',
  guildOnly: true,
  args: true,
  usage: '<Arcticle name>',
  execute(msg, args,client) {
    msg.delete()
    let data = wikipedia.fetch(args, 'cz').then((res) => {
      if(res){
        res = res.text();
        res = res.slice(0, 1000);
        const channel = client.channels.cache.get('832909289534128128')
        let upperArgs = args[0].toUpperCase()
        channel.send(`Search for ${upperArgs} \n${res}`)
        return
      }
      msg.reply(`I'm sorry, but nothing was searched under ${args}`)
     
    });
  },
};
