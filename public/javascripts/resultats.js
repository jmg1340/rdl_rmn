$(document).ready(function() {


    // poso com a menu actiu "Resultats"
    $("#menu-bar > li").removeClass("active");
    $("#menuResultats").addClass("active");



	// inicialitzar selector de l'any
	
    $.ajax({
        url: "/resultats/selectorAny",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,

        success: function (dades) {
        	$("#anys").html("");
    		$("#anys").append('<option value=""></option>');
        	for (var i=0 ; i<dades.anys.length; i++){
        		$("#anys").append('<option value="' + dades.anys[i].Any2 + '">' + dades.anys[i].Any2 + '</option>');
        	}
        },
        error: function(err){
    		alert("error: " + JSON.stringify(err));
		}
    });



    $("#anys").bind("change", function(){
        var vAny = $("#anys").val();
        var vModalitat = $("#modalitatSeleccionada").val();

        // obtencio resultats segons any i proves de l'any               
        $.ajax({
            url: "/resultats/registresSegonsAny?vAny2=" + vAny + "&vModalitat2=" + vModalitat,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            cache: false,
            //data: JSON.stringify({ "objectData": formData}),
            /*data: JSON.stringify({
                data: dataSeleccionada
            }),*/
            success: function (dades) {
                //alert("success del AJAX de CANVI DE DIA");
                
                $('#taula_resultats tbody').empty();
                omplirRegistresTaula(dades.registres);
        
            },
            error: function(err){
                alert("error: " + err.message);
            }
        });     
    });







    $( "#modalitatSeleccionada" ).bind("change", function(event) {

        var query = "?vAny2=" + $("#anys").val() + "&vModalitat2=" + $("#modalitatSeleccionada").val()

        $.ajax({
            url: "/resultats/registresSegonsAny" + query,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            cache: false,
            
            success: function (dades) {
                //alert("success del AJAX de CANVI DE DIA");
                
                $('#taula_resultats tbody').empty();
                omplirRegistresTaula(dades.registres);
        
            },
            error: function(err){
                alert("error: " + err.message);
            }
        });

    });








	omplirRegistresTaula = function(rows){

        omplirRegistres(rows,function(){

            $('#taula_resultats > tbody').append(
                '<tr>' +
                    '<td class="total">TOTAL</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 1) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 2) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 3) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 4) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 5) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 6) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 7) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 8) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 9) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 10) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 11) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 12) + '</td>' +
                    '<td class="total">' + SumarColumna('taula_resultats', 13) + '</td>' +
               '</tr>'
            );
        
        });

	}



    function omplirRegistres (rows, callback){
        for (var i=0 ; i<rows.length; i++){
            $('#taula_resultats > tbody').append(
                '<tr>' +
                    '<td>' + rows[i].prova + '</td>' +
                    '<td>' + (rows[i].Gen == "0" ? "" : rows[i].Gen) + '</td>' +
                    '<td>' + (rows[i].Feb == "0" ? "" : rows[i].Feb) + '</td>' +
                    '<td>' + (rows[i].Mar == "0" ? "" : rows[i].Mar) + '</td>' +
                    '<td>' + (rows[i].Abr == "0" ? "" : rows[i].Abr) + '</td>' +
                    '<td>' + (rows[i].Mai == "0" ? "" : rows[i].Mai) + '</td>' +
                    '<td>' + (rows[i].Jun == "0" ? "" : rows[i].Jun) + '</td>' +
                    '<td>' + (rows[i].Jul == "0" ? "" : rows[i].Jul) + '</td>' +
                    '<td>' + (rows[i].Ago == "0" ? "" : rows[i].Ago) + '</td>' +
                    '<td>' + (rows[i].Stb == "0" ? "" : rows[i].Stb) + '</td>' +
                    '<td>' + (rows[i].Oct == "0" ? "" : rows[i].Oct) + '</td>' +
                    '<td>' + (rows[i].Nov == "0" ? "" : rows[i].Nov) + '</td>' +
                    '<td>' + (rows[i].Des == "0" ? "" : rows[i].Des) + '</td>' +
                    '<td class="total">' + (rows[i].TotalFila == "0" ? "" : rows[i].TotalFila) + '</td>' +
                '</tr>'
            );
        }

        callback();

    }




});





function SumarColumna(grilla, columna) {
 
    //var resultVal = 0.0; 
    var resultVal = 0; 
         
    $("#" + grilla + " tbody tr").each(
        function() {
         
            var celdaValor = $(this).find('td:eq(' + columna + ')');
            
            if (celdaValor.html() != '')
                    //resultVal += parseFloat(celdaValor.html().replace(',','.'));
                    resultVal += +celdaValor.html();
                     
        } //function
         
    ) //each
    
    //$("#" + grilla + " tbody tr:last td:eq(" + columna + ")").html(resultVal.toFixed(2).toString().replace('.',','));   
    return resultVal.toString();

}   