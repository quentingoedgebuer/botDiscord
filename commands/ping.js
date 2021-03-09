const { User } = require("discord.js");
module.exports = {

    name: 'ping',
    description: 'Test Command',
    execute(message){
        const name = message.member.user.tag
        message.channel.send(`Bonjour ${name}`);
        
        
    }

};