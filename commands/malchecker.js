
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const list = require("../list");

module.exports ={
    antiworm: function(messa,message,client){

        let domains = list.arr;
        // Some sort of worm has been spread which uses messages like this to spread.
        const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
        const malregex2 = /(steam|csgo).+(giveaway|giving away|leaving).+(nitro|closed beta|trades)/i
        const strx = messa;
        let mal;
        if (strx.includes("steamcommunity.com")) return;
        if(strx.includes("https://discord.gift/")) return;
        if(messa.includes("https://")||messa.includes("http://")){
            for (var i = 0; i < domains.length; i++) {
                if (message.content.includes(domains[i])) {
                    trigger(message,client);
                    return;
                }
            }
            if ((mal = malregex.exec(strx)) !== null){
                trigger(message,client);
                return;
            }
            if((mal = malregex2.exec(strx)) !== null){
                trigger(message,client);
                return;
            }
        }

    },


    antiunderage: function(messa,message,client){
    }
}


const trigger  = async (message,client) => {
    message.channel.send("<@"+message.author.id+">, account might be compromised.");
    message.author.send("We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the Gamers React server.\nYou must run a Windows Defender full scan and change your password.\nTo join back, use this invite link: https://discord.gg/SnBhUmqSf8")
    .catch(console.error);
    const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
    let time = message.createdTimestamp
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);

    const embed = new Discord.MessageEmbed()
    .setTitle('A user may be compromised')
    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
    .setColor(0xFF0000)
    .setDescription(message.content)
    .addField('person id', message.author.id)
    .addField("person name ", message.author.tag)
    .setFooter("today at "+formattedTime)
    channel.send({ embeds: [embed] });
    message.delete()
}