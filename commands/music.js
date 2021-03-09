module.exports = {

    name: 'play',
    description: 'commande de music',
    
execute(message){

    const ytdl = require("ytdl-core");
    
    const prefix= '!';
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

}
}