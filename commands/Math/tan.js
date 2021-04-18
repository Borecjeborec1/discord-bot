module.exports = {
    name: 'tan',
    description: 'Calculate Arg as Tan',
    args: true,
    usage: '<number>',
    execute(msg, args,client) {
      let result  = Math.tan(args[0] * Math.PI / 180.0)
      msg.reply(`The result is: ${result}`)
    },
  };
 