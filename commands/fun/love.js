module.exports = {
    name: 'love',
    description: 'Show who is in love with who',
    args: true,
    usage: '<Name>',
    execute(msg, args, client) {
      let girls = ["Sára Frýdecká","Marie Kuchařová","Adéla Neuwirthová","Hana Hubáčová","Lukáš Bubík","Alex Holínková"]
      let girl = girls[Math.floor(Math.random()*girls.length)]
      msg.channel.send(`💕 ${args[0].replace(/^\w/, (c) => c.toUpperCase())} is in love with ${girl} 💕!!`);
    },
  };
  