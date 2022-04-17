const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');
const ms = require("ms");

module.exports = {
    name: 'giveaway',
    description: 'Start a giveaway',
    cooldown: 0,
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["MANAGE_GUILD"],

    options: [{
            name: "start",
            description: "Start a giveaway",
            type: "SUB_COMMAND",
            options: [{
                    name: "duration",
                    description: "Provide a duraction for this giveaway (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "Select the amount of winners for this giveaway",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Provide a name of the prize",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Select a channel to send the giveaway to.",
                    type: "CHANNEL",
                }
            ]
        },
        {
            name: "edit",
            description: "Edit a giveaway",
            type: "SUB_COMMAND",
            options: [{
                    name: "message-id",
                    description: "Provide the message id of the giveaway.",
                    type: "STRING",
                    required: true
                }, {
                    name: "duration",
                    description: "Provide a duraction for this giveaway (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winner",
                    description: "Select the amount of winners for this giveaway",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Provide a name of the prize",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Select a channel to send the giveaway to.",
                    type: "CHANNEL",

                }
            ]
        }, {
            name: "end",
            description: "Provide a name of the prize",
            type: "SUB_COMMAND",
            options: [{
                name: "message-id",
                description: "Provide the message id of the giveaway.",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "pause",
            description: "Provide a name of the prize",
            type: "SUB_COMMAND",
            options: [{
                name: "message-id",
                description: "Provide the message id of the giveaway.",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "resume",
            description: "Provide a name of the prize",
            type: "SUB_COMMAND",
            options: [{
                name: "message-id",
                description: "Provide the message id of the giveaway.",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "reroll",
            description: "Provide a name of the prize",
            type: "SUB_COMMAND",
            options: [{
                name: "message-id",
                description: "Provide the message id of the giveaway.",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "delete",
            description: "Provide a name of the prize",
            type: "SUB_COMMAND",
            options: [{
                name: "message-id",
                description: "Provide the message id of the giveaway.",
                type: "STRING",
                required: true
            }]
        },
    ],

    run: async (client, interaction, args, ee) => {
        const {
            options
        } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
            .setColor(ee.wrongcolor)

        const successEmbed = new MessageEmbed()
            .setColor(ee.color)

        switch (Sub) {
            case "start": {
                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize: `**🎉Prize:-__${prize}__**`,
                    hostedBy: interaction.user || null,
                    thumbnail: interaction.guild.iconURL({ dynamic: true }) || null,
                    messages: {
                        giveaway: `**🎉GIVEAWAY STARTED🎉!!**`,
                        giveawayEnded: `**🎉GIVEAWAY ENDED🎉!!**`,
                        drawing: `**Ends: __{timestamp}__**`,

                        dropMessage: `Be the first to react with ${client.allEmojis.giveaway.react} !`,
                        inviteToParticipate: '`React with "🎉" to participate in this giveaway`',
                        winMessage: `***__{winners}__! Please claim your reward(s) from the host***`,
                        embedFooter: 'Ends:-',
                        noWinner: `Giveaway cancelled, No valid participations. :cry:`,
                        hostedBy: `**👑Hosted By: {this.hostedBy}**`,
                        winners: '**🥳Winner(s):**',
                        endedAt: 'Ended',
                    },
                    lastChance: {
                        enabled: true,
                        content: '⚠️ **LAST CHANCE TO ENTER!** ⚠️',
                        threshold: 5000,
                        embedColor: '#000000'
                    }
                }).then(async () => {
                    successEmbed.setDescription("Giveaway was successfully started")
                    return interaction.reply({
                        embeds: [successEmbed],
                        ephemeral: true
                    });
                }).catch((err) => {
                    successEmbed.setDescription(`An Error has Occurred\n ${err}`)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    });
                })
            }
            break;
        case "edit": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }
            const duration = options.getString("duration");
            const newWinnerCount = options.getInteger("winners");
            const newPrize = options.getString("prize");

            client.giveawaysManager.edit(messageId, {
                addTime: ms(duration),
                newWinnerCount,
                newPrize: `${client.allEmojis.giveaway.drop} ${newPrize} ${client.allEmojis.giveaway.drop}`,
            }).then(async () => {
                successEmbed.setDescription("Giveaway was successfully updated")
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                });
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred\n ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            })
        }
        break;
        case "end": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            client.giveawaysManager.end(messageId).then(() => {
                successEmbed.setDescription(`Giveaway has been Ended`)
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                })
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred\n ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            });
        }
        break;
        case "pause": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            client.giveawaysManager.pause(messageId, {
                pauseOptions: {
                    isPaused: true,
                    content: '⚠️ **THIS GIVEAWAY IS PAUSED!** ⚠️',
                    unPauseAfter: null,
                    embedColor: '#000000'
                }
            }).then(() => {
                successEmbed.setDescription(`Giveaway has been Paused`)
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                })
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred\ ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            });
        }
        break;
        case "resume": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            client.giveawaysManager.unpause(messageId).then(() => {
                successEmbed.setDescription(`Giveaway has been Resumed`)
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                })
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred\n ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            });
        }
        break;
        case "reroll": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            client.giveawaysManager.reroll(messageId, {
                messages: {
                    congrat: `${client.allEmojis.giveaway.react} New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}`,
                    error: 'No valid participations, no new winner(s) can be chossen!'
                }
            }).then(() => {
                successEmbed.setDescription(`Giveaway has been Rerolled`)
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                })
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred\n ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            });
        }
        break;
        case "delete": {
            const messageId = options.getString("message-id");
            const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

            if (!giveaway) {
                errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild.`);
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            client.giveawaysManager.delete(messageId).then(() => {
                successEmbed.setDescription(`Giveaway has been Deleted`)
                return interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                })
            }).catch((err) => {
                errorEmbed.setDescription(`An Error has Occurred \n ${err}`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            });
        }
        break;
        }
    }
}