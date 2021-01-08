var express = require('express');
var router = express.Router();

var rmnControllerActivitat = require('../controllers/rmn_controller_activitat');
var rmnControllerTecnics = require('../controllers/rmn_controller_tecnics');
var rmnControllerProves = require('../controllers/rmn_controller_proves');
var rmnControllerResultats = require('../controllers/rmn_controller_resultats');

var sessionController = require('../controllers/session_controller');



/* GET login.ejs. */
router.get('*', function(req, res, next) {
  //console.log("directori: " + process.cwd());
  if (!req.session.user){
  	console.log("USUARI NO IDENTIFICAT");
  	res.render('login', {error: null});
  }
  next();
});





// Definicion de rutas de session
router.get("/login",	sessionController.new);		// formulario login
router.post("/login",	sessionController.create);	// crear sesion
router.get("/logout",	sessionController.destroy);	// destruir sesion






/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'RMN' });
// });

//rutes per a la pagina de les ACTIVITATS
router.get('/activitat', function(req, res) {
  res.render('rmn/activitat');
});
//router.get('/activitat',	rmnControllerActivitat.llistarActivitat);	// mostrar pantalla activitat RMN
router.get('/activitat/registresSegonsDataModalitat',	rmnControllerActivitat.llistarRegistresSegonsDataIModalitat);	// mostrar pantalla activitat RMN
router.post('/activitat/novaActivitat',	rmnControllerActivitat.afegirActivitat_2);
router.get('/activitat/:codi/eliminar',	rmnControllerActivitat.eliminarActivitat);


// rutes per a la pagina dels TECNICS
router.get('/tecnics', function(req, res) {
  res.render('rmn/tecnics');
});
router.get('/Tecnics/llistar',	rmnControllerTecnics.llistarTecnics);
router.post('/tecnics/nouTecnic',	rmnControllerTecnics.afegirNouTecnic);
router.get('/tecnics/:codi/eliminar',	rmnControllerTecnics.eliminarTecnic);


// rutes per a la pagina de les PROVES
router.get('/proves', function(req, res) {
  res.render('rmn/proves');
});
router.get('/proves/llistar',	rmnControllerProves.llistarProves);
router.post('/proves/novaProva',	rmnControllerProves.afegirNovaProva);
router.get('/proves/:codi/eliminar',	rmnControllerProves.eliminarProva);

// rutes per a la pagina RESULTATS
router.get('/resultats', function(req, res) {
  res.render('rmn/resultats');
});
router.get('/resultats/selectorAny',	rmnControllerResultats.llistatAnys);
router.get('/resultats/registresSegonsAny',	rmnControllerResultats.llistarRegistresSegonsAny);	// mostrar pantalla activitat RMN


module.exports = router;
