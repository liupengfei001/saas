function sideBar_callBack(){
$(function(){
//右侧购物车导航
function sideBar_fixed(){
	
	//我的账户动画
	$(".count_logo").mouseenter(function(){
		
		//console.log(1);//测试成功
		$(".count_move").css("display","block");
		$(".count_move").stop().animate({
			"right":"38px",
			"opacity":"1"
		})
	})
	$(".myCount").mouseleave(function(){
		
		//console.log(1);//测试成功
		$(".count_move").stop().animate({
			"right":"70px",
			"opacity":"0"
		},function(){
		
		$(".count_move").css("display","none");
			
		})
	})
	
	//我的购物车
	$(".sideCart_text").click(function(){
		
		//console.log(1);//测试成功
		$(".sideCart_cont").css("display","block");
		$(".sideCart_cont").stop().animate({
			"display":"none",
			"width":"300px",
			"opacity":"1"
		})
	})
	$(".sideCart_cont_title").find("span").click(function(){
		
		//console.log(1);//测试成功
		$(".sideCart_cont").stop().animate({
			"width":"0",
			"opacity":"0"
		},function(){
			$(".sideCart_cont").css("display","none");
		})
		
	})

	
	//我的收藏
	$(".store_logo").mouseenter(function(){
		
		//console.log(1);//测试成功
		$(".store_move").css("display","block");
		
		$(".store_move").stop().animate({
			"right":"38px",
			"opacity":"1"
		})
	})
	$(".myStore").mouseleave(function(){
		
		//console.log(1);//测试成功
		$(".store_move").stop().animate({
			"right":"70px",
			"opacity":"0"
		},function(){
			
		$(".store_move").css("display","none");
			
		})
	})
	//我的记录>>>>>>>>移动的小黑条
	$(".history_logo").mouseenter(function(){
		
		//console.log(1);//测试成功

		$(".history_move").stop().animate({
			"right":"38px",
			"opacity":"1"
		})
	})
	$(".myHistory").mouseleave(function(){
		
		//console.log(1);//测试成功

		$(".history_move").stop().animate({
			"right":"70px",
			"opacity":"0"
		})
	})
	//我的记录>>>>>>>点击出现的记录框
	$(".history_logo").click(function(){
		
		//console.log(1);//测试成功
		$(".history_cont").css("display","block");
		
		$(".history_cont").stop().animate({
			"width":"300px",
			"opacity":"1"
		})
	})
	$(".history_cont_title").find("span").click(function(){
		
		//console.log(1);//测试成功

		$(".history_cont").stop().animate({
			"width":"0",
			"opacity":"0"
		},function(){
			$(".history_cont").css("display","none");
		})
	})
	
	//二维码
	$(".weChat_logo").mouseenter(function(){
		
		//console.log(1);//测试成功
		$(".weChat_move").css("display","block");
		$(".weChat_move").stop().animate({
			"right":"40px",
			"opacity":"1"
		})
	})
	$(".weChat").mouseleave(function(){
		
		//console.log(1);//测试成功
		
		$(".weChat_move").stop().animate({
			"right":"70px",
			"opacity":"0"
		},function(){
			$(".weChat_move").css("display","none");
		})
	})
	//线上客服
	$(".online_logo").mouseenter(function(){
		
		//console.log(1);//测试成功

		$(".online_move").stop().animate({
			"right":"40px",
			"opacity":"1"
		})
	})
	$(".online_talk").mouseleave(function(){
		
		//console.log(1);//测试成功

		$(".online_move").stop().animate({
			"right":"70px",
			"opacity":"0"
		})
	})
	//点击toTop回到顶部
	$(".toTop").click(function(){
		//console.log(1);//测试点击事件通过
		$("html,body").stop().animate({
			scrollTop:0
		})
	})
	

	//点击加入购物车按钮，将商品放入购物车
	
	$("body").on("click","#buy_rightNow",function(){
		
		//alert($(this).attr("goods"));//获得id
		
		//购物车数量增加
		
		var goods = Number($(this).attr("goods"));//此处转为Number，后面删除单个cookie用
		
		var first = $.cookie('goods') == null ? true : false; //判断是否有cookie
		
		var same  = false;//判断时候已经追加
		
		//判断是否是第一次添加
		
		if(first){
			
			//如果是第一次，则建立json结构
			
			$.cookie("goods",'[{goods:'+goods+',num:1}]');
			
			$.cookie("first","false");
		}else{
			
			var str = $.cookie("goods");
			
			var arr = eval(str);
			
			//遍历所有对象，如果goods相同，让该商品数量递增；
			
			for(var attr in arr ){
				
				if(arr[attr].goods == goods){
					
					arr[attr].num = arr[attr].num +1; //让json结构中num自增
					
					var cookieStr = JSON.stringify(arr);//让json对象转换成字符串
					
					$.cookie("goods",cookieStr);
					
					same = true;
					
				}
			}
			
			//如果goods不同，重新建立商品对象
			
			if(!same){
				
				var obj = {goods:goods,num:1};//建立新的json
				
				arr.push(obj);//将新生成的json对象，放到数组arr后面
				
				var cookieStr = JSON.stringify(arr);//将生成的新对象转换成字符串
				
				$.cookie("goods",cookieStr);

			}
		}
		sc_car();//调用函数生成商品数量
		
		sc_msg();//调用函数生成商品
	})
	
	//console.log($.cookie('goods'));
	
	//购物车商品数量
	
	function sc_car(){
		
		var sc_str = $.cookie("goods");
		
		if(sc_str){//如果购物车cookie不为空
			
			var sc_obj = eval(sc_str);
			
			var sc_num = 0;
			
			for(var i in sc_obj){
				
				sc_num += Number(sc_obj[i].num) //利用for in遍历所有的num 
				
			}
			
			$(".carNum").html(sc_num);//将数量放入到购物车的carNum中
		}
	}
	
	sc_car();//打开页面后自动获取商品数量
	
	//动态生成购物车中的商品
	
	function sc_msg(){
		
		//将商品存入购物车
	
		$.ajax({
			url:"data/detailspic.json",
			type:"GET",
			success:function(res){
				//console.log(res);//获取对象成功
				
				var sc_str=$.cookie("goods");
				
				if(sc_str){
					
					var sc_obj = eval(sc_str);
					
					var sc_num = 0;
					
					var html01 = "";
					var countNum =0;
					var allProduct = 0;
					for(var i in sc_obj){
						
						//计算商品总数和价钱
																
						countNum += sc_obj[i].num;
						
						allProduct += sc_obj[i].num*res[sc_obj[i].goods].buy_price;
						
						
						html01 += '<li><div class="buyCar_product_img"><a href="javascript:;"><img src="'+res[sc_obj[i].goods].url+'"/></a></div><div class="buyCar_product_text"><div class="jieshao"><a href="javascript:;">'+res[sc_obj[i].goods].des03+'</a></div><div class="jieshao_price"><strong>￥'+Number(res[sc_obj[i].goods].buy_price)*Number(sc_obj[i].num)+'</strong><span>x'+sc_obj[i].num+'</span><i class="del_buyCar" del="'+sc_obj[i].goods+'"></i></div></div></li>';
						
					}
					//console.log(countNum);//测试商品数量通过
					//console.log(allProduct);//测试商品总价格通过
					
					$(".buyCar_product").children().html(html01);
					
					//将商品总数量和价格插入到html文档中
					
					$(".btn_count").find("span").eq(0).html(countNum);
					
					$(".btn_count").find("span").eq(1).html(countNum);
					
					$(".btn_count").find("strong").html("￥"+allProduct);
					
				}
					
				//点击购物车时判断里面有没有商品，如果有有“购物车中还没有商品，赶集选购吧”消失
				
				function tips_buycar(){
					
					//如果有商品，提示消失
					console.log();
					
					if($(".buyCar_product").children().html()){
						
						$(".update_cart").css("display","none");	
					}
					
					//如果没有商品，则出现
					
					if(!$(".buyCar_product").children().html()){
						
						$(".update_cart").css("display","block");	
					}
					
					//console.log($(".buyCar_product").children().html());
				}
				
				tips_buycar();//调用函数来判断购物车是否有商品
				
			}
		})

	}
	
	sc_msg();//打开页面时自动生成商品放入到购物车

}
sideBar_fixed();

//点击侧边的购物车，将某件商品删除

	$(".buyCar_product").on("click",".del_buyCar",function(){
		
		//console.log($(this).attr("del"));//获取删除按钮的del值成功
		
		//获取cookie
		
		var  cookie = $.cookie("goods");
		
		//console.log(cookie);//获取cookie成功
		
		//将cookie转换为对象
		
		var cookieArr = eval(cookie);
		
		//console.log(cookieArr);//转换成功
		
		var _this =  this ;
		
		//console.log($(this).attr("del"));
		
		//利用each遍历所有对象
		
		$.each(cookieArr,function(index,value){
			
			if($(_this).attr("del") == value.goods){
				
				cookieArr.splice(index,1);
				
				return false;
			}
		})
		
		//console.log(cookieArr);
		
		//将删除后的cookieArr转换成字符串
		 
		var str = JSON.stringify(cookieArr);
		
		//console.log(str);//转换成功
		
		//将转换的字符串存到cookie
		
		$.cookie("goods",str);//用原来的goods名字存储，覆盖原来的goods
		
		//将html中的商品删除，达到实时更新的目的
		
		$(this).parents("li").css("display","none");;
		
		
	})

})
}