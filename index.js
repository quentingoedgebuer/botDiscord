const fs = require('fs');

const Discord = require('discord.js');
const ytdl = require("ytdl-core");

const { prefix, token , channel_bienvenue, role} = require('./config.json');
const { config } = require('process');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('pret!');
});

client.on('message', message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('erreur');
    }

})


client.on('guildMemberAdd', member =>{
    console.log(`Nouveau membre ${member}`)
    //console.log(config.greeting.channel)
    let embed = new Discord.MessageEmbed()
    client.channels.cache.get(channel_bienvenue).send(`${member} a rejoint le serveur ! Nous sommes desormais ${member.guild.memberCount}`)
    member.roles.add(role)
    
})

client.on('guildMemberAdd', member =>{
    member.createDM().then(channel =>{
        channel.send(`Bienvenue sur le serveur ${member}`);
    })
})

client.on('guildMemberRemove', member =>{
    console.log("membre disparu")
    client.channels.cache.get("816967323540783125").send(`${member} nous a quitté ...`)
})


/*client.on("message", message =>{
    if(message.content.startsWith(prefix + "play")){
    if(message.member.voice.channel){
        message.member.voice.channel.join().then(connection =>{
            let args = message.content.split(" ");

            if(!args[1]){
                message.reply('lien de la video mal mentionner.')
                connection.disconnect();
            }else{

            let dispatcher = connection.play(ytdl(args[1], { quality: 'highestaudio'}));

            dispatcher.on("finish", () =>{
                console.log('finish');
                dispatcher.destroy();
                connection.disconnect();
            });

            dispatcher.on("error", err =>{
                console.log('erreur de dispatcheur '+err)
            });
        
        } 
        }).catch(err => {
            message.reply("Erreur lors de la connexion : " + err);
        });
    }
        else{
            message.reply('vous n etes pas en vocal.');
        }

}

});*/


client.login(token);