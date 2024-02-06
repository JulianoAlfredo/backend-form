// app.js
const express = require('express');
const { run } = require('./pdf/PdfComponent');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.post('/gerarPdf', async (req, res) => {
        // Obtenha a data atual
        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.toLocaleString('default', { month: 'long' });
        const ano = dataAtual.getFullYear();
        
        // Crie a string da data no formato desejado
        const data = `${dia} de ${mes} de ${ano}`;
        console.log(data)
    await run(req.body.nome,data, req.body.email).then(retorno =>{
        if(retorno){
            console.log("OK: "+retorno)
        }
    }).catch(err =>{
        console.log(err)
    })
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
});
