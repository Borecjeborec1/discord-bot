const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();

let censoredWords = ['negr', '卐', 'pico', 'kurva', 'cigane', 'kokot', 'vagina', 'pica'];
let censoredWritted = false;
let written = '';

const prefix = '!';

const usersMap = new Map();
const LIMIT = 5;
const TIME = 15000;
const DIFF = 3000;

let userListJson = require('./database/data.json');
const VETERAN = 54000;
const SENIOR = 18000;
const MID = 7200;
const JUNIOR = 3600;

let commandArr = [];

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    commandArr.push(`${prefix}${command.name}`);
  }
}

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

client.on('message', (msg) => {
  censoreWord(msg);
  antiSpam(msg);
  addMsgToJSON(msg.author);
  checkForPromote(msg.member);

  if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  handleRooms(msg, args);

  const command =
    client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command)
    return msg.reply(
      `I'm sorry, but I don't know that command! \n  If u want to add this command, contact Borecjeborec1 please.`
    );

  if (command.guildOnly && msg.channel.type === 'dm') {
    return msg.reply("I can't execute that command inside DMs!");
  }

  //IF UNKNOWN COMMAND
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${msg.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return msg.channel.send(reply);
  }

  try {
    command.execute(msg, args, client);
  } catch (error) {
    console.error(error);
    msg.reply(`I'm sorry, but there was an error while executing that command!`);
  }
});

client.login(process.env.BOT_TOKEN);

function censoreWord(msg) {
  censoredWritted = false;
  let replaceWith = '';
  written = msg.content.toLowerCase();
  written = written.split('-').join(replaceWith);
  written = written.split('.').join(replaceWith);
  written = written.split('_').join(replaceWith);
  written = written.split('*').join(replaceWith);
  written = written.split('/').join(replaceWith);

  for (var i in censoredWords) {
    if (written.includes(censoredWords[i].toLowerCase())) censoredWritted = true;
  }
  if (censoredWritted) {
    msg.delete();
  }
}

function antiSpam(message) {
  if (message.author.bot) return;
  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if (difference > DIFF) {
      clearTimeout(timer);
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, userData);
    } else {
      ++msgCount;
      if (parseInt(msgCount) >= LIMIT) {
        message.delete();
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn,
    });
  }
}
const SchoolSouboryID = '832925445926289438';
const SchoolTextID = '832909412816388106';
const GameSouboryID = '833243517333667860';
const GameTextID = '833243480045387776';
const HudbaTextID = '832909544442953738';
function handleRooms(msg, args) {
  if (msg.channel.id !== HudbaTextID) {
    if (msg.content.startsWith(`${prefix}p ${args}`) || msg.content.startsWith(`${prefix}play ${args}`)) {
      let message = msg;
      msg.delete();
      const channel = client.channels.cache.get(HudbaTextID);
      channel.send(`${message}`);
    }
  } else {
    if (
      !(
        msg.content.startsWith(`${prefix}p `) ||
        msg.content.startsWith(`${prefix}play `) ||
        msg.content.startsWith(`${prefix}dc `)
      )
    ) {
      return msg.delete();
    }
  }
  if (
    (msg.channel.id === SchoolTextID && msg.content.length == 0) ||
    (msg.channel.id === GameTextID && msg.content.length == 0)
  )
    msg.delete();
  if (
    (msg.channel.id === SchoolSouboryID && msg.content.length > 0) ||
    (msg.channel.id === GameSouboryID && msg.content.length > 0)
  )
    msg.delete();
}
const memberTarget = [];

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let oldVoice = oldMember.channelID;
  let newVoice = newMember.channelID;
  if (oldVoice != newVoice) {
    if (oldVoice == null) {
      memberTarget.push(newMember);
      setTimeout(() => {
        if (memberTarget.length === 1) {
          return memberTarget[0].kick('cant connect alone');
        }
      }, 50000);

      startTimer(newMember);
    } else if (newVoice == null) {
      memberTarget.pop();
      setTimeout(() => {
        if (memberTarget.length === 1) {
          memberTarget[0].kick('cant stay alone');
        }
        endTimer(oldMember);
      }, 50000);
    } else {
      //Switched CHANNEL
    }
  }
});

function findIndexOfUser(user) {
  for (let i = 0; i < userListJson.userList.length; i++) {
    if (userListJson.userList[i].userID === user.id) {
      return Number(i);
    }
  }
  let pushUser = {
    "guildID": user.guild.id,
    "userID": user.id,
    "messageCount": 0,
    "timeJoinChannel": Date.now(),
    "voiceTime": 0,
  };
  userListJson.userList.push(pushUser);
  fs.writeFile('./database/data.json', JSON.stringify(userListJson), function (err) {
    if (err) return console.log(err);
  });
  return Number(0);
}

function startTimer(newMember) {
  let index = findIndexOfUser(newMember);
  userListJson.userList[index].timeJoinChannel = Date.now();
  fs.writeFile('./database/data.json', JSON.stringify(userListJson), function (err) {
    if (err) return console.log(err);
  });
}

function endTimer(oldMember) {
  let index = findIndexOfUser(oldMember);
  userListJson.userList[index].voiceTime += Date.now() - userListJson.userList[index].timeJoinChannel;
  userListJson.userList[index].timeJoinChannel = Date.now();
  fs.writeFile('./database/data.json', JSON.stringify(userListJson), function (err) {
    if (err) return console.log(err);
  });
}
const JUNIORID = '831185507962454038';
const MIDID = '831185481424306206';
const SENIORID = '831185443470311435';
const VETERANID = '831185399451484161';

function checkForPromote(user) {
  var index = findIndexOfUser(user);
  let exp = Math.round(userListJson.userList[index].voiceTime / 10000) + userListJson.userList[index].messageCount * 10;
  if (exp >= JUNIOR) {
    user.roles.add(JUNIORID);
  }
  if (exp >= MID) {
    user.roles.add(MIDID);
    user.roles.remove(JUNIORID);
  }
  if (exp >= SENIOR) {
    user.roles.add(SENIORID);
    user.roles.remove(JUNIORID);
    user.roles.remove(MIDID);
  }
  if (exp >= VETERAN) {
    user.roles.add(VETERANID);
    user.roles.remove(SENIORID);
    user.roles.remove(JUNIORID);
    user.roles.remove(MIDID);
  }
}

function addMsgToJSON(author) {
  let index;
  for (let i = 0; i < userListJson.userList.length; i++) {
    if (userListJson.userList[i].userID === author.id) {
      index = i;
      userListJson.userList[index].messageCount += 1;
      fs.writeFile('./database/data.json', JSON.stringify(userListJson), function (err) {
        if (err) return console.log(err);
      });
    }
  }
}
