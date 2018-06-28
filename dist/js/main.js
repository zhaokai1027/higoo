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

$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", { userID: $.cookie("username") }, function (data) {
	if (data.length !== undefined) {
		$('.kongcart_begin').addClass('kongcart_hide');
		$('.kongcart_now').removeClass('kongcart_hide');
		var cartbox = "";
		var cartzong = 0;
		$.each(data, function (index, item) {
			cartbox += "<tr>\n\t\t\t\t\t\t\t<td><input class=\"asdfg\" type=\"checkbox\" checked=\"checked\"/></td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<div class=\"shangpintu\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></div>\n\t\t\t\t\t\t\t\t<div class=\"shangpinhov\">\n\t\t\t\t\t\t\t\t\t<a href=\"\">" + item.goodsName + "</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td><i>\uFFE5</i><span>" + item.price + "</span></td>\n\t\t\t\t\t\t\t<td class=\"jiajian\">\n\t\t\t\t\t\t\t\t<span class=\"jianshule\" goodjian=\"" + item.goodsID + "\">-</span>\n\t\t\t\t\t\t\t\t<input type=\"text\" id=\"showshule\" value=\"" + item.number + "\"/>\n\t\t\t\t\t\t\t\t<span class=\"jiashule\" goodjia=\"" + item.goodsID + "\">+</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"youhuijine\">\n\t\t\t\t\t\t\t\t<i>\uFFE5</i><span>0.00</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"jifen\">-</td>\n\t\t\t\t\t\t\t<td class=\"xjcolor\"><i>\uFFE5</i><span>" + (item.number * item.price).toFixed(2) + "</span></td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<a href=\"\">\u6536\u85CF</a> | <span class=\"yichule\" goodyichu=\"" + item.goodsID + "\">\u79FB\u9664</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>";
			cartzong += Number((item.number * item.price).toFixed(2));
		});
		$('tbody').html(cartbox);
		var cartzongjia = "<div><em>\u5546\u54C1\u603B\u91D1\u989D\uFF1A</em><span>\uFFE5" + cartzong + "</span></div>\n\t\t\t\t\t\t\t<div><em>\u8BA2\u5355\u4F18\u60E0\u91D1\u989D\uFF1A</em><span>\uFFE50.00</span></div>\n\t\t\t\t\t\t\t<div><b><em class=\"fonthei\">\u603B\u91D1\u989D\uFF1A</em></b><span class=\"fontweight\">\uFFE5" + cartzong + "</span></div>";
		$('.kongcart_now_conn_ftop_right').html(cartzongjia);
		$('.jianshule').click(function () {
			if ($(this).next().val() == 0) {
				$(this).next().val($(this).next().val());
			} else {
				$(this).next().val($(this).next().val() - 1);
			}
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: $(this).attr('goodjian'), number: $(this).parent().find('#showshule').val() }, function (data) {
				if (data == 1) {
					location.reload();
				}
			});
		});
		$('.jiashule').click(function () {
			if ($(this).parent().find('#showshule').val() == 99) {
				$(this).parent().find('#showshule').val($(this).parent().find('#showshule').val());
			} else {
				$(this).parent().find('#showshule').val(parseInt($(this).parent().find('#showshule').val()) + 1);
			}
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: $(this).attr('goodjia'), number: $(this).parent().find('#showshule').val() }, function (data) {
				if (data == 1) {
					location.reload();
				}
			});
		});
		$('.yichule').click(function () {
			$(this).parent().parent().find('#showshule').val(0);
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: $(this).attr('goodyichu'), number: $(this).parent().parent().find('#showshule').val() }, function (data) {
				if (data == 1) {
					location.reload();
				}
			});
		});
		$('.youhui_btn>i').click(function () {
			$('.youhui_xinxi').fadeToggle();
		});
		$('.qingkongni').click(function () {
			$('.zhezhao').removeClass('zhezhaohide');
			$('.qkcart').removeClass('qkcarthide');
		});
		$('.diancuole').click(function () {
			$('.zhezhao').addClass('zhezhaohide');
			$('.qkcart').addClass('qkcarthide');
		});

		$('.quedingle').click(function () {
			$('tbody').empty();
			$('.zhezhao').addClass('zhezhaohide');
			$('.qkcart').addClass('qkcarthide');
			$('.kongcart_now_conn').addClass('kongcart_hide');
			$('.kongcart_now_top').addClass('kongcart_hide');
			$('.kongcart_begin').removeClass('kongcart_hide');
		});

		$('#quanxuanla').click(function () {
			$('tbody tr td').find('.asdfg').prop('checked', $(this).prop('checked'));
		});
		$('tbody tr td').find('.asdfg').click(function () {
			if ($('tbody tr td').find('.asdfg:checked').length == $('tbody tr td').find('.asdfg').length) {
				$('#quanxuanla').prop('checked', true);
			} else {
				$('#quanxuanla').prop('checked', false);
			}
		});
		$(window).ready(function () {
			if ($('tbody tr td').find('.asdfg:checked').length == $('tbody tr td').find('.asdfg').length) {
				$('#quanxuanla').prop('checked', true);
			} else {
				$('#quanxuanla').prop('checked', false);
			}
		});
		$('.wolaibu').click(function () {
			$('.zhezhao').removeClass('zhezhaohide');
			$('.coudan_con').removeClass('coudan_conhide');
		});

		$('.coudan_qujian>span').click(function () {
			var boxboxindex = $(this).index();
			$(this).addClass('huisede').siblings().removeClass('huisede');
			$('.coudan_conbox').find('.coudan_xxx').eq(boxboxindex).addClass('coudan_xxshow').siblings().removeClass('coudan_xxshow');
		});
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", function (data) {
			var coudanle = "";
			$.each(data, function (index, item) {
				coudanle += "<li>\n\t\t\t\t\t\t\t<div class=\"coudan_xx_left\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></div>\n\t\t\t\t\t\t\t<div class=\"coudan_xx_right\">\n\t\t\t\t\t\t\t\t<p><a href=\"\">" + item.goodsName + "</a></p>\n\t\t\t\t\t\t\t\t<p>\uFFE5" + item.price + "</p>\n\t\t\t\t\t\t\t\t<span class=\"jiache\" goodsss=\"" + item.goodsID + "\">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n\t\t\t\t\t\t\t\t<div class=\"tixingaa\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>";
			});
			$('.coudan_conbox').find('.coudan_xxx').find('ul').html(coudanle);
			$('.coudan_conbox').find('.coudan_xxx').find('ul').css('width', '200*data.length/2');
			$('.coudan_con_title>span').click(function () {
				$('.zhezhao').addClass('zhezhaohide');
				$('.coudan_con').addClass('coudan_conhide');
			});
			var tixinglea = "<p class=\"ccccc\">\u63D0\u9192<span></span></p>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<i></i> \u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F\u3002<br />\n\t\t\t\t\t\t\t\t\t\u76EE\u524D\u9009\u8D2D\u5546\u54C1\u5171<span class=\"shushu\"></span> \u79CD<span class=\"gege\"></span> \u4EF6\u3002\u5408\u8BA1\uFF1A<span class=\"hehehe\"></span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<span class=\"lalelt\">\u7EE7\u7EED\u8D2D\u7269</span>\n\t\t\t\t\t\t\t\t\t<a href=\"\">\u8FDB\u5165\u8D2D\u7269\u8F66</a>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>";
			$('.jiache').click(function () {
				var jiathis = $(this);
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: $(this).attr('goodsss'), number: 1 }, function (data) {
					if (data == 1) {
						$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", { userID: $.cookie("username") }, function (data) {
							$('.shushu').html(data.length);
							var jsjs = 0;
							var hjhj = 0;
							$.each(data, function (index, item) {
								jsjs += Number(item.number);
								hjhj += Number(item.number) * Number(item.price);
							});
							var hjhj = '￥' + hjhj.toFixed(2);
							$('.gege').html(jsjs);
							$('.hehehe').html(hjhj);
						});
						$('.coudan_conbox').find('.tixingaa').css('display', 'none').empty();
						jiathis.next().html(tixinglea).css('display', 'block');
						$('.ccccc>span').click(function () {
							$(this).parent().parent().css('display', 'none').empty();
						});
						$('.lalelt').click(function () {
							$(this).parent().parent().parent().css('display', 'none').empty();
						});
					} else {
						alert('添加购物车失败，请重试');
					}
				});
			});
		});
	}
	if (data.length === undefined) {
		$('.kongcart_now_conn').addClass('kongcart_hide');
		$('.kongcart_now_top').addClass('kongcart_hide');
		$('.kongcart_begin').removeClass('kongcart_hide');
	}
});
"use strict";

if ($('#detail_main')[0] !== undefined) {
	var goodid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { goodsID: goodid }, function (data) {
		var zfc = data[0].goodsBenUrl;
		var zfcc = JSON.parse(zfc);
		var datailimg = "";
		$.each(zfcc, function (index, item) {
			datailimg += "<li><img src=\"" + item + "\" alt=\"\" /></li>";
		});
		$('.left_imgbox').html(datailimg);
		$('.left_huakuai').find('ul').html(datailimg);
		$('.left_huakuai').find('li').mouseover(function () {
			var huakindex = $(this).index();
			$(this).addClass('redborder').siblings().removeClass('redborder');
			$('.left_imgbox').find('li').eq(huakindex).css('z-index', '100').siblings().css('z-index', '0');
		});
		var rightxq = "<form action=\"\" method=\"get\" name=\"detail_form\">\n\t\t\t\t\t\t\t<p>" + data[0].goodsName + "</p>\n\t\t\t\t\t\t\t<p>" + data[0].detail + "</p>\n\t\t\t\t\t\t\t<p>\u9500\u552E\u4EF7\uFF1A<span>" + data[0].price + "</span></p>\n\t\t\t\t\t\t\t<p>\u5E02\u573A\u4EF7\uFF1A<span>" + data[0].price + "</span></p>\n\t\t\t\t\t\t\t<p>\u4F1A\u5458\u4EF7\uFF1A\u6700\u4F4E<span>" + data[0].price + "</span>\u8D77</p>\n\t\t\t\t\t\t\t<p>\u5546\u54C1\u8BC4\u5206\uFF1A(\u51710\u4EBA\u8BC4\u5206)</p>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<span>\u8BA2\u5355\u4FC3\u9500</span>\n\t\t\t\t\t\t\t\t<p>\u5168\u573A\u6EE12\u79CD\u5546\u54C1\u5305\u90AE</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\u6570\u91CF\uFF1A\n\t\t\t\t\t\t\t\t<span class=\"jianjian\">-</span>\n\t\t\t\t\t\t\t\t<input type=\"text\" id=\"xianshia\" value=\"1\"/>\n\t\t\t\t\t\t\t\t<span class=\"jiajia\">+</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<a href=\"\">\u7ACB\u5373\u8D2D\u4E70</a>\n\t\t\t\t\t\t\t\t<span class=\"thecart\">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n\t\t\t\t\t\t\t\t<div class=\"prompt\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<span>\u626B\u4E00\u626B\u8D2D\u4E70</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>";
		var xiangqingbottom = "<p>\u54C1\u724C\uFF1A<span> " + data[0].goodsName + " </span></p>\n\t\t\t\t\t\t\t<p>\u5546\u54C1\u540D\u79F0\uFF1A<span>\t" + data[0].goodsName + " </span></p>\n\t\t\t\t\t\t\t<p>\u7C7B\u578B\uFF1A<span>" + data[0].className + "</span></p>\n\t\t\t\t\t\t\t<p>\u76F8\u5173\uFF1A<span>" + data[0].detail + "</span></p>";
		$('.detail_main_con_right').html(rightxq);
		$('.detail_main_bottom_nr').html(xiangqingbottom);

		$('.jianjian').click(function () {
			if ($(this).next().val() == 1) {
				$(this).next().val($(this).next().val());
			} else {
				$(this).next().val($(this).next().val() - 1);
			}
		});
		$('.jiajia').click(function () {
			if ($(this).parent().find('#xianshia').val() == 99) {
				$(this).parent().find('#xianshia').val($(this).parent().find('#xianshia').val());
			} else {
				$(this).parent().find('#xianshia').val(parseInt($(this).parent().find('#xianshia').val()) + 1);
			}
		});

		var prompt = "<p>\u63D0\u9192<span class=\"guanbiyixia\"></span></p>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<i></i> \u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F\u3002<br />\n\t\t\t\t\t\t\t\u76EE\u524D\u9009\u8D2D\u5546\u54C1\u5171<span class=\"leishu\"> </span> \u79CD<span class=\"jianshu\"> </span> \u4EF6\u3002\u5408\u8BA1\uFF1A<span class=\"hejijiage\"> </span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<span class=\"jixuxuangou\">\u7EE7\u7EED\u8D2D\u7269</span>\n\t\t\t\t\t\t\t<a href=\"cart.html\">\u8FDB\u5165\u8D2D\u7269\u8F66</a>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>";

		$('.thecart').click(function () {
			var jiathis = $(this);
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: goodid, number: $(this).parent().parent().find('#xianshia').val() }, function (data) {

				if (data == 1) {
					$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", { userID: $.cookie("username") }, function (data) {
						$('.leishu').html(data.length);
						var jsjs = 0;
						var hjhj = 0;
						$.each(data, function (index, item) {
							jsjs += Number(item.number);
							hjhj += Number(item.number) * Number(item.price);
						});
						var hjhj = '￥' + hjhj.toFixed(2);
						$('.jianshu').html(jsjs);
						$('.hejijiage').html(hjhj);
					});
					jiathis.next().html(prompt).css('display', 'block');
					$('.guanbiyixia').click(function () {
						$(this).parent().parent().css('display', 'none').empty();
					});
					$('.jixuxuangou').click(function () {
						$(this).parent().parent().parent().css('display', 'none').empty();
					});
				} else {
					alert('添加购物车失败，请重试');
				}
			});
		});
	});
}
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

var str02 = "<span>\u60A8\u597D , \u6B22\u8FCE\u6765\u5230\u55E8\u8D2D\u7F51\uFF01</span>\n\t\t\t\t\t<a href=\"login.html\">\u767B\u5F55</a>\n\t\t\t\t\t<a href=\"register.html\">\u6CE8\u518C</a>";
if ($.cookie('username') != undefined) {
	var str01 = "<span>\u60A8\u597D ," + $.cookie('username') + "</span>\n\t\t\t\t\t<a href=\"login.html\">\u9000\u51FA</a>";
	$('.higoo_header').find('div').eq(0).html(str01);
	$('.higoo_header').find('div').eq(0).find('a').click(function () {
		$('.higoo_header').find('div').eq(0).html(str02);
		$.removeCookie('username', { path: '/' });
	});
} else {
	$('.higoo_header').find('div').eq(0).html(str02);
}
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
			$.cookie("username", data.userID, { expires: 14, path: '/' });
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

$(window).ready(function () {
	$('.showyzm').text(Math.floor(Math.random() * 10000));
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
		str10 += "<li>\n\t\t\t\t\t\t<div class=\"sort_shopimg\"><a href=\"detail.html?id=" + item.goodsID + "\"><img src=\"" + item.goodsListImg + "\" alt=\"\" /></a></div>\n\t\t\t\t\t\t<div class=\"sort_shopxx\">\n\t\t\t\t\t\t\t<p><a href=\"detail.html?id=" + item.goodsID + "\">" + item.goodsName + "</a></p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<b>\uFFE5" + item.price + "</b>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"sortnum_join\">\n\t\t\t\t\t\t\t<span class=\"jianjian\">-</span>\n\t\t\t\t\t\t\t<input type=\"text\" id=\"xianshi\" value=\"1\"/>\n\t\t\t\t\t\t\t<span class=\"jiajia\">+</span>\n\t\t\t\t\t\t\t<span class=\"thecart\" goodsid=\"" + item.goodsID + "\">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n\t\t\t\t\t\t\t<div class=\"prompt\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"wuhuobtn\">\n\t\t\t\t\t\t\t<span>\u5230\u8D27\u901A\u77E5</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"sort_scdb\">\n\t\t\t\t\t\t\t<span>\u6536\u85CF</span>\n\t\t\t\t\t\t\t<span>\u5BF9\u6BD4</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
	});
	$(".sort_con ul").html(str10);
	$('.jianjian').click(function () {
		if ($(this).next().val() == 1) {
			$(this).next().val($(this).next().val());
		} else {
			$(this).next().val($(this).next().val() - 1);
		}
	});
	$('.jiajia').click(function () {
		if ($(this).parent().find('#xianshi').val() == 99) {
			$(this).parent().find('#xianshi').val($(this).parent().find('#xianshi').val());
		} else {
			$(this).parent().find('#xianshi').val(parseInt($(this).parent().find('#xianshi').val()) + 1);
		}
	});
	var prompt = "<p>\u63D0\u9192<span class=\"guanbiyixia\"></span></p>\n\t\t\t\t<div>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<i></i> \u52A0\u5165\u8D2D\u7269\u8F66\u6210\u529F\u3002<br />\n\t\t\t\t\t\t\u76EE\u524D\u9009\u8D2D\u5546\u54C1\u5171<span class=\"leishu\"> </span> \u79CD<span class=\"jianshu\"> </span> \u4EF6\u3002\u5408\u8BA1\uFF1A<span class=\"hejijiage\"> </span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class=\"jixuxuangou\">\u7EE7\u7EED\u8D2D\u7269</span>\n\t\t\t\t\t\t<a href=\"cart.html\">\u8FDB\u5165\u8D2D\u7269\u8F66</a>\n\t\t\t\t\t</p>\n\t\t\t\t</div>";
	$('.thecart').click(function () {
		var jiathis = $(this);
		$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: $(this).attr('goodsid'), number: $(this).parent().find('#xianshi').val() }, function (data) {
			if (data == 1) {
				$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?", { userID: $.cookie("username") }, function (data) {
					$('.leishu').html(data.length);
					var jsjs = 0;
					var hjhj = 0;
					$.each(data, function (index, item) {
						jsjs += Number(item.number);
						hjhj += Number(item.number) * Number(item.price);
					});
					var hjhj = '￥' + hjhj.toFixed(2);
					$('.jianshu').html(jsjs);
					$('.hejijiage').html(hjhj);
				});
				$('.sort_con>ul>li').find('.prompt').css('display', 'none').empty();
				jiathis.next().html(prompt).css('display', 'block');
				$('.guanbiyixia').click(function () {
					$(this).parent().parent().css('display', 'none').empty();
				});
				$('.jixuxuangou').click(function () {
					$(this).parent().parent().parent().css('display', 'none').empty();
				});
			} else {
				alert('添加购物车失败，请重试');
			}
		});
	});
});