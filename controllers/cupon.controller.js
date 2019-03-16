var mongoose = require('mongoose');
const Cupon = require('../models/cupon.model');
const multiparty = require('multiparty');
const index = require( '../index' );

'use strict';

exports.agregarCupon = (req, res) => {
	/*var form = new multiparty.Form(); 

	form.parse(req, function(err, fields, files) {
		var imgPath;
		var contentType; 
		if(files.img !== undefined ){
			var filename = files.img[0].originalFilename.split('.');
			contentType = filename[filename.length - 1]; 
			imgPath = files.img[0].path;
		}*/

		async function detectText() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the image file
  const [result] = await client.documentTextDetection('cupon.jpeg');
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(`Full text: ${fullTextAnnotation.text}`);
  fullTextAnnotation.pages.forEach(page => {
  	page.blocks.forEach(block => {
  		console.log(`Block confidence: ${block.confidence}`);
  		block.paragraphs.forEach(paragraph => {
  			console.log(`Paragraph confidence: ${paragraph.confidence}`);
  			paragraph.words.forEach(word => {
  				const wordText = word.symbols.map(s => s.text).join('');
  				console.log(`Word text: ${wordText}`);
  				console.log(`Word confidence: ${word.confidence}`);
  				word.symbols.forEach(symbol => {
  					console.log(`Symbol text: ${symbol.text}`);
  					console.log(`Symbol confidence: ${symbol.confidence}`);
  				});
  			});
  		});
  	});
  });
}

async function detectFulltextGCS(bucketName, fileName) {
  // [START vision_fulltext_detection_gcs]

  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
  // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

  // Read a remote image as a text document
  const [result] = await client.documentTextDetection(
  	`gs://${bucketName}/${fileName}`
  	);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log(fullTextAnnotation.text);
  // [END vision_fulltext_detection_gcs]
}
// [END vision_quickstart]

detectText().catch(console.error);
detectFulltextGCS().catch(console.error);

}
