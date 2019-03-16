var mongoose = require('mongoose');
const Cupon = require('../models/cupon.model');
//const multiparty = require('multiparty');
const index = require( '../index' );

'use strict';

exports.agregarCupon = (req, res) => {
	
  async function detectText() {

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.documentTextDetection('prueba2.jpg');
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

  detectText().catch(console.error);
}

/*guardarCupon = (numCupon, nombre, ci, telefono, correo, img, res) => {

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

}*/