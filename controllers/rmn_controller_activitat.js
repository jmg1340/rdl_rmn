var models = require("../models/models.js");
var Sequelize = require("sequelize");

/*
// GET  activitat
exports.llistarActivitat = function(req, res){

	// variable objecte 'oActivitat' utilitzada per al formulari de nou registre a taula 'activitat'
	//var oActivitat = models.TblActivitat.build({idPersonal: "", data: "", hora: "", ES: ""});
	var oActivitat = {
			codiAct: 	"", 
			data: 		"", 
			procedencia:"", 
			pacient: 	"", 
			proces: 	"", 
			prova: 		"", 
			rmn: 		"",
			contrast: 	"",
			realitzador:""
	};
	
	// 'data' recollida del parametre '?data=dataSeleccionada' (datepicker)
	var formData = req.params["data"] || null;
	//console.log ("formData: " + formData);
	if(formData === null){
		// formData pren el valor de la data actual
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());

		var dataAAAAMMDD = new Date().getFullYear() + "-" + mes  + "-" + dia;
		var dataDDMMAAAA = dia + "/" + mes  + "/" + new Date().getFullYear();
		//console.log("formData = null --------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("formData = null --------> dataDDMMAAAA: " + dataDDMMAAAA);

		
	}else{
		// formData pren el valor de la data seleccionada (datapicker)
		var dataAAAAMMDD = formData.replace( /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
		var dataDDMMAAAA = formData;
		//console.log("formData = NO null -------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("formData = NO null -------> dataDDMMAAAA: " + dataDDMMAAAA);

	}

	models.TblActivitat.findAll(
		{
			attributes: 
			[
				'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'rmn', 'contrast', 'realitzador',
      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
  			],
			include: models.TblTecnics, where: {"data": new Date(dataAAAAMMDD)}, order: "registre DESC"
		}
	).then(function(tblActTec){
	  	
	  	res.render("rmn/activitat", {tbl: tblActTec, dataEnviada: dataDDMMAAAA, objAct: oActivitat});
	});		


}
*/




exports.llistarRegistresSegonsDataIModalitat = function(req, res){
	console.log("******  llistarRegistresSegonsDataIModalitat *****")
	
	// 'data' recollida del parametre '?data=dataSeleccionada' (datepicker)
	var clWhere = {
		data: 		req.query.data2 || null,
		modalitat: 	req.query.modalitat
	};
	
	console.log ("*** req.query: " + JSON.stringify(req.query));
	console.log ("*** clWhere: " + JSON.stringify(clWhere));
	if(clWhere.data === null){
		// data pren el valor de la data actual
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());

		var dataAAAAMMDD = new Date().getFullYear() + "-" + mes  + "-" + dia;
		//var dataDDMMAAAA = dia + "/" + mes  + "/" + new Date().getFullYear();
		//console.log("data = null --------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("data = null --------> dataDDMMAAAA: " + dataDDMMAAAA);

		
	}else{
		// data pren el valor de la data seleccionada (datapicker)
		var dataAAAAMMDD = clWhere.data.replace( /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
		//var dataDDMMAAAA = data;
		//console.log("data = NO null -------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("data = NO null -------> dataDDMMAAAA: " + dataDDMMAAAA);

	}
	console.log("moment abans d'executar consulta sequelize");
	models.TblActivitat.findAndCountAll(
		{
			attributes: 
			[
				'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'modalitat', 'contrast', 'realitzador',
      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
  			],
			//include: models.TblTecnics, 
			where: {"data": dataAAAAMMDD, "modalitat": {$like: clWhere.modalitat} }, order: "registre DESC"
		}
	).then(function(result){
	  	console.log("======================\n" + "Objecte result:\n\n" + JSON.stringify(result) + "\n========================");
	  	

	  	return res.json({registres: result.rows, total: result.count});
	});		


}


/*
exports.afegirActivitat = function(req, res){
	
	//console.log("*****************  " + JSON.stringify(req.body.objAct));
	var oDadesFormulari = req.body.objAct;
	
	var oDadesActivitat = models.TblActivitat.build({
		//codiAct: 	oDadesFormulari.codiAct, 
		data: 		oDadesFormulari.data, 
		procedencia:oDadesFormulari.procedencia, 
		pacient: 	oDadesFormulari.pacient, 
		proces: 	oDadesFormulari.proces, 
		prova: 		oDadesFormulari.prova, 
		rmn: 		oDadesFormulari.rmn,
		contrast:	oDadesFormulari.contrast,
		realitzador:oDadesFormulari.realitzador
	});

	//console.log("dataAAAMMDD: "+ dataAAAMMDD);
	//console.log("dataDDMMAA: "+ dataDDMMAA);

	//guarda en DB els camps nom, vehicle i matricula
	oDadesActivitat.validate().then(function(err){
		//console.log("************ VALIDACIO **************");

		var dataAAAAMMDD = oDadesFormulari.data.replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
		var dataDDMMAAAA = oDadesFormulari.data;
		oDadesActivitat.data = dataAAAAMMDD;
		console.log("***************** oDadesFormulari.data: " + oDadesFormulari.data);
		console.log("***************** dataAAAAMMDD: " + dataAAAAMMDD);
		console.log("***************** oDadesFormulari.data instanceof String): " + oDadesFormulari.data instanceof String);
		
		if(err){
			console.log("************ HI HA ERRORS **************");
			console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));


			//-------
			//models.TblActivitat.findAll({include: models.TblTecnics, where: {"data": new Date(dataAAAMMDD)}, order: "registre DESC"}).then(function(tblActTec){
		  	
			models.TblActivitat.findAll(
				{
					attributes: 
					[
						'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'rmn', 'contrast', 'realitzador',
		      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
		  			],
					include: models.TblTecnics, where: {"data": new Date(dataAAAAMMDD)}, order: "registre DESC"
				}).then(function(tblActTec){

			  	res.render("rmn/activitat", {tbl: tblActTec, dataEnviada: dataDDMMAA, objAct: oDadesFormulari, zErrores: err.errors});
			});	
			//-------



			//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: err.errors});
		}else{
			//console.log("************ DADES CORRECTES **************");
			oDadesActivitat.save({fields: ["data", "procedencia", "pacient", "proces", "prova", "rmn", "contrast", "realitzador"]}).then(function(){

				//models.TblActivitat.findAll({include: models.TblTecnics, where: {"data": new Date(dataAAAMMDD)}, order: "registre DESC"}).then(function(tblActTec){
				models.TblActivitat.findAll(
					{
						attributes: 
						[
							'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'rmn', 'contrast', 'realitzador',
			      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
			  			],
						include: models.TblTecnics, where: {"data": new Date(dataAAAAMMDD)}, order: "registre DESC"
					}).then(function(tblActTec){
				  	

					oDadesFormulari = {
						codiAct: 	"", 
						data: 		"", 
						procedencia:"", 
						pacient: 	"", 
						proces: 	"", 
						prova: 		"", 
						rmn: 		"",
						contrast:  	"",
						realitzador:""
					};

				  	res.render("rmn/activitat", {tbl: tblActTec, dataEnviada: dataDDMMAAAA, objAct: oDadesFormulari, zErrores: []});
				});	


				//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: []});
			});
		}
	});


}

*/



exports.afegirActivitat_2 = function(req, res){

	// console.log("*****req.body: " + JSON.stringify(req.body));
	// console.log("*****req.params: " + req.params);
	//console.log("*****************  " + JSON.stringify(req.body.objAct));
	
	//var oDadesFormulari = req.body.objAct;
/*	var oDadesFormulari = req.body;
	console.log(
			"oDadesFormulari.data: " + oDadesFormulari.data + "\n" +
			"oDadesFormulari.procedencia: " + oDadesFormulari.procedencia + "\n" +
			"oDadesFormulari.pacient: " + oDadesFormulari.pacient + "\n" +
			"oDadesFormulari.proces: " + oDadesFormulari.proces + "\n" +
			"oDadesFormulari.prova: " + oDadesFormulari.prova + "\n" +
			"oDadesFormulari.rmn: " + oDadesFormulari.rmn + "\n" +
			"oDadesFormulari.realitzador: " + oDadesFormulari.realitzador + "\n"

	);*/
	
	var oDadesActivitat = models.TblActivitat.build({
		//codiAct: 	oDadesFormulari.codiAct, 
		data: 		req.body.data, 
		procedencia:req.body.procedencia, 
		pacient: 	req.body.pacient, 
		proces: 	req.body.proces, 
		prova: 		req.body.prova, 
		modalitat:	req.body.modalitat,
		contrast: 	req.body.contrast,
		realitzador:req.body.realitzador
	});

	var modalitatSeleccionada = req.body.modalitatSeleccionada;

	//console.log("dataAAAMMDD: "+ dataAAAMMDD);
	//console.log("dataDDMMAA: "+ dataDDMMAA);

	//guarda en DB els camps nom, vehicle i matricula
	oDadesActivitat.validate().then(function(err){
		console.log("************ VALIDACIO **************");

		var dataAAAAMMDD = req.body.data.replace( /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
		var dataDDMMAAAA = req.body.data;
		oDadesActivitat.data = dataAAAAMMDD;
		// console.log("***************** req.body.data: " + req.body.data);
		// console.log("***************** dataAAAAMMDD: " + dataAAAAMMDD);
		// console.log("***************** req.body.data instanceof String): " + req.body.data instanceof String);
		
		if(err){
			console.log("************ HI HA ERRORS **************");
			// console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));


			//-------
			//models.TblActivitat.findAll({include: models.TblTecnics, where: {"data": new Date(dataAAAMMDD)}, order: "registre DESC"}).then(function(tblActTec){
		  	/*
			models.TblActivitat.findAll(
				{
					attributes: 
					[
						'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'rmn', 'realitzador',
		      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
		  			],
					include: models.TblTecnics, where: {"data": new Date(dataAAAAMMDD)}, order: "registre DESC"
				}).then(function(tblActTec){


			  	res.send({tbl: tblActTec, dataEnviada: dataDDMMAA, objAct: oDadesFormulari, zErrores: err.errors});
			});*/	
			//-------

			res.send({registres: null, Error: err.errors});

			//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: err.errors});
		}else{
			//console.log("************ DADES CORRECTES **************");
			
			oDadesActivitat.save({fields: ["data", "procedencia", "pacient", "proces", "prova", "modalitat", "contrast", "realitzador"]}).then(function(nouRegistre){

				console.log("***** DADES GUARDADES ********");
				

				models.TblActivitat.findAndCountAll(
					{
						attributes: 
						[
							'codiAct', 'procedencia', 'pacient', 'proces', 'prova', 'modalitat', 'contrast', 'realitzador',
			      			[Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data']
			  			],
						//include: models.TblTecnics,
						where: {"data": dataAAAAMMDD, "modalitat": {$like: modalitatSeleccionada}  },   
						order: "registre DESC"
					}).then(function(result){
				  	

/*					oDadesFormulari = {
						codiAct: 	"", 
						data: 		"", 
						procedencia:"", 
						pacient: 	"", 
						proces: 	"", 
						prova: 		"", 
						rmn: 		"",
						realitzador:""
					};
*/
				  	res.send({registres: result.rows, total: result.count, idNouRegistre: nouRegistre.codiAct, Error: null});
				});	

				

				//res.redirect('/es/' + data3, {objPersonal: oDadesFormulari, zErrores: []});
			});
		}
	});



}




exports.eliminarActivitat = function(req, res){
	console.log("** estic a la funcio eliminarActivitat **");

	// objecte req.personal generada en el middleware AUTOLOAD
	var codi_Act = req.params.codi;
	models.TblActivitat.findById(codi_Act).then(function(oActivitat){
		if (oActivitat){

			oActivitat.destroy().then(function(){
				res.send({missatge: "registre eliminat"});
			});

		}
	});
}
