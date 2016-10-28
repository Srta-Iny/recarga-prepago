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
// menu mobile
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}