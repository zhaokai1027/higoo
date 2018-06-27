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
								<span>￥1160.00</span>
							</p>
						</div>
						<div class="sortnum_join">
							<span>-</span>
							<input type="text" value="1"/>
							<span>+</span>
							<span>加入购物车</span>
							<div class="">
								<p>提醒<span></span></p>
								<div>
									<p>
										<i></i> 加入购物车成功。<br />
										目前选购商品共<span> 7</span> 种<span> 14</span> 件。合计：<span>￥370.00</span>
									</p>
									<p>
										<span>继续购物</span>
										<a href="cart.html">进入购物车</a>
									</p>
								</div>
							</div>
						</div>
						
						
						<div class="wuhuobtn">
							<span>到货通知</span>
						</div>
						
						
						<div class="sort_scdb">
							<span>收藏</span>
							<span>对比</span>
						</div>
					</li>`
		
		
		
	})
	$(".sort_con ul").html(str10);
});