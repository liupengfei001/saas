$(function (){
	
	//toggle进行tab列表的打开和关闭
	
	//console.log($(".list_buy").find("dl").length);
	
	$(".list_buy").find("dl").click(function(){
		
		//点击时dl高度发生改变
		//console.log($(this).index());
		
		$(".oDl_tab").eq($(this).index()-1).stop().animate({
			
			"height":"194px"
		
		},function(){
			
			$(".oDl_tab").eq($(this).index()-1).find("span").html("&#xe612;");//改变小三角方向
			
		}).siblings().stop().animate({
			
			"height":"40px"
		
		},function(){
			
			$(".oDl_tab").eq($(this).index()-1).find("span").html("&#xe611;");//改变小三角方向
		})
	
	})
	
	
	//点击type_logo切换tab分页
	
	$(".type_logo").find("li").click(function(){
		
		//console.log(1);//测试通过
		//console.log($(this).index());//index测试通过
		$(".tab_click").css("display","none");
		$(".tab_click").eq($(this).index()).css("display","block");
		
		//边框
		$(".type_logo").find("li").find("a").css({
			"box-shadow":"none",
			"border":"none"
		});
		$(".type_logo").find("li").eq($(this).index()).find("a").css({
			"box-shadow":"inset 0px 0px 20px -3px #ddd",
			"border":"1px solid #ddd"
		});
	})
	
	
})
