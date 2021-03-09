module.exports = {

    name: 'avatar',
    description: 'display avatar URL',
    execute(message){

        if(!message.mentions.users.size){
            return message.channel.send(`Votre avatar est : ${message.author.displayAvatarURL({format : 'png' })}`)
        }

        const avatarList = message.mentions.users.map(users =>{
            return `L'avatar de ${users.username} est : ${users.displayAvatarURL({format : 'png' })}`;
        });

        message.channel.send(avatarList);
    }

};