let userListJson = require('../../database/data.json');
const VETERAN = 54000;
const SENIOR = 18000;
const MID = 7200;
const JUNIOR = 3600;
module.exports = {
  name: 'my-points',
  aliases: ['mp', 'points'],
  description: 'Show users Points',
  execute(msg, args) {
    let roleNum = 0;
    let needExp = 0;
    for (let i = 0; i < userListJson.userList.length; i++) {
      if (userListJson.userList[i].userID === msg.author.id) {
        let index = i;
        let exp =
          Math.round(userListJson.userList[index].voiceTime / 10000) + userListJson.userList[index].messageCount * 10;
        if (msg.member.roles.cache.has('831185507962454038')) roleNum = 1;
        if (msg.member.roles.cache.has('831185481424306206')) roleNum = 2;
        if (msg.member.roles.cache.has('831185443470311435')) roleNum = 3;
        if (msg.member.roles.cache.has('831185399451484161')) roleNum = 4;
        switch (roleNum) {
          case 0:
            needExp = JUNIOR - exp;
            msg.reply(`You have ${exp} exp, right now.\nYou need ${needExp} more to rank up.`);
            break;
          case 1:
            needExp = MID - exp;
            msg.reply(`You have ${exp} exp, right now.\nYou need ${needExp} more to rank up.`);
            break;
          case 2:
            needExp = SENIOR - exp;
            msg.reply(`You have ${exp} exp, right now.\nYou need ${needExp} more to rank up.`);
            break;
          case 3:
            needExp = VETERAN - exp;
            msg.reply(`You have ${exp} exp, right now.\nYou need ${needExp} more to rank up.`);
            break;
          case 4:
            msg.reply(`You have ${exp} exp, right now.\nYou don't need more exp.`);
            break;
        }
      }
    }
  },
};
