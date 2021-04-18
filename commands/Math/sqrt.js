module.exports = {
  name: 'sqrt',
  description: 'Calculate square root of Argument',
  args: true,
  usage: '<number>',
  execute(msg, args,client) {
    let result  = Math.sqrt(args[0])
    msg.reply(`The result is: ${result}`)
  },
};
 