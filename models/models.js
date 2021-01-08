
var path = require("path");

// Cargar modelo ORM (Object Relational Mapping)
var Sequelize = require("sequelize");

var sequelize = new Sequelize('RMNTAC', 'rdl', 'asepeyo', {
  host: 'localhost',
  dialect: 'mysql',
  
  options:{
    port: 5432,
    //timezone: '+02:00'
  },

  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 10000
  }
}); 



//Importar la definicio de la taula ACTIVITAT de tblActivitat.js
var TblActivitat = sequelize.import(path.join(__dirname, "tblActivitat"));

//Importar la definicio de la taula TECNCS de tblTecnics.js
var TblTecnics = sequelize.import(path.join(__dirname, "tblTecnics"));

//Importar la definicio de la taula TECNCS de tblTecnics.js
var TblProves = sequelize.import(path.join(__dirname, "tblProves"));




/** RELACIONS ENTRE TAULES **/
/*
* Un registre de TblActivitat pertenece a un registre de la TblTecnics
* Al establir {foreignKey: 'idPersonal'} automaticament crea el camp idPersonal a la taula tblActivitat* que relaciona amb el camp clau de la taula TblTecnics
*/
//TblActivitat.belongsTo(TblTecnics,  {foreignKey: 'realitzador', onDelete: "CASCADE", constraints: true}); 

/*
* Un registre de la taula TblTecnics puede tener muchos registres de TblActivitat
*/
//TblTecnics.hasMany(TblActivitat, { foreignKey: 'realitzador', onDelete: "CASCADE", constraints: true} ); 



exports.TblActivitat = TblActivitat; // exporta la definicio de la taula tblTecnics
exports.TblTecnics = TblTecnics; // exporta la definicio de la taula tblTecnics
exports.TblProves = TblProves; // exporta la definicio de la taula tblTecnics



//will, based on your model definitions, create any missing tables.

sequelize.sync().then(function(){
  
  TblActivitat.count().then(function(countRegTblActivitat){
    console.log("registres de TblActivitat: " + countRegTblActivitat);
  });
  console.log("conexio a 'RMN' (Mysql) establerta !!");

  TblTecnics.count().then(function(countRegTblTecnics){
    console.log("registres de TblTecnics: " + countRegTblTecnics);
  });
  
  TblProves.count().then(function(countRegTblProves){
    console.log("registres de TblProves: " + countRegTblProves);
  });
  

})
