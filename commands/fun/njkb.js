module.exports = {
    name: 'njkb',
    description: 'Sends german kurzbuch',
    execute(msg, args, client) {
      msg.channel.send("",{files:["./database/Němčina-řešení-KB.pdf"]});
    },
  };
  