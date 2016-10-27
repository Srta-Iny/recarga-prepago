$(function() {
	$('.logos').click(function(){		
		if($(this).hasClass('active')){			
			$('.logos.active').removeClass('active');
		}else{
			$('.logos.active').removeClass('active');
			$(this).addClass('active');
		}
		//--
	})
});