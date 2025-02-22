const Discord = require('discord.js');
const { base } = require('../../../utils/embed');
const { hypixel, errors } = require('../../../utils/hypixel');
const commaNumber = require('comma-number');

module.exports = {
    name: 'duels',
    aliases: [ "d" ],
    description: 'will show you the Duels stats of a player',
    usage: '`h*duels [Classic/UHC/Skywars/Bridge/Sumo/OP/Combo] [IGN]`',
    example: '`h*duels classic RM20_`',
    async execute(message, args) {
        await message.channel.sendTyping()

        if(!args[0]) { // if someone didn't type in gamemode
            const embed = new Discord.MessageEmbed(base)
                .setAuthor('Help', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                .addField('h*duels', '`h*duels` lets you see duels stats about a player.')
                .addField('Usage', '`h*duels classic` \n`h*duels uhc`\n`h*duels skywars`\n`h*duels bridge`\n`h*duels sumo`\n`h*duels op`\n`h*duels combo`')
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }

        var player = args[1];

        if (args[0] == 'classic') {
            if (!args[1]) { // if someone didn't type in ign 
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('Classic Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.classic.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.classic.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.classic.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.classic.wins)}\``, true)
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

        if (args[0] == 'uhc') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('UHC Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.uhc.v1.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.uhc.v1.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.uhc.v1.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.uhc.v1.wins)}\``, true)
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

            }).catch(e => { // error messages
                if (e.message === errors.PLAYER_DOES_NOT_EXIST) {
                    const player404 = new Discord.MessageEmbed(base)
                        .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                        .setDescription('You need to type in a player\'s IGN!')
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

        if (args[0] == 'skywars' || args[0] == 'sw') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('SkyWars Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.skywars.v1.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.skywars.v1.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.skywars.v1.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.skywars.v1.wins)}\``, true)

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

        if (args[0] == 'bridge') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('The Bridge Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.bridge.v1.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.bridge.v1.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.bridge.v1.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.bridge.v1.wins)}\``, true)

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

        if (args[0] == 'sumo') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('Sumo Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.sumo.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.sumo.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.sumo.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.sumo.wins)}\``, true)

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

        if (args[0] == 'op') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('OP Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .setTitle(`[${player.rank}] ${player.nickname}`)
                    .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                    .addField('Kills', `\`${commaNumber(player.stats.duels.op.v1.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.op.v1.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.op.v1.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.op.v1.wins)}\``, true)

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

        if (args[0] == 'combo') {
            if (!args[1]) { // if someone didn't type in ign
                const ign404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('You need to type in a player\'s IGN!')
                return message.reply({ embeds: [ign404], allowedMentions: { repliedUser: false } });
            }
            hypixel.getPlayer(player).then((player) => {
                const embed = new Discord.MessageEmbed(base)
                    .setAuthor('Combo Duels Stats', 'https://hypixel.net/styles/hypixel-v2/images/game-icons/Duels-64.png')
                    .addField('Kills', `\`${commaNumber(player.stats.duels.combo.kills)}\``, true)
                    .addField('Losses', `\`${commaNumber(player.stats.duels.combo.losses)}\``, true)
                    .addField('Deaths', `\`${commaNumber(player.stats.duels.combo.deaths)}\``, true)
                    .addField('Wins', `\`${commaNumber(player.stats.duels.combo.wins)}\``, true)

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
}
