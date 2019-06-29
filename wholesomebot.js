const Discord = require('discord.js');
const client = new Discord.Client();
const lists = require('./lists.json');
const config = require('./config.json');

function randomizer(items){
    return items[Math.floor(Math.random()*items.length)];
}

client.on('ready', () =>{
    console.log(`Logged in as ${client.user.tag}-(ID:${client.user.id}), on ${client.guilds.size} server(s)`);
    client.user.setActivity(`users be awesome on ${client.guilds.size} guild(s)!`,{ type: 'WATCHING' });
});

client.on("message", message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "drank"){
        if(args[0] === "soda" || args[0] === "pop"){
            message.channel.send(`That's OK, but I recommend you drink water to keep healthy!`);
        }else if (args[0] === "water"){
            message.channel.send(`I'm proud of you! Keep drinking water because: ${randomizer(lists.water)}`);
        }else if (args[0] === "beer"){
            message.channel.send(lists.water[4]);
        }else {
            message.channel.send(`!drank's usage is !drank [water/pop/soda/beer]`);
        }
    } else if (message.content.startsWith(config.prefix+"encourage")){
        message.channel.send(randomizer(lists.encouragement));
    } else if (message.content.startsWith(config.prefix+"water")){
        message.channel.send(randomizer(lists.water));
    } else if (message.content.startsWith(config.prefix+"help")){
        message.channel.send(`Commands are as Follows:\n\n!encourage\n!water\n!drank\nAny mention of Suicidal or Suicide will engage the bot's worry sensors and they will respond to you.`)
    }
});

client.on("message", message =>{
    if (message.author.bot) return;
    if (message.content.includes("suicidal")){
        message.reply("Please take a look at the following link if you're feeling suicidal or under the weather, https://www.reddit.com/r/SuicideWatch/wiki/hotlines, and remember, people do care about you."+` ${randomizer(lists.encouragement)}`);
    }else if (message.content.includes("suicide")){
        message.reply("Please take a look at the following link if you're feeling suicidal or under the weather, https://www.reddit.com/r/SuicideWatch/wiki/hotlines, and remember, people do care about you."+` ${randomizer(lists.encouragement)}`);
    }else return;
});

client.login(config.token);