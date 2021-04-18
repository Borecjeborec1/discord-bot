module.exports = {
    name: 'sin',
    description: 'Calculate Arg as Sin',
    args: true,
    usage: '<number>',
    execute(msg, args,client) {
      let result  = Math.sin(args[0] * Math.PI / 180.0)
      msg.reply(`The result is: ${result}`)
    },
  };
 