$(document).ready(function() {



	// inicialitzar selector de proves
	actualitzarComboProves = function(){
	    $.ajax({
	        url: "/proves/llistar",
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
            cache: false,

	        success: function (dades) {
	        	$("#prova").html("");
	    		$("#prova").append('<option value=""></option>');
	        	for (var i=0 ; i<dades.tbl.length; i++){
	        		$("#prova").append('<option value="' + dades.tbl[i].prova + '">' + dades.tbl[i].prova + '</option>');
	        	}
	        },
	        error: function(err){
	    		alert("error: " + JSON.stringify(err));
			}
	    });
	}
	actualitzarComboProves();
	

    $("#contrast").val("No");	// inicialitzar selector contrast


	// inicialitzar selector de tecnics
    actualitzarComboTecnics = function(){
	    $.ajax({
	        url: "/tecnics/llistar",
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
            cache: false,

	        success: function (dades) {
	        	$("#realitzador").html("");
	    		$("#realitzador").append('<option value=""></option>');
	        	for (var i=0 ; i<dades.tbl.length; i++){
	        		$("#realitzador").append('<option value="' + dades.tbl[i].nom + '">' + dades.tbl[i].nom + '</option>');
	        	}
	        },
	        error: function(err){
	    		alert("error: " + JSON.stringify(err));
			}
	    });
	}	
	actualitzarComboTecnics();




	// inicialitzar selector dia
	dataActual = function(){
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());

		return dia + "-" + mes  + "-" + new Date().getFullYear() ;

	}

	$( "#seleccioData" ).val(dataActual());





    $( "#seleccioData" ).datepicker({
            //defaultDate: new Date(),
            constrainInput: true,
            changeMonth: false,
            changeYear: false,
            dateFormat: 'dd-mm-yy',
            firstDay: 1,    //Sunday is 0, Monday is 1, etc.
            dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
            dayNamesMin: [ "Dg", "Dll", "Dm", "Dcr", "Dj", "Dv", "Ds" ],
            monthNames: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
            monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
        	onSelect: function(dataSeleccionada){
 				actualitzarTaulaActivitats();
        	}
    });







	// inicialitzar taula registres del dia actual
    actualitzarTaulaActivitats = function(){
	    var query = "?data2=" + $("#seleccioData").val() + "&" + "modalitat=" + $("#modalitatSeleccionada").val()
	    //alert("query:" + query);

	    $.ajax({
	        url: "/activitat/registresSegonsDataModalitat" + query,
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        cache: false,
/*			data: JSON.stringify({
	        	data2: 		$( "#seleccioData" ).val(),
	        	modalitat: 	$( "#modalitatSeleccionada" ).val()
	        }),
*/	        success: function (dades) {
	        	//alert("success ajax: " + JSON.stringify(dades));
	        	
	        	$('#taula_registresLLibre tbody').empty();
	        	omplirRegistresTaula(dades.registres, dades.total);

	        },
	        error: function(err){
	    		alert("error ajax: " + JSON.stringify(err));
			}
	    });
	}

	actualitzarTaulaActivitats();







	
	var myInterval = setInterval(function(){ actualitzarTaulaActivitats(); }, 30000);

	$( "#modalitatSeleccionada" ).bind("change", function(event) {
	    
	    // quan es tria TOTES les modalitats, cada 1 minut s'actualitza la taula d'activitats
	    // per la resta d'opcions es desactiva el timer
	    if($("#modalitatSeleccionada").val() === "%"){
	    	myInterval = setInterval(function(){ actualitzarTaulaActivitats(); }, 30000);   // 1s = 1000 ms
	    } else{
	    	if(myInterval !== undefined){
	    		clearInterval(myInterval);
	    	}
	    }
	    
		actualitzarTaulaActivitats();
	});




	

	//$( "#formulariAfegirActivitat" ).submit(function( event ) {
	$( "#botoAfegirNovaActivitat" ).bind("click", function(event) {

		//var formData = JSON.stringify($('formulariAfegirActivitat').serializeObject);
		//alert("FORMDATA: " + formData);
        
        $.ajax({
            url: "/activitat/novaActivitat",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
    		//data: JSON.stringify({ "objectData": formData}),
    		data: JSON.stringify({
            	data: 		 $("#seleccioData").val(),
            	procedencia: $("#procedencia").val(),
            	pacient: 	 $("#pacient").val(),
            	proces: 	 $("#proces").val(),
            	prova: 		 $("#prova").val(),
            	modalitat: 	 $("#modalitat").val(),
            	contrast: 	 $("#contrast").val(),
            	realitzador: $("#realitzador").val(),

            	modalitatSeleccionada: $("#modalitatSeleccionada").val()
            }),
            success: function (dades) {
            	//alert("success del AJAX de formulari d'afegir nova activitat");
            	
            	//alert("ha passat pel success");
		        
            	if (dades.Error == null){
	            	$('#taula_registresLLibre tbody').empty();
            		
            		omplirRegistresTaula(dades.registres, dades.total);
	            	
	            	var colorFonsNouRegistre = $('#' + dades.idNouRegistre +' td:first-child').css("background-color");
	            	$('#taula_registresLLibre tbody > #' + dades.idNouRegistre +' td').fadeIn().css("background-color", "#00ff00");  // color verd
	            	//$('#taula_registresLLibre tbody tr:first-child').hide();
	            	//$('#taula_registresLLibre tbody tr:first-child').show( "drop", {direction: "up"}, 1000 );
	            	$('#taula_registresLLibre tbody > #' + dades.idNouRegistre +' td').animate({"background-color": colorFonsNouRegistre}, 2000);  // color gris-negre
	            

	            	// posem els INPUTS a zero
					$("#procedencia").val("");					
					$("#pacient").val("");
					$("#proces").val("");
					$("#prova").val("");
					//$("#rmn").val("");
					$("#contrast").val("No");		
					//$("#realitzador").val("");

					$("#procedencia").focus();

	            }else{
	            	var missatge ="";
	            	for (var i=0; i< dades.Error.length; i++){
	            		missatge += dades.Error[i].message + "\n";
	            	}
	            	alert(missatge);
	            }
            },
            error: function(Error){
        		alert("error: " + Error.description);
    		}
        });		



		event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
	});






	eliminarActivitat = function( codi){

	    $.ajax({
	        url: "/activitat/" + codi + "/eliminar",   //?_method=DELETE
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        success: function (missatge) {
	        	//alert("success del AJAX de CANVI DE DIA");
	        	
	        	$('#' + codi).remove();
	        },
	        error: function(err){
	    		alert("error: " + err.message);
			}
	    });		

	}



	omplirRegistresTaula = function(rows, total2){
		//alert("rows: " + JSON.stringify(rows));

	    for (var i=0 ; i<rows.length; i++){
    		$('#taula_registresLLibre > tbody').append(
		      	'<tr id=' + rows[i].codiAct + '>' +
			        '<td>' + rows[i].data + '</td>' +
			        '<td>' + rows[i].procedencia + '</td>' +
			        '<td>' + rows[i].pacient + '</td>' +
			        '<td>' + rows[i].proces + '</td>' +
			        '<td>' + rows[i].prova + '</td>' +
			        '<td>' + rows[i].modalitat + '</td>' +
			        '<td>' + rows[i].contrast + '</td>' +
			        '<td>' + rows[i].realitzador + '</td>' +
			        '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarActivitat(' + rows[i].codiAct + ')" title="Eliminar registre">'  +
			        		'<span class="ui-icon ui-icon-circle-close red"></span>' +
			            '</button>' +
			         	'</td>' +
	/*
			        '<td>' + 
			          '<form action="/activitat/' + dades.registres[i].codiAct + '/eliminar?_method=DELETE" method="POST">' +
			             '<button class="botoEliminar" onClick="return confirm(\'Confirmar eliminació de:\n\nPACIENT:\t\t<' + dades.registres[i].pacient +'>\');">Eliminar</button>' +
			          '</form>' + 
			        '<td>' +
	*/			      
		      	'</tr>'
    		);
    	}

    	$("#total > span").html(total2);
	}







    dialogTecnics = $( "#dialogTecnics" ).dialog({
      autoOpen: false,
      height: 0.6 * screen.height,
      width: 400,
      modal: true,
      close: function() {
        actualitzarComboTecnics();
        //form[ 0 ].reset();
      }
    });

    $( "#tecnics" ).button().on( "click", function() {
      dialogTecnics.dialog( "open" );
      llegirTecnics();
    });







    dialogProves = $( "#dialogProves" ).dialog({
      autoOpen: false,
      height: 0.6 * screen.height,
      width: 400,
      modal: true,
      close: function() {
        actualitzarComboProves();
        //form[ 0 ].reset();
      }
    });

    $( "#proves" ).button().on( "click", function() {
      dialogProves.dialog( "open" );
      llegirProves();
    });









});