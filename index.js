const fs = require('fs')
const cheerio = require('cheerio')
const readline = require('readline')

function toFileName(inputString) {
  // Convert to lowercase and replace spaces with underscores
  let transformedString = inputString.toLowerCase().replace(/ /g, '_');
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
  let values = line.split(",")
  let convidado = values[0]
  console.log(convidado)
  // Load the HTML content into Cheerio
  let $ = cheerio.load(html);
  
  // Select the elements you want to replace and replace their text
  $('.convidado-nome').text(convidado);
  
  // Write the modified HTML back to the file
  fs.writeFileSync(`convite/${toFileName(convidado)}.html`, $.html());
})