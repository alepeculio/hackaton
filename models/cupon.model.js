var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validarCorreo(correo){
	var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return patron.test(correo);
}

var cuponSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	numcupon:{type:Number, required:true},
	nombre:{type: String,required: true,max: 200, trim:true},
	ci:{type:Number, required:true},
	telefono:{type:Number, required:true},
	correo:{type: String,validate: [validarCorreo, false], unique:true},
	img: { type: String, required: true},
});

module.exports = mongoose.model('Cupon', cuponSchema);