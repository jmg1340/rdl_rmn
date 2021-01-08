var models = require("../models/models.js");
var Sequelize = require("sequelize");



// GET  activitatRMN
exports.llistarProves = function(req, res){

	models.TblProves.findAll(
		{
			attributes: 
			[
				'codiProva', 
				'prova'
  			],
			order: "prova"
		}
	).then(function(tblTec){
	  	res.send({tbl: tblTec});
	});		

}




exports.afegirNovaProva = function(req, res){

	var oDadesProves = models.TblProves.build({
		prova:	req.body.prova
	});


	oDadesProves.validate().then(function(err){
		console.log("************ VALIDACIO NOVA PROVA**************");

		
		if(err){
			res.send({registres: null, Error: err.errors});

		}else{
			//console.log("************ DADES CORRECTES **************");
			oDadesProves.save({fields: ["prova"]}).then(function(nouRegistre){
				console.log("***** DADES Prova GUARDADES ********");
				console.log("JSON.stringify(nouRegistre): " + JSON.stringify(nouRegistre));
				console.log("codiProva: " + nouRegistre.codiProva + "\n" + 
							"prova: " + nouRegistre.prova);


				models.TblProves.findAll(
					{
						attributes: 
						[
							'codiProva', 
							'prova'
			  			],
						order: "prova ASC"
					}).then(function(tblTec){
				  	
				  	res.send({registres: tblTec, idNouRegistre: nouRegistre.codiProva, Error: null});
				});	
			});
		}
	});



}




exports.eliminarProva = function(req, res){
	console.log("** estic a la funcio eliminarProva **");

	var codi_Prova = req.params.codi;
	models.TblProves.findById(codi_Prova).then(function(oProva){
		if (oProva){

			oProva.destroy().then(function(){
				res.send({missatge: "usuari eliminat"});
			});

		}
	});



}
