module.exports = {
  name: 'calculate',
  aliases: ['c', 'calc'],
  description: 'Calculate Args',
  args: true,
  usage: '<number> <+,-,*,/> <number>',
  execute(msg, args,client) {
    let result = eval(args[0])
    msg.reply(`The result is: ${result}`)
  },
};
