var mongoose = require('mongoose');
const Cupon = require('../models/cupon.model');
let fs = require('fs');
//const multiparty = require('multiparty');
const index = require( '../index' );

'use strict';

exports.agregarCupon = (req, res) => {

  console.log("Llego");

  let imgbase64 = req.query.img.replace(/^data:image\/jpeg;base64,/,"");

  fs.writeFile("imagen.jpeg", imgbase64, 'base64', (err) => {
    if(err)
      return console.log(err);
 
      async function detectText() {
      // Imports the Google Cloud client library
      const vision = require('@google-cloud/vision');

      // Creates a client
      const client = new vision.ImageAnnotatorClient();

      // Performs text detection on the image file
      const [result] = await client.documentTextDetection('imagen.jpeg');
      const fullTextAnnotation = result.fullTextAnnotation;
      console.log(`Full text: ${fullTextAnnotation.text}`);
      fullTextAnnotation.pages.forEach(page => {
      	page.blocks.forEach(block => {
      		block.paragraphs.forEach(paragraph => {

      			console.log("parrafo", paragraph);

      			paragraph.words.forEach(word => {
      				const wordText = word.symbols.map(s => s.text).join('');
      				console.log(`Word text: ${wordText}`);
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
   } );

}

guardarCupon = (numCupon, nombre, ci, telefono, correo, img, res) => {

	let cupon = new Cupon ({
		_id: mongoose.Types.ObjectId(),
		numcupon: numCupon,
		nombre: nombre,
		ci: ci,
		telefono: telefono,
		correo: correo,
		img: img
	});


	cupon.save()
			.then((u) => {
				res.json({Mensaje: 'Cupon agregado con éxito.'});
			})
			.catch((err) => {
				console.log(err);
				res.json({Error: 'Error'});
	});

}