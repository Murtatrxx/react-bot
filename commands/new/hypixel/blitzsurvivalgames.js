const Discord = require('discord.js');
const { base } = require('../../../utils/embed');
const { hypixel, errors } = require('../../../utils/hypixel');
const commaNumber = require('comma-number');

module.exports = {
    name: 'blitzsurvivalgames',
    aliases: [ "bsg", "survivalgames", "sg", "blitz" ],
    description: 'will show you the Blitz Survival Games stats of a player',
    usage: '`h*blitzsurvivalgames [IGN]`',
    example: '`h*blitzsurvivalgames RM20_`',
    async execute(message, args) {
        await message.channel.sendTyping()
        if (!args[0]) { // if someone didn't type in ign
            const ign404 = new Discord.MessageEmbed(base)
                .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                .setDescription('You need to type in a player\'s IGN!')
            return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
        }

        var player = args[0];

        hypixel.getPlayer(player).then((player) => {
            const embed = new Discord.MessageEmbed(base)
                .setAuthor('Blitz Survival Games Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/SG-64.png')
                .setTitle(`[${player.rank}] ${player.nickname}`)
                .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                .addField('Coins', `\`${commaNumber(player.stats.blitzsg.coins)}\``, true)
                .addField('Solo Wins', `\`${commaNumber(player.stats.blitzsg.winsSolo)}\``, true)
                .addField('Team Wins', `\`${commaNumber(player.stats.blitzsg.winsTeam)}\``, true)
                .addField('Deaths', `\`${commaNumber(player.stats.blitzsg.deaths)}\``, true)
                .addField('KDR', `\`${commaNumber(player.stats.blitzsg.KDRatio)}\``, true)

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        }).catch(e => { // error messages
                if (e.message === errors.PLAYER_DOES_NOT_EXIST) {
                    const player404 = new Discord.MessageEmbed(base)
                        .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                        .setDescription('I could not find that player in the API. Check spelling and name history.')
                    message.reply({ embeds: [player404], allowedMentions: { repliedUser: false } })
                } else if (e.message === errors.PLAYER_HAS_NEVER_LOGGED) {
                    const neverLogged = new Discord.MessageEmbed(base)
                        .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                        .setDescription('That player has never logged into Hypixel.')
                    message.reply({ embeds: [neverLogged], allowedMentions: { repliedUser: false } })
                } else {
                    message.reply("Error")
                }       
        });
    }
}