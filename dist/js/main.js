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
"use strict";