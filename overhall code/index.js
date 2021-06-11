/* eslint-disable no-inline-comments */

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

const config = require("./config");
const prefixl = config.prefix

//Discord.js v12+ is needed for this to work

//required
const slash = require('./commands/slash');
const dmchecker = require('./commands/dmchecker');
const antiw = require('./commands/malchecker');
const submitclip = require('./commands/submitclip');
const streamerrole = require('./commands/streamerrole');
const kill = require('./commands/kill');
const attachmentD = require('./commands/attachment');
const rolechecker = require('./commands/rolechecker');
const cmds = require('./commands/cmd');
//youtube api

//youtube stuff not working yet
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser

//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
//RM: This is not fully working and causing an error when trying to call the var. I think I know a work around which should be added when I add slash commands
var lastBadSumbissionBy = "NONE YET";

//start 
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);

    const Guilds = client.guilds.cache.map(guild => guild.id);
    const nGuilds = client.guilds.cache.map(guild => guild.name);
    console.log(nGuilds +" - "+Guilds);
    //-
    
    console.log(client.api.applications(client.user.id).commands.get())
    console.log(client.api.applications(client.user.id).guilds(`629695220065239061`).commands.get())
    
    //this is for slash commands to work
    slash.slashfun(client)
    //
});
//all below are the same just removed the !(command)

client.on('message', message => {
    if(message.guild === null) {
        //dm checker
        dmchecker.dmchecker(message,client)
    }
    //everything else
    try
    {
        var channelID = message.channel.parent.id
    }
    catch{
        console.log("message not sent in catoragy");
    }
    if (message.channel.id==='629695352454250508') {
        const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
        channel.send("Reminder: Publish message in <#629695352454250508>");
        
    }
    if (channelID =='629695220065239063'||channelID=='716754944472121516'||channelID=='629695220065239065') {
        const messa = message.content.toLowerCase();
        
        antiw.antiworm(messa,message,client)
	    //End anti-worm code.
	
        if(messa.includes("@!144567396835917824")) { //227490301688676354  riz=144567396835917824
            message.reply('dont ping riz, If you need help feel free to ask <@&696134129497931857>');
            message.channel.send("https://media.giphy.com/media/QTi0jJ17OTHwEqkEIA/giphy.gif");
            console.log("pinged");
            //message.delete();
        }

        //FAQbot but Submit clips
        submitclip.submitclip(messa,message,client)

	    //FAQbot but Streamer role
        streamerrole.streamerrole(messa,message,client)
    }


    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    
    cmds.commands(cmd,args,messa,message,client)

})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
        //checks for links
        let links =["www.dropbox.com/","https://drive.google.com/","www.mediafire.com/file","www.awesomescreenshot.com/","mega.nz/file/"]
	
        const messa = message.content.toLowerCase();
        for (var i = 0; i < links.length; i++) {
            if (messa.includes(links[i])) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Video must be playable on discord!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Submissions must be viewable on discord.\nType /requirements for more info.\nuse /compress for easy compress or youtube to upload big file')
                .addField('Bad submission by', message.author.username)
                message.channel.send(embed);
            message.delete();
            break;
            }
        }
	
        //checks attachments
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachments.length !== 0) {
            attachmentD.attachment(attachment,message,client)
        }
    }
});
//youtube bash

//boost checker
client.on('guildMemberUpdate', function(oldMember, newMember){
    rolechecker.rolecheck(oldMember,newMember,client)
`
if (!shadRole && shasRole) {
    const boostedUsers = newMember.guild.members.cache.array().filter(member => member.roles.cache.find(role => role.name === 'Streamers'));
    console.log(boostedUsers.length); // how many members are boosted
    for (var i = 0; i < boostedUsers.length; i++) {
      newMember.guild.channels.cache.get("841018811657355354").send("<@"+boostedUsers[i].id+ "> has got into a gamer react video");
    }
  }
`
});

//this is for embed message for slash commands
async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}

// client.login(process.env.token);
client.login(config.BotToken);