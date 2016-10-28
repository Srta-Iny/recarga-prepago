$(function() {
	//Logos Click Activa/Desactiva
	$('.logos').click(function(){
		if($(this).hasClass('active')){			
			$('.logos.active').removeClass('active');
			$(this).parents('.box-uno').find('.recarga').prop('disabled', true);
		}else{
			$('.logos.active').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.box-uno').find('.recarga').prop('disabled', false);
		}
		//--
	})
	//funcion Alerta requerido
	$('.recarga').click(function(event){
		var parent=$(this).parents('.inputs');
		var error=false;
		$('.mensajeuno').hide();
		parent.find('.req').each(function( key, value ) {
			var req=$(value);
			if(!valida(req)){
				error=true;
				req.parent('.form-group').find('.mensajeuno').show();
			}
		});
		if(!error){
			$('#modal-pre .monto').empty().html(parent.find('.monto').val());
			$('#modal-pre .numero').empty().html(parent.find('.fono').val());
			if($.trim(parent.find('.correo').val())){
				$('#modal-pre .mail').empty().html(parent.find('.correo').val());
			}else{
				$('#modal-pre .mail').empty().html('Sin Email');
			}
			$('#modal-pre .comp').empty().html($(this).parents('.box-uno').find('.logos.active').data('comp'));
			$('#modal-pre').modal();
		}
	});
	//abrir modal
	$('#modal-wom').modal();
});
function valida( el ){
	v=el.val();
	if(!$.trim(v)){
		return false;
	}
	if(el.attr('type')==='tel'){
		if(!$.isNumeric(v)){
			return false;
		}
		if(v.length<9){
			return false;
		}
	}else if(el.attr('type')==='number'){
		if(!$.isNumeric(v)){
			return false;
		}
		if(v<100 || v>20000){
			return false;
		}
	}
	return true;
}