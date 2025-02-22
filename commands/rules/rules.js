const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports ={
    rules: function(message,client){   
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('Rules')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'DM all rules',
                        description: 'I will dm you all the rules',
                        value: 'DM_rule',
                    },
                    {
                        label: 'Rule 1',
                        description: 'Be Kind/Respectful to others.',
                        value: 'rule_1',
                    },
                    {
                        label: 'Rule 2',
                        description: 'No Nonsense',
                        value: 'rule_2',
                    },
                    {
                        label: 'Rule 3',
                        description: 'This is a PG-13 Server.',
                        value: 'rule_3',
                    },
                    {
                        label: 'Rule 4',
                        description: 'Assistance from the Staff team',
                        value: 'rule_4',
                    },
                    {
                        label: 'Rule 5',
                        description: 'Submit clips to get a chance to be in the next Gamers React video!',
                        value: 'rule_5',
                    },
                    {
                        label: 'Rule 6',
                        description: 'A few basic rules to look out for',
                        value: 'rule_6',
                    },
                ]),
        );
        message.channel.send({ content: 'To find out more information about a rule select the rule in the menu below!', components: [row] });
    }
}