require('dotenv').config();
require('./handlers/keepAlive.js')();
const config = require('./botconfig/config.json');
const ee = require('./botconfig/embed.json');
const {
    Client,
    Collection,
    Intents,
    CommandInteraction,
    ReactionUserManager,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,  
} = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const voice = require("@discordjs/voice");
const { GiveawaysManager } = require('discord-giveaways')
const INTENTS = new Intents(32767);
const client = new Client({
    fetchAllMembers: false,
    // restTimeOffset: 0,
    shards: 'auto',
    allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    intents: INTENTS,
    presence: {
        activities: [{
            name: `Slash Commands`,
            type: "WATCHING",
        }],
        status: "dnd"
    }
});

client.slashCommands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.allEmojis = require("./botconfig/emojis.json");
client.owners = ["774355558353731584"];



client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

["extraEvents", "antiCrash", "eventHandler", "slashCommandHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

require("./handlers/enmapDB")(client);
require("./handlers/giveawayEvents")(client);




client.login(config.env.TOKEN || process.env.TOKEN);

