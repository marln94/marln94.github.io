var promedio;
var iterador = 1;
$(document).ready(function(){
	setEvento("#txt-calificacion-0");
	setEvento("#txt-uv-0");

	$("#btn-agregar").click(function(){
		var nuevoItem = $('<div class="w3-col s6 m6 l6">'+
				'<input class="w3-input" type="text" name="txt-clase-'+iterador+'" id="txt-clase-'+iterador+'" placeholder="clase">'+
			'</div>'+
			'<div class="w3-col s3 m3 l3">'+
				'<input class="w3-input" type="number" name="txt-uv-'+iterador+'" id="txt-uv-'+iterador+'" placeholder="uv" max="25" min="1">'+
			'</div>'+
			'<div class="w3-col s3 m3 l3">'+
				'<input class="w3-input" type="number" name="txt-calificacion-'+iterador+'" id="txt-calificacion-'+iterador+'" placeholder="nota" max="100" min="0">'+
			'</div>').hide();
		$("#contenedor-clases").append(nuevoItem);
		nuevoItem.fadeIn('normal');

		var inputCreado = '#txt-clase-'+iterador;
		$(inputCreado).focus();

		var calif = '#txt-calificacion-'+iterador;
		setEvento(calif);
		var uv = '#txt-uv-'+iterador;
		setEvento(uv);

		iterador++;

		if (iterador > 1) {
			if(!$("#btn-eliminar").length){
				$("#btns").append('<button class="w3-button w3-circle w3-indigo w3-hover-indigo" id="btn-eliminar">-</button>');
			}
		} else {
			if($("#btn-eliminar").length){
				$("#btn-eliminar").remove();
			}
		}
	});

	$("div").off().on("click", "#btn-eliminar", function(event){
		event.stopImmediatePropagation();
		var ultimaClase = $('#txt-clase-'+(iterador-1)).parent();
		var ultimoUv = $('#txt-uv-'+(iterador-1)).parent();
		var ultimaCalificacion = $('#txt-calificacion-'+(iterador-1)).parent();

		$(ultimaCalificacion).fadeOut('fast', function(){$(ultimaCalificacion).remove()});
		$(ultimoUv).fadeOut('fast', function(){$(ultimoUv).remove()});
		$(ultimaClase).fadeOut('fast', function(){$(ultimaClase).remove()});

		iterador --;

		if (iterador > 1) {
			if(!$("#btn-eliminar").length){
				$("#btns").append('<button class="w3-button w3-circle w3-indigo" id="btn-eliminar">-</button>');
			}
		} else {
			if($("#btn-eliminar").length){
				$("#btn-eliminar").remove();
			}
		}
		calcularPromedio();
	});
});
function setEvento(elemento){
	$(elemento).keyup(function(){
		calcularPromedio();
	});
}
function calcularPromedio(){
		promedio = 0;
		var totalCalificaciones = 0;
		var totalUV = 0;
		for (var i = 0; i < iterador; i++) {
			var calificacion = '#txt-calificacion-'+i;
			var uv = '#txt-uv-'+i;
			if(	$(calificacion).val() !== null && $(calificacion).val() !== "" &&
				$(uv).val() !== null && $(uv).val() !== ""){
				totalCalificaciones += parseInt($(calificacion).val()) * parseInt($(uv).val());
				totalUV += parseInt($(uv).val());
			}
		}
		if( totalCalificaciones == 0 || totalUV == 0){
			$("#promedio").text('0.0');
		} else{
			promedio =  totalCalificaciones / totalUV;
			$("#promedio").text(promedio.toPrecision(4));
		}
}

window.onload = () => {
	'use strict';
  
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker
			   .register('./sw.js');
	}
}