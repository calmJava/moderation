const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {


        if (!client.config.register.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new MessageEmbed().setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

        const mapping = {
            "0": "0", // sayı iDleri
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
        };
        var tag = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(client.config.tag)).size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var boost = message.guild.premiumSubscriptionCount
        var duckytoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var duckytag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var duckyses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var duckyonline = `${online}`.split("").map(c => mapping[c] || c).join("")
        var duckyboost = `${boost}`.split("").map(c => mapping[c] || c).join("")
        
        const embed = new MessageEmbed()
            .setDescription(`
            • Sunucuda toplam **${duckytoplamüye}** üye bulunmakta.
            • Sunucuda aktif **${duckyonline}** üye bulunmakta.
            • Sunucuda tagımızı alan **${duckytag}** üye bulunmakta.
            • Sunucuda sesli sohbetlerde  **${duckyses}** üye bulunmakta.
            • Sunucumuzda toplam **${duckyboost}** boost bulunmakta.`)
            .setColor('2F3136')
        message.channel.send(embed).then(message.react(client.config.tik));
    }
}