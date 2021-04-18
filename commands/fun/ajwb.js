module.exports = {
    name: 'ajwb',
    description: 'Send english workbook',
    execute(msg, args, client) {
      msg.channel.send("",{files:["./database/Angličtina-řešení-WB.pdf"]});
    },
  };
  