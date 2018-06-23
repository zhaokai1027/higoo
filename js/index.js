;(function(){
	var erji = document.getElementsByClassName('ej_hover')[0];
	var sec = document.getElementsByClassName('second')[0];
	erji.onmouseover = function(){
		sec.style.display = "block";
	}
	erji.onmouseout = function(){
		sec.style.display = "none";
	}
})();
