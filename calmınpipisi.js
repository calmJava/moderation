const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const invites = {};
const wait = require("util").promisify(setTimeout);

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})


client.on('message', message => {
    const prefix = "!"; // prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

client.on("ready",() => {
  console.log("Bot Hazır");
  var randomMesajlar = ["Béta ❤️ Lùcy","Lùcy ❤️ Béta","Lùcy ❤️ Lyra"]
  setInterval(function() {
      var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
      client.user.setActivity(`${randomMesajlar1}`);}, 3 * 30000);
  client.user.setStatus("idle");
  })

client.config = {

    duckyinhasmetlitokeni: 'ODg3Nzc3MzY0Mzg0Mjk3MDAx.YUJFGQ.0iXjdeEtv_ZvGQsfzcaKDRY7L7M', //token
    guildID: '747427056790274058', //sunucu id

   ////////////////////////////////

    banhammer: ['885577322516848750',"885577322516848750"], // Ban yetkilileri

    register: ['885577325666787328',"885577325666787328"], // register yetkilileri (say atıcak)

    yetkilises: ['885577304011583509'], // yetkilises atabilecek kişiler

    jailhammer: ['885577322999193621',"885577322999193621"], // Jail yetkilileri
    jailRoles: ['885577339201785907'], // Jail rolleri


    mutehammer: ['885577324081319987'], // mute Yetkili rolleri
    muteRoles: ['885577340107755550'], // chat mute rolleri

    voicemutehammer:['85577324081319987'], // v.mute Yetkili rolleri
    voicemuteRoles: ['885577340107755550'], // ses mute rolleri

    transport: ['885577324840517632'], // fçek - fgit kullanacak kişiler

    booster: ['753716643011756164'], //BOOSTER İSİMİ KULLANICAK KISILER

    uyarhammer: ['885577322999193621'], //uyarı atıcak kişiler
    uyarıtemizle: ['885577322999193621'], //uyarı temızlıck kişiler

    toplutaşı: ['885577324840517632'], // toplutaşı atıcak kişiler

    rolinfo: ['885577304011583509'], // rolinfo atıcak kişiler

    kilithammer: ['885577304011583509'], // .kilit kullanacak kişiler

    siciltemizle: ['885577322999193621'], //SİCİL TEMİZLEYECEK KİŞİLER

    katıldı: ['817318032971005992'], //KATILDI ROLÜ
    katıldıhammer: ['817318032971006001'], //KATILDI ROLU VERECEK KİŞİLER
    toplantikanal: ['817318034611372040'], //TOPLANTI KANALI

    sil: ['885577325666787328'], //SİL ATABİLECEK KİŞİLER

    ////////////////////////////////

    king: ['885577304011583509'],
      ////////////////////////////////

   yetkilialımdm: ['886328845442101308'], //YETKI VERECEK ALACAK KİŞİLER!

    ilkyetkilipermi: ['885577320407134218','885577325666787328','885577319585034310','885577318821658634','885577318083485786'], //İLK YETKİLİ PERMİ + REGİSTER ROL İD

    ////////////////////////////////
    tik: '887764117442666566', //tik
    no: '887764128112996353', //carpı
    
    tag:'♱' ,//tag
    tag2:'♱'
}

client.on('message', message => {
            if (!message.guild || message.author.bot || message.content.startsWith('.')) return;
            let embed = new Discord.MessageEmbed().setColor('#2F3136')

            if (message.mentions.users.size >= 1) {
                let member = message.mentions.users.first();
                if (db.get(`${member.id}_sebeb`)) {
                    const time = moment.duration(Date.now() - db.get(`${member.id}_afktime`)).format("DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")
                    message.channel.send(embed.setDescription(`${member} adlı kullanıcı, **${db.get(`${member.id}_sebeb`)}** sebebi ile **${time}dir** afk!`)).then(x => x.delete({ timeout: 5000 }))
   }
  } else {
   if(db.get(`${message.author.id}_sebeb`)){
     db.delete(`${message.author.id}_sebeb`)
     message.channel.send("`Hoşgeldin artık AFK değilsin!`").then(x => x.delete({ timeout: 5000 }))
   }         
  }
})
let white = {
"852623012012097567": true, //SANTA
"853331091019268118": true, //LUCY
"451059836172501013": true, //SLOİSY
"734502828084559993": true, //SCRİPTS
"520958966222815232": true, //EMORBTW
"847929702521765909": true, //BETANIN YARA
"817919867692122144": true, //SHIELD 2
"817921971429703711": true, //SHIELD 3
"817874487756324864": true, //SUPPORTER
"817874381413941310": true, //MODERATION
"817901251064496169": true, //INVITE
"817906241476755557": true //STAT*/
};
/*Beyaz listede olmayan kişiler yönetici olsa bile reklam yapamaz */
client.on('message', async(message) => {
 if(white[message.author.id] || message.author.id == client.user.id) return;
  let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
  if (link.test(message.content)){
       db.add(`xxPornohub.${message.author.id}`, 1);
	   message.delete()
	 if(db.get(`xxPornohub.${message.author.id}`) >= 2){
    db.push(`${message.author.id}_sicil`, `\`[REKLAM]\` Text kanallarında reklam sebebiyle **Süresiz** mutelendi!`)
    message.channel.send(`\`Text kanallarında reklam sebebiyle Süresiz mutelendin!\``).then(x => x.delete({ timeout: 1000 }))
    return message.member.roles.add(client.config.muteRoles)
	}
  }
})

/*Beyaz listede olmayan kişiler yönetici olsa bile küfür edemez */

client.on('message', async(message) => {
  if(white[message.author.id] || message.author.id == client.user.id) return;
   let kufurler = ["yarrak","allahoc","amk","sikerim","sikim","orospu","orusbu","orospo","orospu çocuğu","orospu cocu","orospu çocu"];
   if (kufurler.some(küfür => message.content.includes(küfür))){
     db.add(`xxPornohubx.${message.author.id}`, 1);
      message.delete()
    if(db.get(`xxPornohubx.${message.author.id}`) >= 10){
     db.push(`${message.author.id}_sicil`, `\`[KÜFÜR]\` Text kanallarında küfür sebebiyle **Süresiz** mutelendi.`)
     message.channel.send(`\`Text kanallarında küfür sebebiyle Süresiz mutelendin!\``).then(x => x.delete({ timeout: 1000 }))  
     return message.member.roles.add(client.config.muteRoles)
     
   } 
   }
 })
setInterval(() => {
  let timeA = (new Date().toLocaleString()).split(/(:| )/)[2]
  if(timeA == "00"){
     db.delete(`xxPornohub`);
	   db.delete(`xxPornohubx`);
  }
}, 6000)
/*Mesaj Silme Log */
client.on('messageDelete', (message) => {
  let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(`Mesaj Sahibi: ${message.author}\nKanal: ${message.channel}\nMesaj İçeriği: \`${message.content}\``)
    .setColor("2F3136")
 return channel.send(embed)
})
client.on('messageUpdate', (oldMessage, newMessage) => {
  let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mesaj-log") //log kanalının ismi
  if(oldMessage.content == newMessage.content) return
  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Güncellendi", oldMessage.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(`Mesaj Sahibi: ${oldMessage.author}\nKanal: ${oldMessage.channel}\nEski: \`${oldMessage.content}\`\nYeni: \`${newMessage.content}\``)
    .setColor("2F3136")
 return channel.send(embed)
})
/*Ufak hatalarda botun ofline olmaması için */
process.on('uncaughtException', function(err) { 
  console.log(err) 
});

const kiltifat = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'Biliyormusun? ducky seni çok seviyor...', 
  'kimse sevmesin ben severim seni caneeeem',
  'seni seviom', 
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'merhem oldun yaralarıma',
    'Mucizelerden bahsediyordum sen geldin aklıma.',
    'sen aglion',
];
client.on("message", async message => {
  if(message.channel.id !== ('886328163628617750')) return;
  let duckywashere = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(duckywashere >= 35) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
    message.reply(`${(kiltifat)[random]}`);
  };
});

client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  { 
    let giriş = client.channels.cache.get('887782995883360287');
    let çıkış = client.channels.cache.get('887782995883360287');
    let odadeğişme = client.channels.cache.get('887782995883360287');
    let logKanali = client.channels.cache.get('887782995883360287');
    let susturma = client.channels.cache.get('887782995883360287');
    let sağırlaştırma = client.channels.cache.get('887782995883360287');

    if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
    if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
    if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
    if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
    if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
    if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
    if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
    if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
  };
});   


client.login(client.config.duckyinhasmetlitokeni)
