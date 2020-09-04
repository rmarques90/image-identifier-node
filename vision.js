const fs = require("fs");
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

//lembrar de fazer sua propria credencial na pasta resources com o nome de myCredential.json
const options = {
    keyFilename: './resources/myCredential.json'
};

async function labelDetection(imageWithPath) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient(options);

    // Performs label detection on the image file
    const [result] = await client.labelDetection(imageWithPath);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

    //remover a imagem
    fs.unlinkSync(imageWithPath);

    return labels && labels.length ? labels.map(l => l.description.toLowerCase()) : [];
}

module.exports = {
    labelDetection
};