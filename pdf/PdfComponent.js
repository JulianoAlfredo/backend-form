const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const fontkit = require('@pdf-lib/fontkit');
const { enviarEmail } = require('./SendMail');

async function fillPDF(templateBytes, textCoordinates, fontBytes, fontLatoBytes) {
  const pdfDoc = await PDFDocument.load(templateBytes);
  const [templatePage] = pdfDoc.getPages();

  // Registre fontkit com o documento PDF
  pdfDoc.registerFontkit(fontkit);

  const fontSize = 10;
  const font = await pdfDoc.embedFont(fontBytes);
  const fontLato = await pdfDoc.embedFont(fontLatoBytes);

  // Dimensões da caixa fixa
  const boxWidth = 300;
  const boxHeight = 50;

  for (const [key, { value, x, y, fontName,fontSizes, identify }] of Object.entries(textCoordinates)) {
    const textWidth = (fontName === 'Lato') ? fontLato.widthOfTextAtSize(value, fontSize) : font.widthOfTextAtSize(value, fontSize);
    const textHeight = (fontName === 'Lato') ? fontLato.heightAtSize(fontSize) : font.heightAtSize(fontSize);

    // Calcular as coordenadas para centralizar o texto à esquerda e ajustar à medida que o número de caracteres aumenta
    const boxX = x - boxWidth / 2;
    const boxY = y - boxHeight / 2;

    // Centralizar o texto à esquerda e ajustar conforme o comprimento do texto
    const textX = boxX + (boxWidth - textWidth) / 2 - textWidth / 2;
    const textY = boxY + (boxHeight - textHeight) / 2;
    if(identify == "nome"){
      templatePage.setFontSize(22);
      templatePage.setFontColor(rgb(0.3059, 0.4314, 0.5373))
    } else if(identify == "data"){
      templatePage.setFontSize(14);
      templatePage.setFontColor(rgb(0.2196, 0.2941, 0.4157)) //78,110,137
    }

    // Adicionar o texto à página nas coordenadas fornecidas
    templatePage.drawText(value, { x: textX, y: textY, fontColor: rgb(0, 0, 0), font: (fontName === 'Lato') ? fontLato : font, fontSize: fontSizes});
  }

  const outputBytes = await pdfDoc.save();
  return outputBytes;
}

module.exports = {
  async run(nome, data, email) {
    try {
      const templateBytes = await fs.readFile('./pdf/pdfs/primeiro.pdf');
      const fontBytes = await fs.readFile('./pdf/pdfs/LibreBaskerville-Regular.ttf');
      const fontLatoBytes = await fs.readFile('./pdf/pdfs/Lato-Regular.ttf');

      const outputBytes = await fillPDF(templateBytes, {
        nome: { value: nome, x: 400, y: 380, identify: "nome", fontSizes: 10 },
        data: { value: data, x: 450, y: 250, identify: "data", fontName: 'Lato', fontSizes: 1 }, // Adicione a fonte desejada
      }, fontBytes, fontLatoBytes);

      await fs.writeFile('output.pdf', outputBytes);

      // Envie o e-mail com o PDF anexado
      // Comente a linha abaixo se estiver testando sem realmente enviar o e-mail
      enviarEmail(nome, data, email, outputBytes);
      return "PDF GERADO COM SUCESSO"
     
    } catch (error) {
      return 'Erro ao gerar PDF:'
    }
  }
};
