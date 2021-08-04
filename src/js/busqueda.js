function busqueda(){
	var texto=document.getElementById("txtname").value();
	var parametros={"txtname":texto
	};

	$.({
		data: parametros,
		url:"scripts/action.php",
		type:"POST",
		success: function(response){
			$("#datos").html(response);
		}
	});
}