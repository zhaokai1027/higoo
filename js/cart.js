$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
	if(data.length !== undefined){
		$('.kongcart_begin').addClass('kongcart_hide');
		$('.kongcart_now').removeClass('kongcart_hide');
		var cartbox = "";
		var cartzong = 0;
		$.each(data, function(index,item){
			cartbox += `<tr>
							<td><input class="asdfg" type="checkbox" checked="checked"/></td>
							<td>
								<div class="shangpintu"><img src="${item.goodsListImg}" alt="" /></div>
								<div class="shangpinhov">
									<a href="">${item.goodsName}</a>
								</div>
							</td>
							<td><i>￥</i><span>${item.price}</span></td>
							<td class="jiajian">
								<span class="jianshule" goodjian="${item.goodsID}">-</span>
								<input type="text" id="showshule" value="${item.number}"/>
								<span class="jiashule" goodjia="${item.goodsID}">+</span>
							</td>
							<td class="youhuijine">
								<i>￥</i><span>0.00</span>
							</td>
							<td class="jifen">-</td>
							<td class="xjcolor"><i>￥</i><span>${(item.number*item.price).toFixed(2)}</span></td>
							<td>
								<a href="">收藏</a> | <span class="yichule" goodyichu="${item.goodsID}">移除</span>
							</td>
						</tr>`;
			cartzong += Number((item.number*item.price).toFixed(2));
		});
		$('tbody').html(cartbox);
		var cartzongjia = `<div><em>商品总金额：</em><span>￥${cartzong}</span></div>
							<div><em>订单优惠金额：</em><span>￥0.00</span></div>
							<div><b><em class="fonthei">总金额：</em></b><span class="fontweight">￥${cartzong}</span></div>`;
		$('.kongcart_now_conn_ftop_right').html(cartzongjia);
		$('.jianshule').click(function(){
			if($(this).next().val() == 0){
				$(this).next().val($(this).next().val())
			}else{
				$(this).next().val($(this).next().val()-1);
			}
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).attr('goodjian'),number:$(this).parent().find('#showshule').val()},function(data){
				if(data == 1){
					location.reload();
				}
			});

		});
		$('.jiashule').click(function(){
			if($(this).parent().find('#showshule').val() == 99){
				$(this).parent().find('#showshule').val($(this).parent().find('#showshule').val());
			}else{
				$(this).parent().find('#showshule').val(parseInt($(this).parent().find('#showshule').val())+1);
			}
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).attr('goodjia'),number:$(this).parent().find('#showshule').val()},function(data){
				if(data == 1){
					location.reload();
				}
			});
		});
		$('.yichule').click(function(){
			$(this).parent().parent().find('#showshule').val(0);
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).attr('goodyichu'),number:$(this).parent().parent().find('#showshule').val()},function(data){
				if(data == 1){
					location.reload();
				}
			});
		});
		$('.youhui_btn>i').click(function(){
			$('.youhui_xinxi').fadeToggle();
		});
		$('.qingkongni').click(function(){
			$('.zhezhao').removeClass('zhezhaohide');
			$('.qkcart').removeClass('qkcarthide');
		});
		$('.diancuole').click(function(){
			$('.zhezhao').addClass('zhezhaohide');
			$('.qkcart').addClass('qkcarthide');
		});

		$('.quedingle').click(function(){
			$('tbody').empty();	
			$('.zhezhao').addClass('zhezhaohide');
			$('.qkcart').addClass('qkcarthide');
			$('.kongcart_now_conn').addClass('kongcart_hide');
			$('.kongcart_now_top').addClass('kongcart_hide');
			$('.kongcart_begin').removeClass('kongcart_hide');
		});
		
		$('#quanxuanla').click(function(){
			$('tbody tr td').find('.asdfg').prop('checked',$(this).prop('checked'));
		});
		$('tbody tr td').find('.asdfg').click(function(){
			if($('tbody tr td').find('.asdfg:checked').length == $('tbody tr td').find('.asdfg').length){
				$('#quanxuanla').prop('checked',true);
			}else{
				$('#quanxuanla').prop('checked',false);
			}
		});
		$(window).ready(function(){
			if($('tbody tr td').find('.asdfg:checked').length == $('tbody tr td').find('.asdfg').length){
				$('#quanxuanla').prop('checked',true);
			}else{
				$('#quanxuanla').prop('checked',false);
			}
		});
		$('.wolaibu').click(function(){
			$('.zhezhao').removeClass('zhezhaohide');
			$('.coudan_con').removeClass('coudan_conhide');
		})

		$('.coudan_qujian>span').click(function(){
			var boxboxindex = $(this).index();
			$(this).addClass('huisede').siblings().removeClass('huisede');
			$('.coudan_conbox').find('.coudan_xxx').eq(boxboxindex).addClass('coudan_xxshow').siblings().removeClass('coudan_xxshow');

		})
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",function(data){
			var coudanle = "";
			$.each(data, function(index,item){
				coudanle += `<li>
							<div class="coudan_xx_left"><img src="${item.goodsListImg}" alt="" /></div>
							<div class="coudan_xx_right">
								<p><a href="">${item.goodsName}</a></p>
								<p>￥${item.price}</p>
								<span class="jiache" goodsss="${item.goodsID}">加入购物车</span>
								<div class="tixingaa"></div>
							</div>
						</li>`;
			});
			$('.coudan_conbox').find('.coudan_xxx').find('ul').html(coudanle);
			$('.coudan_conbox').find('.coudan_xxx').find('ul').css('width','200*data.length/2')
			$('.coudan_con_title>span').click(function(){
				$('.zhezhao').addClass('zhezhaohide');
				$('.coudan_con').addClass('coudan_conhide');
			});
			var tixinglea = `<p class="ccccc">提醒<span></span></p>
							<div>
								<p>
									<i></i> 加入购物车成功。<br />
									目前选购商品共<span class="shushu"></span> 种<span class="gege"></span> 件。合计：<span class="hehehe"></span>
								</p>
								<p>
									<span class="lalelt">继续购物</span>
									<a href="">进入购物车</a>
								</p>
							</div>`;
			$('.jiache').click(function(){
				var jiathis = $(this);
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).attr('goodsss'),number:1},function(data){
					if(data == 1){
						$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
							$('.shushu').html(data.length);
							var jsjs = 0;
							var hjhj = 0;
							$.each(data, function(index,item) {
								jsjs += Number(item.number);
								hjhj += Number(item.number)*Number(item.price);
							});
							var hjhj = '￥'+hjhj.toFixed(2);
							$('.gege').html(jsjs);
							$('.hehehe').html(hjhj);
						})
						$('.coudan_conbox').find('.tixingaa').css('display','none').empty();
						jiathis.next().html(tixinglea).css('display','block');
						$('.ccccc>span').click(function(){
							$(this).parent().parent().css('display','none').empty();
						})
						$('.lalelt').click(function(){
							$(this).parent().parent().parent().css('display','none').empty();
						})
					}else{
						alert('添加购物车失败，请重试');
					}
				});
			})

		})
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	if(data.length === undefined){
		$('.kongcart_now_conn').addClass('kongcart_hide');
		$('.kongcart_now_top').addClass('kongcart_hide');
		$('.kongcart_begin').removeClass('kongcart_hide');
	}
	
	
	
	
})