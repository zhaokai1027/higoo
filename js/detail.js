if($('#detail_main')[0] !== undefined){
	var goodid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodid},function(data){
		var zfc = data[0].goodsBenUrl;
		var zfcc = JSON.parse(zfc);
		var datailimg = "";
		$.each(zfcc, function(index,item) {
			datailimg += `<li><img src="${item}" alt="" /></li>`;
		});
		$('.left_imgbox').html(datailimg);
		$('.left_huakuai').find('ul').html(datailimg);
		$('.left_huakuai').find('li').mouseover(function(){
			var huakindex = $(this).index();
			$(this).addClass('redborder').siblings().removeClass('redborder');
			$('.left_imgbox').find('li').eq(huakindex).css('z-index','100').siblings().css('z-index','0');
		})
		var rightxq = `<form action="" method="get" name="detail_form">
							<p>${data[0].goodsName}</p>
							<p>${data[0].detail}</p>
							<p>销售价：<span>${data[0].price}</span></p>
							<p>市场价：<span>${data[0].price}</span></p>
							<p>会员价：最低<span>${data[0].price}</span>起</p>
							<p>商品评分：(共0人评分)</p>
							<div>
								<span>订单促销</span>
								<p>全场满2种商品包邮</p>
							</div>
							<div>数量：
								<span class="jianjian">-</span>
								<input type="text" id="xianshia" value="1"/>
								<span class="jiajia">+</span>
							</div>
							<div>
								<a href="">立即购买</a>
								<span class="thecart">加入购物车</span>
								<div class="prompt">
								</div>
								<span>扫一扫购买</span>
							</div>
						</form>`;
		var xiangqingbottom = `<p>品牌：<span> ${data[0].goodsName} </span></p>
							<p>商品名称：<span>	${data[0].goodsName} </span></p>
							<p>类型：<span>${data[0].className}</span></p>
							<p>相关：<span>${data[0].detail}</span></p>`;
		$('.detail_main_con_right').html(rightxq);
		$('.detail_main_bottom_nr').html(xiangqingbottom);
		
		$('.jianjian').click(function(){
			if($(this).next().val() == 1){
				$(this).next().val($(this).next().val())
			}else{
				$(this).next().val($(this).next().val()-1);
			}
		})
		$('.jiajia').click(function(){
			if($(this).parent().find('#xianshia').val() == 99){
				$(this).parent().find('#xianshia').val($(this).parent().find('#xianshia').val());
			}else{
				$(this).parent().find('#xianshia').val(parseInt($(this).parent().find('#xianshia').val())+1);
			}
		})
	
		var prompt = `<p>提醒<span class="guanbiyixia"></span></p>
					<div>
						<p>
							<i></i> 加入购物车成功。<br />
							目前选购商品共<span class="leishu"> </span> 种<span class="jianshu"> </span> 件。合计：<span class="hejijiage"> </span>
						</p>
						<p>
							<span class="jixuxuangou">继续购物</span>
							<a href="cart.html">进入购物车</a>
						</p>
					</div>`;
		
		$('.thecart').click(function(){
			var jiathis = $(this);
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodid,number:$(this).parent().parent().find('#xianshia').val()},function(data){
				
				if(data == 1){
					$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
						$('.leishu').html(data.length);
						var jsjs = 0;
						var hjhj = 0;
						$.each(data, function(index,item) {
							jsjs += Number(item.number);
							hjhj += Number(item.number)*Number(item.price);
						});
						var hjhj = '￥'+hjhj.toFixed(2);
						$('.jianshu').html(jsjs);	
						$('.hejijiage').html(hjhj);
					});
					jiathis.next().html(prompt).css('display','block');
					$('.guanbiyixia').click(function(){
						$(this).parent().parent().css('display','none').empty();
					});
					$('.jixuxuangou').click(function(){
						$(this).parent().parent().parent().css('display','none').empty();
					});
				}else{
					alert('添加购物车失败，请重试');
				}
			});
		})

	})
	
}





