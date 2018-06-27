$(".hoverbtn span").mouseover(function(){
	$(this).addClass("anniuinde").siblings().removeClass("anniuinde");
	var index_1 = $(this).index();
	$(".index_banner_slide>ul li").eq(index_1).fadeIn().siblings().fadeOut();
})
var index_num = 0;
var timer = setInterval(function(){
	index_num++;
	if(index_num==$(".index_banner_slide li").length){
		index_num = 0;
	}
	$(".index_banner_slide>ul li").eq(index_num).fadeIn().siblings().fadeOut();
	$(".hoverbtn span").eq(index_num).addClass("anniuinde").siblings().removeClass("anniuinde");
},8000);	


$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
	async:true,
	dataType:"jsonp",
	success:function(data){
		var divzong = 260*data.length;
		$('.slideshow_box').css('width',divzong)
		var str = "";
		var str1 = "";
		var str4 = "";
		var yiattr = [];
		var idattr = [];
		$.each(data, function(index,item){
			str += `<li>
						<a href="detail.html?id=${item.goodsID}"><img src="${item.goodsListImg}" alt="" /></a>
						<div>
							<p>${item.className}</p>
							<p><a href="detail.html?id=${item.goodsID}">${item.goodsName}</a></p>
							<p>￥${item.price}</p>
						</div>
					</li>`;
			str1 +=  `<li><a href="sort.html?classID=${item.classID}"><img src="${item.goodsListImg}" alt="" /></a></li>`;
			yiattr.push(item.goodsListImg);
			idattr.push(item.classID);
		});
		$('.slideshow_box ul').html(str);
		$('.tab_con_box').find('div').eq(0).find('ul').eq(1).html(str1);
		for(var i=0;i<6;i++){
			str4 += `<li><a href="sort.html?classID=${data[i].classID}"><img src="${data[i].goodsListImg}" alt="" /></a></li>`;
		}
		var str6="";
		var str7="";
		var str8="";
		
		for(var m=0;m<9;m++){
			if(m<3){
				str6 += `<a href="${data[m].classID}"><img src="${data[m].goodsListImg}" alt="" /></a>`;
			}
			if(m>=3&m<6){
				str7 += `<a href="${data[m].classID}"><img src="${data[m].goodsListImg}" alt="" /></a>`;
			}
			if(m>=6&m<9){
				str8 += `<a href="${data[m].classID}"><img src="${data[m].goodsListImg}" alt="" /></a>`;	
			}
		}
		$('.heng_1').find('div').eq(0).html(str6);
		$('.heng_2').find('div').eq(0).html(str7);
		$('.heng_3').find('div').eq(0).html(str8);
		
		$('.tab_con_box').find('div').eq(0).find('ul').eq(0).html(str4);
		var str5 = `<div class="pic_two">
							<a href="sort.html?classID=${idattr[0]}">
								<img src="${yiattr[0]}" alt="" />
							</a>
							<a href="sort.html?classID=${idattr[1]}">
								<img src="${yiattr[1]}" alt="" />
							</a>
						</div>
						<div class="pic_two">
							<a href="sort.html?classID=${idattr[2]}">
								<img src="${yiattr[2]}" alt="" />
							</a>
							<a href="sort.html?classID=${idattr[3]}">
								<img src="${yiattr[3]}" alt="" />
							</a>
						</div>
						<div class="pic_one">
							<a href="sort.html?classID=${idattr[4]}">
								<img src="${yiattr[4]}" alt="" />
							</a>
						</div>
						<div class="pic_two">
							<a href="sort.html?classID=${idattr[5]}">
								<img src="${yiattr[5]}" alt="" />
							</a>
							<a href="sort.html?classID=${idattr[6]}">
								<img src="${yiattr[6]}" alt="" />
							</a>
						</div>
					</div>`;
		$('.care_con_right').html(str5);
		
	}
});

$('.tab_btn>span').mouseover(function(){
	var btnindex = $(this).index();
	$('.tab_con_box').find('div').eq(btnindex).addClass('tab_con').siblings().removeClass('tab_con');
	$('.spanaa').eq(btnindex).addClass('spanspan').siblings().removeClass('spanspan');
	$('.spanbb').eq(btnindex).addClass('spani').parent().siblings().find('.spanbb').removeClass('spani');
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
		async:true,
		dataType:"jsonp",
		success:function(data){
			console.log(data)
			var str2="";
			var str3="";
			$.each(data,function(index,item){
				str2 += `<li><a href="sort.html?classID=${item.classID}"><img src="${item.goodsListImg}" alt="" /></a></li>`;
			})
			$('.tab_con_box').find('div').eq(btnindex).find('ul').eq(1).html(str2);
			for(var i=0;i<6;i++){
				str3 += `<li><a href="sort.html?classID=${data[i].classID}"><img src="${data[i].goodsListImg}" alt="" /></a></li>`;
			}
			$('.tab_con_box').find('div').eq(btnindex).find('ul').eq(0).html(str3);
			
			
		}
	});
})

