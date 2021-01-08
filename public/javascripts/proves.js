$(document).ready(function() {


	// inicialitzar taula registres de tecnics
    llegirProves = function( codi){
	    $.ajax({
	        url: "/proves/llistar",
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
            cache: false,

	        success: function (dadesProves) {
	        	//alert("success del AJAX de CANVI DE DIA");
	        	
	        	$('#taula_registresPROVES tbody').empty();
	        	omplirRegistresTaulaProves(dadesProves.tbl);

	        },
	        error: function(err){
	    		alert("error: " + JSON.stringify(err));
			}
	    });
	}




	//$( "#formulariAfegirActivitat" ).submit(function( event ) {
	$( "#botoAfegirNovaProva" ).bind("click", function(event) {

 
        $.ajax({
            url: "/proves/novaProva",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
    		//data: JSON.stringify({ "objectData": formData}),
    		data: JSON.stringify({
            	prova: 	$("#prova2").val()
            }),
            success: function (dadesProves) {
		        
            	if (dadesProves.Error == null){
	            	$('#taula_registresPROVES tbody').empty();
            		omplirRegistresTaulaProves(dadesProves.registres);
	            	
	            	var colorFonsNouRegistre = $('#' + dadesProves.idNouRegistre +' td:first-child').css("background-color");
	            	$('#taula_registresPROVES tbody > #' + dadesProves.idNouRegistre +' td').fadeIn().css("background-color", "#00ff00");  // color verd
	            	//$('#taula_registresPROVES tbody tr:first-child').hide();
	            	//$('#taula_registresPROVES tbody tr:first-child').show( "drop", {direction: "up"}, 1000 );
	            	$('#taula_registresPROVES tbody > #' + dadesProves.idNouRegistre +' td').animate({"background-color": colorFonsNouRegistre}, 2000);  // color gris-negre
	            

	            	// posem els INPUTS a zero
					$("#prova2").val("");


	            }else{
	            	var missatge = "";
	            	for (var i=0; i< dadesProves.Error.length; i++){
	            		missatge += dadesProves.Error[i].message + "\n";
	            	}
	            	alert(missatge);
	            }
            },
            error: function(Error){
        		alert("ERROR: " + JSON.stringify(Error));
    		}
        });		



		event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
	});






	eliminarProva = function( codi){

	    $.ajax({
	        url: "/proves/" + codi + "/eliminar",   //?_method=DELETE
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        success: function (missatge) {
	        	
	        	$('#' + codi).remove();
	        },
	        error: function(err){
	    		alert("error: " + err.message);
			}
	    });		

	}



	omplirRegistresTaulaProves = function(rows){

	    for (var i=0 ; i<rows.length; i++){
    		$('#taula_registresPROVES > tbody').append(
		      	//'<tr id=' + rows[i].prova + '>' +
		        '<tr id=' + rows[i].codiProva + '>' +
			        '<td>' + rows[i].prova + '</td>' +
			        '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarProva(' + rows[i].codiProva + ')" title="Eliminar registre">'  +
			        		'<span class="ui-icon ui-icon-circle-close red"></span>' +
			            '</button>' +
			         '</td>' +
		      	'</tr>'
    		);
    	}

	}


});