var classid = location.search.split("=")[1];
$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classid},function(data){
	var str10 = "";
	$.each(data,function(index,item){
		str10 += `<li>
						<div class="sort_shopimg"><a href="detail.html?id=${item.goodsID}"><img src="${item.goodsListImg}" alt="" /></a></div>
						<div class="sort_shopxx">
							<p><a href="detail.html?id=${item.goodsID}">${item.goodsName}</a></p>
							<p>
								<b>￥${item.price}</b>
							</p>
						</div>
						<div class="sortnum_join">
							<span class="jianjian">-</span>
							<input type="text" id="xianshi" value="1"/>
							<span class="jiajia">+</span>
							<span class="thecart" goodsid="${item.goodsID}">加入购物车</span>
							<div class="prompt">
							</div>
						</div>
						<div class="wuhuobtn">
							<span>到货通知</span>
						</div>
						<div class="sort_scdb">
							<span>收藏</span>
							<span>对比</span>
						</div>
					</li>`;
	});
	$(".sort_con ul").html(str10);
	$('.jianjian').click(function(){
		if($(this).next().val() == 1){
			$(this).next().val($(this).next().val())
		}else{
			$(this).next().val($(this).next().val()-1);
		}
	})
	$('.jiajia').click(function(){
		if($(this).parent().find('#xianshi').val() == 99){
			$(this).parent().find('#xianshi').val($(this).parent().find('#xianshi').val());
		}else{
			$(this).parent().find('#xianshi').val(parseInt($(this).parent().find('#xianshi').val())+1);
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
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).attr('goodsid'),number:$(this).parent().find('#xianshi').val()},function(data){
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
				})
				$('.sort_con>ul>li').find('.prompt').css('display','none').empty();
				jiathis.next().html(prompt).css('display','block');
				$('.guanbiyixia').click(function(){
					$(this).parent().parent().css('display','none').empty();
				})
				$('.jixuxuangou').click(function(){
					$(this).parent().parent().parent().css('display','none').empty();
				})
			}else{
				alert('添加购物车失败，请重试');
			}
		});
	})
});


