
$(".loginform_dl input").click(function(){
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:$(".loginform_con input").eq(0).val(),password:$(".loginform_con input").eq(1).val()},function(data){
		data = JSON.parse(data);
		console.log(data);
		if(data == 0){
			$('.denglushibai').removeClass('dengluhide');
			setTimeout(function(){
				location.href = "login.html";
			},2000)
		}else if(data==2){
			$('.denglushibai').removeClass('dengluhide');
			setTimeout(function(){
				location.href = "login.html";
			},2000)
		}else{
			$('.dengluchenggong').removeClass('dengluhide');
			$.cookie("username",data.userID,{expires:14,path:'/'});
			setTimeout(function(){
			location.href = "index.html";
			},2000)
		}
	})
})

