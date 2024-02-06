var nodemailer = require('nodemailer');




module.exports = {
    enviarEmail(nome, data, email, outputBytes){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
              user: 'alfredojuliano619@gmail.com',
              pass: 'rftyokswzsjlqibi'
            }
          });
         
          var mailOptions = {
            from: 'Certifica de conclusão! <alfredojuliano619@gmail.com>',
            to: email,
            subject: 'certificado emitido com sucesso ✅',
            text: `Seu certificado foi emitido com sucesso, em anexo está o arquivo para download`,
            attachments: [
              {
                filename: 'certificadoConclusao.pdf',
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
