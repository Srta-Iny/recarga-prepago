var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
$(function() {	
	//Logos Click Activa/Desactiva
	$('.logos').click(function(){
		$('.mensajeuno').hide();
		var bxUno=$(this).parents('.box-uno');
		if($(this).hasClass('active')){	//si esta activo desactiva boton envio y quita la clase
			$('.logos.active').removeClass('active');
			bxUno.find('.recarga').prop('disabled', true);
			bxUno.find('.inputs li:eq(1) .mensajeuno').empty();
			bxUno.find('.monto').attr('placeholder','');
			bxUno.find('.monto').attr('min',0);
			bxUno.find('.monto').attr('max','');
		}else{
			var vmin=parseInt($(this).data('min'));
			var vmax=parseInt($(this).data('max'));
			$('.logos.active').removeClass('active');
			$(this).addClass('active');
			//activar boton envio
			bxUno.find('.recarga').prop('disabled', false);
			
			bxUno.find('.select .comp').empty().html($(this).data('comp'));
			bxUno.find('.select .img').attr('src',$(this).find('img').attr('src')).removeClass('hidden');
			
			//Monto maximo minimo
			bxUno.find('.monto').remove();
			bxUno.find('.inputs li:eq(1) .mensajeuno').empty().html('Seleccione un valor');
			if(vmax>0){
				$('<input type="number" min="100" max="20000" class="form-control req monto" id="monto-movil" placeholder="">').insertAfter(bxUno.find('.inputs li:eq(1) .form-group label'));
				bxUno.find('.monto').attr('min',vmin);
				bxUno.find('.monto').attr('max',vmax);
				bxUno.find('.inputs li:eq(1) .mensajeuno').empty().html('Entre $'+miles(vmin)+' y $'+miles(vmax));
				bxUno.find('.monto').attr('placeholder','Entre $'+miles(vmin)+' y $'+miles(vmax));
			}else{
				$('<select class="form-control req monto" id="monto-movil"></select>').insertAfter(bxUno.find('.inputs li:eq(1) .form-group label'));
				var valores=$(this).data('valores').split(',');
				$.each(valores,function(index,val){
					bxUno.find('.inputs li:eq(1) .form-group select').append('<option value="'+val+'">$'+miles(val)+'</option>');
				});
			}
			if($(this).hasClass('rt')){
				bxUno.find('.ncliente').addClass('hidden');
				bxUno.find('.rut').removeClass('hidden');
				bxUno.find('.rut-txt').addClass('req');
				bxUno.find('.num-cli').removeClass('req');
			}else if($(this).hasClass('nmc')){
				bxUno.find('.rut').addClass('hidden');
				bxUno.find('.ncliente').removeClass('hidden');
				bxUno.find('.num-cli').addClass('req');
				bxUno.find('.rut-txt').removeClass('req');
			}
			
		}
		if(isMobile){
			bxUno.find('.btn-group-vertical').addClass('hidden');
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
				req.parents('.form-group').find('.mensajeuno').show();
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
			$('.recarga-form').removeClass('hidden');
			$('.result').addClass('hidden');
			$('#modal-pre .comp').empty().html($(this).parents('.box-uno').find('.logos.active').data('comp'));
			
			$('#modal-pre').modal();
		}
	});
	//abrir modal
	$('#modal-wom').modal();
	//formulario
	$('.recarga-form').submit(function(){
		$('.recarga-form').addClass('hidden');
		$('.result').removeClass('hidden');
		return false;
	})
	$('.select').click(function(event){
		$(this).parents('.box-uno').find('.btn-group-vertical').removeClass('hidden');
	});
	if(isMobile){
		$('.box-uno .btn-group').removeClass('btn-group').addClass('btn-group-vertical hidden');
		$('.list-num li a').data('placement','bottom');
	}
	$("#rut").Rut({
   		format_on: 'keyup'
	})
	$("#rut").Rut({
   		on_error: function(){ $('.rut .mensajeuno').show(); }
	})
	$('[data-toggle="popover"]').popover();
});
function valida( el ){
	v=el.val();
	
	if(!$.trim(v) && (el.attr('type')!='email')){
		return false;
	}
	if( (el.attr('type')==='email') && $.trim(v)){
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return regex.test(v);
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
		var vmin=parseInt(el.data('min'));
		var vmax=parseInt(el.data('max'));
		if(v<vmin || v>vmax){
			return false;
		}
	}else if((el.attr('type')==='text') && (el.hasClass('rut-txt'))){
		console.log($.Rut.validar(v));
		return $.Rut.validar(v);
	}
	return true;
}
function miles(v){
	srt=v.toString();	
	srt=srt.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return srt;
}