var nodemailer = require('nodemailer');




module.exports = {
  enviarEmail(nome, data, email, outputBytes){
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            user: 'alinemediato.certificado@gmail.com',
            pass: 'ppilvzcrzqtfskou'
          }
        });
         
          var mailOptions = {
            from: 'Instituto Aline Mediato <alfredojuliano619@gmail.com>',
            to: email,
            subject: 'Certificado - Maratona Viver da Educação',
            text: `Olá,

            É com muita satisfação que venho te certificar pela sua participação na Maratona Viver da Educação!
            
            Quero te parabenizar pela sua atitude de buscar capacitação, se preocupando em oferecer um trabalho sério, com responsabilidade, amor e por ter no coração o desejo de transformar a história de muitas famílias.
            
            Espero que esse evento tenha agregado muito conhecimento e ajudado você a seguir acreditando que toda criança possa aprender.
            
            
            Um  grande beijo...
            
             
            
            Att: Aline Mediato`,
            attachments: [
              {
                filename: nome+' certificado.pdf',
                content: outputBytes,
                encoding: 'base64',
              },
            ],
            
          };
          
           transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
