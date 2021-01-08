var models = require("../models/models.js");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('RMNTAC', 'rdl', 'asepeyo');


// GET  activitatRMN
exports.llistatAnys = function(req, res){

	sequelize.query(
		"select distinct year(data) as Any2 from activitat",
		{  type: sequelize.QueryTypes.SELECT }
	).then(function(ConsultaAnys){
		console.log("Consulta Anys: " + JSON.stringify(ConsultaAnys));
	  	res.send({anys: ConsultaAnys});
	});		

}



exports.llistarRegistresSegonsAny = function(req, res){
	console.log("******  llistarRegistresSegonsAny *****")
	
	var vAny = req.query.vAny2 || null;
	var vModalitat = req.query.vModalitat2 || null;
	console.log ("*** vAny: " + vAny);


	sequelize.query(

		"select distinct " +
		    "prova, " +
			"count(if(month(data) = 1, prova, null)) as Gen, " +
			"count(if(month(data) = 2, prova, null)) as Feb, " +
			"count(if(month(data) = 3, prova, null)) as Mar, " +
			"count(if(month(data) = 4, prova, null)) as Abr, " + 
			"count(if(month(data) = 5, prova, null)) as Mai, " + 
			"count(if(month(data) = 6, prova, null)) as Jun, " +
			"count(if(month(data) = 7, prova, null)) as Jul, " +
			"count(if(month(data) = 8, prova, null)) as Ago, " +
			"count(if(month(data) = 9, prova, null)) as Stb, " +
			"count(if(month(data) = 10, prova, null)) as Oct, " +
			"count(if(month(data) = 11, prova, null)) as Nov, " +
			"count(if(month(data) = 12, prova, null)) as Des, " +
			"count(prova) as TotalFila " +
		"from " +
		    "activitat " +
		"where year(data) =  " + vAny  + " and modalitat like '" + vModalitat +  "' " +
		"group by prova",


		{  type: sequelize.QueryTypes.SELECT }
	).then(function(tblActTec){
	  	
	  	res.send({registres: tblActTec});
	});		



}

