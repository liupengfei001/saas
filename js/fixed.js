$(function(){
	
//吸顶菜单，如果滚动条超过500px,就显示	
	$(window).scroll(function(){

		if($(document).scrollTop()<=800){
			$("#fix_menu").stop().fadeOut();
		}else{
			$("#fix_menu").stop().fadeIn();	
		}
		//console.log($(document).scrollTop());
	})

function scrollMove(){
//左侧楼梯导航
	//滚动时自动改变颜色
	$(window).scroll(function(){
		if($(document).scrollTop()>0&&$(document).scrollTop()<633){
			$("#left_fix_nav").children().eq(4).css("background","#333").siblings().css("background","#fff");
			
		}else if($(document).scrollTop()>633&&$(document).scrollTop()<1241){
			$("#left_fix_nav").children().eq(0).css("background","#333").siblings().css("background","#fff");
			
		}else if($(document).scrollTop()>1241&&$(document).scrollTop()<2549){
			$("#left_fix_nav").children().eq(1).css("background","#333").siblings().css("background","#fff");
			
		}else if($(document).scrollTop()>2549&&$(document).scrollTop()<3752){
			$("#left_fix_nav").children().eq(2).css("background","#333").siblings().css("background","#fff");
			
		}else if($(document).scrollTop()>3752){
			$("#left_fix_nav").children().eq(3).css("background","#333").siblings().css("background","#fff");
			
		}
		if($(document).scrollTop()<=500){
			$("#left_fix_nav").stop().fadeOut();
		}else{
			$("#left_fix_nav").stop().fadeIn();	
		}

	})
	//鼠标滑过时
	$("#left_fix_nav").children().mouseenter(function(){
		$(this).css({
			"background":"#333",
			
			"color":"#fff"
		});
		
	})
	$("#left_fix_nav").children().mouseleave(function(){
		$(this).css({
			"background":"#fff",
			
			"color":"#c69a62"
		});
		$(this).children().css("color","#c69a62");
	})
	$("#left_fix_nav").children().click(function(){
		
		//console.log($(this).index());
		
		if($(this).index()==4){
			$("html,body").animate({
				scrollTop:0
			});
		}else{
			$("html,body").animate({
				scrollTop:$(".louti").eq($(this).index()).offset().top-50
			});
			//console.log($(".louti").eq($(this).index()).offset().top-50);
		
		}
	})
}
scrollMove();

})
