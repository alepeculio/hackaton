var mongoose = require('mongoose');
const Cupon = require('../models/cupon.model');
//const multiparty = require('multiparty');
const index = require( '../index' );


/*[Ale] ============================================================================================*/

exports.agregarCupon = (req, res) => {
	//guardarCupon(123123, "alejandro peculio", 312432434, 432545, "ale@gmail.com", "sdfskfgbdfñlfñsdm fkgfbdfnlkgblfds", res);	
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