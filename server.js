// app.js
const express = require('express');
const { run } = require('./pdf/PdfComponent');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000
app.use(cors());
app.use(express.json());
app.get("/", async(req, res) =>{
    console.log("nao")
})
app.post("/gerarPdf", async (req, res) => {
        console.log("chegou")
        // Obtenha a data atual
        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.toLocaleString('default', { month: 'long' });
        const ano = dataAtual.getFullYear();
        
        // Crie a string da data no formato desejado
        const data = `${dia} de ${mes} de ${ano}`;
        console.log(data)
        run(req.body.nome,data, req.body.email).then(retorno =>{
        if(retorno){
            console.log("Deu certo")
            return res.send("Deu certo")
        }
    }).catch(err =>{
        console.log(err)
    })
});

app.listen(port, () =>{
    console.info(`Aplicação rodando na porta ${port}!`)
});
console.log("Servidor escutando na porta "+ port +"...")