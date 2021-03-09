module.exports = {

    name: 'finish',
    description: 'commande de music',
    
execute(message){
    const ytdl = require("ytdl-core");

    const prefix= '!';

    message.member.voice.channel.join().then(connection =>{
        let args = message.content.split(" ");

        if(!args[1]){
            message.reply('musique deconnecter.')
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
}