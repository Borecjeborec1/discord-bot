module.exports = {
    name: 'njab',
    description: 'Sends german arbeitsbuch',
    execute(msg, args, client) {
      msg.channel.send("",{files:["./database/Němčina-řešení-AB.pdf.pdf"]});
    },
  };
