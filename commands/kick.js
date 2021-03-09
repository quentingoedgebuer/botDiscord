module.exports = {

    name: 'kick',
    description: 'Commande d\'expulsion',
    execute(message){
        const utilisateurs = message.mentions.users.first();

        if(utilisateurs){

            const membre = message.guild.member(utilisateurs);

            if(membre){

                membre.kick('Optional reason that will display in the audit logs').then(()=> {

                    message.reply(`Membre expulser : ${utilisateurs.tag}`);
                    console.log(`${utilisateurs.tag}`);
                }).catch(err =>{
                    message.reply('Impossible d\' expulser ce membre');

                    console.error(err)
                });

            } 
            else{
                message.reply('membre introuvable')
            }

        }
        else{
            message.reply('Vous ne pouvez pas mentionner cet utilisateur !')
        }

    }

};