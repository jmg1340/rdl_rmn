var models = require("../models/models.js");
var Sequelize = require("sequelize");



// GET  activitatRMN
exports.llistarTecnics = function(req, res){

	models.TblTecnics.findAll(
		{
			attributes: 
			[
				'codiTec', 
				'nom'
  			],
			order: "nom"
		}
	).then(function(tblTec){
	  	res.send({tbl: tblTec});
	});		

}




exports.afegirNouTecnic = function(req, res){

	

	// comprovar si ja existeix el codi
	
	models.TblTecnics.findById(req.body.numero).then(function(oTecnics){
		if (oTecnics){
			res.send({registres: null, Error: [{message: "Codi d'usuari (" + oTecnics.codiTec + ") JA EXISTEIX (" + oTecnics.nom + ")"}] });
		}
	});



	var oDadesTecnics = models.TblTecnics.build({
		codiTec: 	req.body.numero, 
		nom:		req.body.nom 
	});


	oDadesTecnics.validate().then(function(err){
		console.log("************ VALIDACIO **************");

		
		if(err){
			res.send({registres: null, Error: err.errors});

		}else{
			//console.log("************ DADES CORRECTES **************");
			oDadesTecnics.save({fields: ["codiTec", "nom"]}).then(function(){

				console.log("***** DADES GUARDADES ********");
				models.TblTecnics.findAll(
					{
						attributes: 
						[
							'codiTec', 
							'nom'
			  			],
						order: "nom ASC"
					}).then(function(tblTec){
				  	
				  	res.send({registres: tblTec, Error: null});
				});	
			});
		}
	});



}




exports.eliminarTecnic = function(req, res){
	console.log("** estic a la funcio eliminarTecnic **");

	var codi_Tec = req.params.codi;
	models.TblTecnics.findById(codi_Tec).then(function(oTecnics){
		if (oTecnics){

			oTecnics.destroy().then(function(){
				res.send({missatge: "usuari eliminat"});
			});

		}
	});



}
