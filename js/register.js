	var register_con_zh = /^1(3|5|7|8|6)\d{9}$/;
	var register_con_mm = /^[0-9a-zA-Z_]\w{5,19}$/;
	$('.main_register_con_zh').find('input').focusout(function(){
		if(register_con_zh.test($('.main_register_con_zh').find('input').eq(0).val())!==true){
             $(this).next().removeClass('tishihide');
        }else{
        	$(this).next().addClass('tishihide');
        }
	});
	$('.main_register_con_mm').find('input').focusout(function(){
		if(register_con_mm.test($('.main_register_con_mm').find('input').eq(0).val())!==true){
             $(this).parent().find('.tishi').removeClass('tishihide');
        }else{
        	$(this).parent().find('.tishi').addClass('tishihide');
        }
	});
	$('.main_register_con_mm').find('input').keydown(function(){
		var mima = $('.main_register_con_mm').find('input').eq(0).val();
		$()
		if(register_con_mm.test(mima)===true&&mima.length>4){
			$(this).parent().find('.mmqd>span>.cheng').removeClass('hide').siblings().addClass('hide')
			.parent().next().find('.ruo').removeClass('hide').siblings().addClass('hide');	
		}
		if(register_con_mm.test(mima)===true&&mima.length>10){
			$(this).parent().find('.mmqd>span>.huang').removeClass('hide').siblings().addClass('hide')
			.parent().next().find('.zhong').removeClass('hide').siblings().addClass('hide');;
		}
		if(register_con_mm.test(mima)===true&&mima.length>16){
			$(this).parent().find('.mmqd>span>.green').removeClass('hide').siblings().addClass('hide')
			.parent().next().find('.qiang').removeClass('hide').siblings().addClass('hide');;
		}
	});
	$('.main_register_con_qrmm').find('input').focusout(function(){
		var mimaval = $('.main_register_con_mm').find('input').eq(0).val();
		var qrmimaval = $('.main_register_con_qrmm').find('input').eq(0).val();
		if(mimaval!=qrmimaval){
			$(this).next().removeClass('tishihide');
		}else{
			$(this).next().addClass('tishihide');
		}
	});
	$('.hgq').click(function(){
		$(this).siblings().text(Math.floor(Math.random()*10000));
	});
	$('.main_register_con_yzm1').find('input').focusout(function(){
		var yanzheng = $(this).parent().find('.showyzm').text();
		if(yanzheng != $(this).val()){
			$(this).parent().find('.tishi').removeClass('tishihide');
		}else{
			$(this).parent().find('.tishi').addClass('tishihide');
		}
	});
	$('.main_register_con_zc').find('input').click(function(){
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"register",userID:$("#zh").val(),password:$("#mm").val()},function(data){
			data = JSON.parse(data);
			console.log(data);
			if(data == 0){
				$('.shibai2').removeClass('tanchuang_hide');
				function tiou(){
					setTimeout(function(){
						location.href = "register.html";
					},2000);
				}tiou();
			}else if(data==1){
				$('.tanchuang').removeClass('tanchuang_hide');
				location.href = "login.html";
			}else{
				$('.shibai1').removeClass('tanchuang_hide');
				tiou();
			}
		});
	});
	
	