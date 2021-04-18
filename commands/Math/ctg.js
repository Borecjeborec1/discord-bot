module.exports = {
    name: 'cot',
    description: 'Calculate Arg as Cot',
    args: true,
    usage: '<number>',
    execute(msg, args,client) {
      let result  = cot(args[0]* Math.PI / 180.0)
      msg.reply(`The result is: ${result}`)
    },
  };
  function cot(x){
    return 1 / Math.tan(x)
  }