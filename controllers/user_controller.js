console.log("modul AUTENTICACIO USUARI");


var users =
	{
		radiologia: {id: 1, username: "radiologia", password: "rdl"},
		jordi: {id: 2, username: "jordi" , password: "jmg"}
	};

exports.autenticar = function(usuari, password, callback){
	if(users[usuari]){
		if(password === users[usuari].password){
			callback(null, users[usuari]);
		}else{
			callback(new Error('password erroni'));
		}
	}else{
		callback(new Error('usuari no existeix'));
	}

}