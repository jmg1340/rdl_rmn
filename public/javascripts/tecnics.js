$(document).ready(function() {


	// inicialitzar taula registres de tecnics
    llegirTecnics = function( codi){
	    $.ajax({
	        url: "/tecnics/llistar",
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
            cache: false,

	        success: function (dadesTecnics) {
	        	//alert("dadesTecnics: " + dadesTecnics);
	        	
	        	$('#taula_registresTECNICS tbody').empty();
	        	omplirRegistresTaulaTecnics(dadesTecnics.tbl);

	        },
	        error: function(err){
	    		alert("error: " + JSON.stringify(err));
			}
	    });
	}




	//$( "#formulariAfegirActivitat" ).submit(function( event ) {
	$( "#botoAfegirNouTecnic" ).bind("click", function(event) {

 
        $.ajax({
            url: "/tecnics/nouTecnic",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
    		//data: JSON.stringify({ "objectData": formData}),
    		data: JSON.stringify({
            	numero: $("#numero").val(),
            	nom: 	$("#nom").val()
            }),
            success: function (dadesTecnics) {
		        
            	if (dadesTecnics.Error == null){
	            	$('#taula_registresTECNICS tbody').empty();
            		omplirRegistresTaulaTecnics(dadesTecnics.registres);
	            	
	            	var colorFonsNouRegistre = $('#' + $("#numero").val() +' td:first-child').css("background-color");
	            	$('#taula_registresTECNICS tbody > #' + $("#numero").val() +' td').fadeIn().css("background-color", "#00ff00");  // color verd
	            	//$('#taula_registresTECNICS tbody tr:first-child').hide();
	            	//$('#taula_registresTECNICS tbody tr:first-child').show( "drop", {direction: "up"}, 1000 );
	            	$('#taula_registresTECNICS tbody > #' + $("#numero").val() +' td').animate({"background-color": colorFonsNouRegistre}, 2000);  // color gris-negre
	            

	            	// posem els INPUTS a zero
					$("#numero").val("");					
					$("#nom").val("");



	            }else{
	            	var missatge = "";
	            	for (var i=0; i< dadesTecnics.Error.length; i++){
	            		missatge += dadesTecnics.Error[i].message + "\n";
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






	eliminarTecnic = function( codi){

	    $.ajax({
	        url: "/tecnics/" + codi + "/eliminar",   //?_method=DELETE
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



	omplirRegistresTaulaTecnics = function(rows){

	    for (var i=0 ; i<rows.length; i++){
    		$('#taula_registresTECNICS > tbody').append(
		        '<tr id=' + rows[i].codiTec + '>' +
			        '<td>' + rows[i].codiTec + '</td>' +
			        '<td>' + rows[i].nom + '</td>' +
			        '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarTecnic(' + rows[i].codiTec + ')" title="Eliminar registre">'  +
			        		'<span class="ui-icon ui-icon-circle-close red"></span>' +
			            '</button>' +
			         '</td>' +
		      	'</tr>'
    		);
    	}

	}


});