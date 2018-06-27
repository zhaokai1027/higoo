'use strict';

;(function () {
	//实现滑动二级列表
	$('.ej_hover').hover(function () {
		$('.second').addClass('secondshow');
		$(this).addClass('ej');
	}, function () {
		$('.second').removeClass('secondshow');
		$(this).removeClass('ej');
	});
	//实现回到顶部
	$('#right_top').find('a:last').click(function () {
		event.preventDefault();
		$('html,body').scrollTop(0);
	});
	//实现分类菜单栏
	function lei(c) {
		$.ajax({
			type: "get",
			url: "../json/fenlei.json",
			async: true,
			success: function success(data) {
				for (var i = 0; i < data.length; i++) {
					$('.left_menu').append('<div class="smallmulu"></div>');
					$('.smallmulu').eq(i).append('<div class="daohang"><div class="daohang_biaoti"><a href=""><b>' + data[i].name + '</b></a></div></div>');
					$('.daohang').eq(i).append('<div class="daohang_neirong"></div>');
					$('.smallmulu').eq(i).append('<div class="content"><div></div><div></div></div>');
					for (var j = 0; j < data[i].lei.length; j++) {
						$('.daohang_neirong').eq(i).append('<a href="">' + data[i].lei[j].one + '</a>');
						if ($('.content').eq(i).find('div').eq(0).find('dl').length <= 4) {
							$('.content').eq(i).find('div').eq(0).append('<dl><dt><a href=""><b>' + data[i].lei[j].one + '</b></a></dt><dd></dd></dl>');
						} else {
							$('.content').eq(i).find('div').eq(1).append('<dl><dt><a href=""><b>' + data[i].lei[j].one + '</b></a></dt><dd></dd></dl>');
						}
						for (var x = 0; x < data[i].lei[j].onelei.length; x++) {
							$('.content').eq(i).find('dd').eq(j).append('<a href="">' + data[i].lei[j].onelei[x] + '</a>');
						}
					}
					$('.content').eq(i).append('<div><img src="' + c + data[i].src + '" alt="" /><span class="leibtn"></span></div>');
				}
			}
		});
	}lei('../');
	//书写移入移出事件
	$('.leftmenu').mouseover(function () {
		$('.left_menu').css('display', 'block');
		$('.smallmulu').mouseover(function () {
			$(this).find($('.content')).css('display', 'block');
			$(this).css('background', '#710b70');
			$('.leibtn').click(function () {
				$('.left_menu').css('display', 'none');
			});
		});
		$('.smallmulu').mouseout(function () {
			$(this).find($('.content')).css('display', 'none');
			$(this).css('background', '');
		});
	});
	$('.leftmenu').mouseout(function () {
		$('.left_menu').css('display', 'none');
	});
})();
"use strict";

$(".hoverbtn span").mouseover(function () {
	$(this).addClass("anniuinde").siblings().removeClass("anniuinde");
	var index_1 = $(this).index();
	$(".index_banner_slide>ul li").eq(index_1).fadeIn().siblings().fadeOut();
});
var index_num = 0;
var timer = setInterval(function () {
	index_num++;
	if (index_num == $(".index_banner_slide li").length) {
		index_num = 0;
	}
	$(".index_banner_slide>ul li").eq(index_num).fadeIn().siblings().fadeOut();
	$(".hoverbtn span").eq(index_num).addClass("anniuinde").siblings().removeClass("anniuinde");
}, 8000);

$.ajax({
	type: "get",
	url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
	async: true,
	dataType: "jsonp",
	success: function success(data) {
		var divzong = 260 * data.length;
		$('.slideshow_box').css('width', divzong);
		var str = "";
		var str1 = "";
		var str4 = "";
		var yiattr = [];
		var idattr = [];
		$.each(data, function (index, item) {
			str += "<li>\n\t\t\t\t\t\t<a href=\"detail.html?id=" + item.goodsID + "\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></a>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<p>" + item.className + "</p>\n\t\t\t\t\t\t\t<p><a href=\"detail.html?id=" + item.goodsID + "\">" + item.goodsName + "</a></p>\n\t\t\t\t\t\t\t<p>\uFFE5" + item.price + "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
			str1 += "<li><a href=\"sort.html?classID=" + item.classID + "\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></a></li>";
			yiattr.push(item.goodsListImg);
			idattr.push(item.classID);
		});
		$('.slideshow_box ul').html(str);
		$('.tab_con_box').find('div').eq(0).find('ul').eq(1).html(str1);
		for (var i = 0; i < 6; i++) {
			str4 += "<li><a href=\"sort.html?classID=" + data[i].classID + "\"><img src=\"" + data[i].goodsListImg + "\" alt=\"\" /></a></li>";
		}
		var str6 = "";
		var str7 = "";
		var str8 = "";

		for (var m = 0; m < 9; m++) {
			if (m < 3) {
				str6 += "<a href=\"" + data[m].classID + "\"><img src=\"" + data[m].goodsListImg + "\" alt=\"\" /></a>";
			}
			if (m >= 3 & m < 6) {
				str7 += "<a href=\"" + data[m].classID + "\"><img src=\"" + data[m].goodsListImg + "\" alt=\"\" /></a>";
			}
			if (m >= 6 & m < 9) {
				str8 += "<a href=\"" + data[m].classID + "\"><img src=\"" + data[m].goodsListImg + "\" alt=\"\" /></a>";
			}
		}
		$('.heng_1').find('div').eq(0).html(str6);
		$('.heng_2').find('div').eq(0).html(str7);
		$('.heng_3').find('div').eq(0).html(str8);

		$('.tab_con_box').find('div').eq(0).find('ul').eq(0).html(str4);
		var str5 = "<div class=\"pic_two\">\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[0] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[0] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[1] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[1] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pic_two\">\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[2] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[2] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[3] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[3] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pic_one\">\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[4] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[4] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"pic_two\">\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[5] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[5] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href=\"sort.html?classID=" + idattr[6] + "\">\n\t\t\t\t\t\t\t\t<img src=\"" + yiattr[6] + "\" alt=\"\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";
		$('.care_con_right').html(str5);
	}
});

$('.tab_btn>span').mouseover(function () {
	var btnindex = $(this).index();
	$('.tab_con_box').find('div').eq(btnindex).addClass('tab_con').siblings().removeClass('tab_con');
	$('.spanaa').eq(btnindex).addClass('spanspan').siblings().removeClass('spanspan');
	$('.spanbb').eq(btnindex).addClass('spani').parent().siblings().find('.spanbb').removeClass('spani');
	$.ajax({
		type: "get",
		url: "http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
		async: true,
		dataType: "jsonp",
		success: function success(data) {
			console.log(data);
			var str2 = "";
			var str3 = "";
			$.each(data, function (index, item) {
				str2 += "<li><a href=\"sort.html?classID=" + item.classID + "\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></a></li>";
			});
			$('.tab_con_box').find('div').eq(btnindex).find('ul').eq(1).html(str2);
			for (var i = 0; i < 6; i++) {
				str3 += "<li><a href=\"sort.html?classID=" + data[i].classID + "\"><img src=\"" + data[i].goodsListImg + "\" alt=\"\" /></a></li>";
			}
			$('.tab_con_box').find('div').eq(btnindex).find('ul').eq(0).html(str3);
		}
	});
});
"use strict";

$(".loginform_dl input").click(function () {
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php", { status: "login", userID: $(".loginform_con input").eq(0).val(), password: $(".loginform_con input").eq(1).val() }, function (data) {
		data = JSON.parse(data);
		console.log(data);
		if (data == 0) {
			$('.denglushibai').removeClass('dengluhide');
			setTimeout(function () {
				location.href = "login.html";
			}, 2000);
		} else if (data == 2) {
			$('.denglushibai').removeClass('dengluhide');
			setTimeout(function () {
				location.href = "login.html";
			}, 2000);
		} else {
			$('.dengluchenggong').removeClass('dengluhide');
			$.cookie("username", data.userID, { expires: 14, path: "/" });
			setTimeout(function () {
				location.href = "index.html";
			}, 2000);
		}
	});
});
'use strict';

var register_con_zh = /^1(3|5|7|8|6)\d{9}$/;
var register_con_mm = /^[0-9a-zA-Z_]\w{5,19}$/;
$('.main_register_con_zh').find('input').focusout(function () {
	if (register_con_zh.test($('.main_register_con_zh').find('input').eq(0).val()) !== true) {
		$(this).next().removeClass('tishihide');
	} else {
		$(this).next().addClass('tishihide');
	}
});
$('.main_register_con_mm').find('input').focusout(function () {
	if (register_con_mm.test($('.main_register_con_mm').find('input').eq(0).val()) !== true) {
		$(this).parent().find('.tishi').removeClass('tishihide');
	} else {
		$(this).parent().find('.tishi').addClass('tishihide');
	}
});
$('.main_register_con_mm').find('input').keydown(function () {
	var mima = $('.main_register_con_mm').find('input').eq(0).val();
	$();
	if (register_con_mm.test(mima) === true && mima.length > 4) {
		$(this).parent().find('.mmqd>span>.cheng').removeClass('hide').siblings().addClass('hide').parent().next().find('.ruo').removeClass('hide').siblings().addClass('hide');
	}
	if (register_con_mm.test(mima) === true && mima.length > 10) {
		$(this).parent().find('.mmqd>span>.huang').removeClass('hide').siblings().addClass('hide').parent().next().find('.zhong').removeClass('hide').siblings().addClass('hide');;
	}
	if (register_con_mm.test(mima) === true && mima.length > 16) {
		$(this).parent().find('.mmqd>span>.green').removeClass('hide').siblings().addClass('hide').parent().next().find('.qiang').removeClass('hide').siblings().addClass('hide');;
	}
});
$('.main_register_con_qrmm').find('input').focusout(function () {
	var mimaval = $('.main_register_con_mm').find('input').eq(0).val();
	var qrmimaval = $('.main_register_con_qrmm').find('input').eq(0).val();
	if (mimaval != qrmimaval) {
		$(this).next().removeClass('tishihide');
	} else {
		$(this).next().addClass('tishihide');
	}
});
$('.hgq').click(function () {
	$(this).siblings().text(Math.floor(Math.random() * 10000));
});
$('.main_register_con_yzm1').find('input').focusout(function () {
	var yanzheng = $(this).parent().find('.showyzm').text();
	if (yanzheng != $(this).val()) {
		$(this).parent().find('.tishi').removeClass('tishihide');
	} else {
		$(this).parent().find('.tishi').addClass('tishihide');
	}
});
$('.main_register_con_zc').find('input').click(function () {
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php", { status: "register", userID: $("#zh").val(), password: $("#mm").val() }, function (data) {
		data = JSON.parse(data);
		console.log(data);
		if (data == 0) {
			var _tiou = function _tiou() {
				setTimeout(function () {
					location.href = "register.html";
				}, 2000);
			};

			$('.shibai2').removeClass('tanchuang_hide');
			_tiou();
		} else if (data == 1) {
			$('.tanchuang').removeClass('tanchuang_hide');
			location.href = "login.html";
		} else {
			$('.shibai1').removeClass('tanchuang_hide');
			tiou();
		}
	});
});
"use strict";

var classid = location.search.split("=")[1];

$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { classID: classid }, function (data) {
	var str10 = "";
	$.each(data, function (index, item) {
		str10 += "<li>\n\t\t\t\t\t\t<div class=\"sort_shopimg\"><a href=\"detail.html?id=" + item.goodsID + "\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></a></div>\n\t\t\t\t\t\t<div class=\"sort_shopxx\">\n\t\t\t\t\t\t\t<p><a href=\"detail.html?id=" + item.goodsID + "\">" + item.goodsName + "</a></p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<b>\uFFE5" + item.price + "</b>\n\t\t\t\t\t\t\t\t<span>\uFFE51160.00</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"sortnum_join\">\n\t\t\t\t\t\t\t<span>-</span>\n\t\t\t\t\t\t\t<input type=\"text\" value=\"1\"/>\n\t\t\t\t\t\t\t<span>+</span>\n\t\t\t\t\t\t\t<span>\u52A0\u5165\u8D2D\u7269\u8F66</span>\n\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t<p>\u63D0\u9192<span></span></p>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t<i></i> \u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F\u3002<br />\n\t\t\t\t\t\t\t\t\t\t\u76EE\u524D\u9009\u8D2D\u5546\u54C1\u5171<span> 7</span> \u79CD<span> 14</span> \u4EF6\u3002\u5408\u8BA1\uFF1A<span>\uFFE5370.00</span>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t<span>\u7EE7\u7EED\u8D2D\u7269</span>\n\t\t\t\t\t\t\t\t\t\t<a href=\"cart.html\">\u8FDB\u5165\u8D2D\u7269\u8F66</a>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"wuhuobtn\">\n\t\t\t\t\t\t\t<span>\u5230\u8D27\u901A\u77E5</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"sort_scdb\">\n\t\t\t\t\t\t\t<span>\u6536\u85CF</span>\n\t\t\t\t\t\t\t<span>\u5BF9\u6BD4</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
	});
	$(".sort_con ul").html(str10);
});