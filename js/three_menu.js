function three_menu_callBack(){
//	console.log(2);//测试通过，callback调用成功
//	三级菜单鼠标事件》》商品分类导航
	
	//让页面在打开100毫秒后执行一次
	setTimeout(function(){
		 $(".category_content").css("display","none");
	},100)
	//利用事件委托，在回调three_menu_callback后执行鼠标事件
	$(function(){
		//console.log(3);
		//获取元素
		
		
		//console.log($(".category_title"));
		$("body").on("mouseenter",".category_title01",function(){
			//console.log(1);
			$(".category_content").css("display","block");
			
			$(".category_content").stop().animate({
				
				"height":"420px",
				"opacity":"1"
			})
		})
		$("body").on("mouseleave",".category_title01",function(){
			//console.log(1);
			$(".category_content").css("display","none");
			
			$(".category_content").stop().animate({
				
				"height":"0",
				"opacity":"0"
			})
		})
		
	})
}
