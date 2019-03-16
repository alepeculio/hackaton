var mongoose = require('mongoose');
const Cupon = require('../models/cupon.model');
const multiparty = require('multiparty');
const index = require( '../index' );


/*[Ale] ============================================================================================*/

exports.agregarCupon = (req, res) => {
	var form = new multiparty.Form(); //Para el manejo de datos de formularios 'multipart/form-data'

	form.parse(req, function(err, fields, files) {
		var imgPath;
		var contentType; //Extención del archivo.
		if(files.img !== undefined ){
			var filename = files.img[0].originalFilename.split('.');
			contentType = filename[filename.length - 1]; 
			imgPath = files.img[0].path;
		}
}
