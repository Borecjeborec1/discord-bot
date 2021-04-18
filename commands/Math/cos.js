module.exports = {
    name: 'cos',
    description: 'Calculate Arg as Cos',
    args: true,
    usage: '<number>',
    execute(msg, args,client) {
      let result  = Math.cos(args[0] * Math.PI / 180.0)
      msg.reply(`The result is: ${result}`)
    },
  };
 