module.exports = {

    name: 'remove',
    description: 'suppression de message',
    execute(message){
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
    }

};