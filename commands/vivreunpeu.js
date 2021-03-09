module.exports = {

    name: 'vivreunpeu',
    description: 'commande de music',
    
execute(message){

    const ytdl = require("ytdl-core");
    
    const prefix= '!';
    if(message.content.startsWith(prefix + "vivreunpeu")){
    if(message.member.voice.channel){
        message.member.voice.channel.join().then(connection =>{
            let args = message.content.split(" ");

            args[1] = 'https://www.youtube.com/watch?v=N7DHVx-8osA';
            

            let dispatcher = connection.play(ytdl(args[1], { quality: 'highestaudio'}));

            dispatcher.on("finish", () =>{
                console.log('finish');
                dispatcher.destroy();
                connection.disconnect();
            });

            dispatcher.on("error", err =>{
                console.log('erreur de dispatcheur '+err)
            });
        
        
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