const fs = require('fs')
const cheerio = require('cheerio')
const readline = require('readline')

function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function removePontos(str){
  return str.replace(/[.,\/#!$%\^&\*;:{}=`~()"\s]/g, '');
}
function toFileName(inputString) {
  // Convert to lowercase and replace spaces with underscores
  let transformedString
  transformedString = inputString.toLowerCase().replace(/ /g, '_');
  transformedString = removerAcentos(transformedString)
  transformedString = removePontos(transformedString)

  return transformedString;
}


// Create a readline interface with the CSV file as input
const rl = readline.createInterface({
  input: fs.createReadStream('convidados.csv'),
  output: process.stdout,
  terminal: false
})

// Read the HTML file
let html = fs.readFileSync('convidados.html', 'utf-8')

// Listen for the 'line' event on the readline interface
rl.on('line', (line) => {

  let convidado
  if (line.includes('"')){
    convidado = line.split('"')[1]
  } else {
    convidado = line.split(",")[0]
  }
  // Load the HTML content into Cheerio
  let $ = cheerio.load(html);
  
  // Select the elements you want to replace and replace their text
  $('.convidado-nome').text(convidado);
  
  // Write the modified HTML back to the file
  file = `convite/${toFileName(convidado)}.html`
  fs.writeFileSync(file, $.html());
  console.log(`https://casamento.separovi.ch/${file}`)
})