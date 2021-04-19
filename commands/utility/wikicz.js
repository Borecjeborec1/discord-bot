const wikipedia = require('wtf_wikipedia');
module.exports = {
  name: 'wikicz',
  aliases: ['wc', 'wsc'],
  description: 'Search on Czech Wikipedia',
  guildOnly: true,
  args: true,
  usage: '<Arcticle name>',
  execute(msg, args,client) {
    let argss = "";
    for (let i = 0; i < args.length; i++){
      argss += args[i] + " "
    }
    msg.delete()
    let data = wikipedia.fetch(argss, 'cz').then((res) => {
      if(res){
        res = res.text();
        res = res.slice(0, 1000);
        const channel = client.channels.cache.get('832909289534128128')
        let upperArgss = argss.toUpperCase()
        channel.send(`Search for ${upperArgss} \n${res}`)
        return

      }
       msg.reply(`I'm sorry, but nothing was searched under ${argss}`)
      
    });
  },
};
