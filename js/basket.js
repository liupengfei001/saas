$(function(){
	function pro_num(){
	
	//点击按钮实现要购买商品数量的加减，最少为1
	
	$("body").on("click",".plus",function(){
			
	//点击时获取+ - 中间的input值
			
			var count=$(this).siblings("input").val();
			
			//console.log(count)
			
	//定义一个变量，当点击时获取当前的商品总数，当点击“+”时，商品总数++；
			
			var nowNum = $(".basket_right").find("span").eq(0).find("strong").html();
			
			//console.log(nowNum)//测试通过，可以获的商品总数
			
	//获取单价
			
			var danjia = $(this).parent().parent().siblings(".basket_cont_price").find("span").html();
			
			//console.log(danjia);//获取单价成功
	
		
	//将价格总的数字提取出来
	
			var allProductPrice    = $(".basket_right").find("span").eq(1).find("strong").html(); 
			
			var allProductPriceNum = allProductPrice.substring(allProductPrice.indexOf("￥")+1);
			
			//console.log(allProductPriceNum);//获取成功
		
			count++;
			
			nowNum++;//商品总数++
			
			//console.log(count);
			
			$(this).siblings("input").val(count);
			
			//console.log($(this).siblings("input"));//点击事件成功
			
			//将++后的总数放回原来的位置
			
			$(".basket_right").find("span").eq(0).find("strong").html(nowNum);

			//++后小计的值
			
			$(this).parent().parent().siblings(".basket_cont_allprice").find("span").html(count*danjia);
			
			//++后总值，每次点击“-”，总价减一次当前商品的单价
		
			$(".basket_right").find("span").eq(1).find("strong").html("￥"+(Number(allProductPriceNum) + Number(danjia))); 
			
	})
	
	$("body").on("click",".minus",function(){
		
	//点击时获取+ - 中间的input值
		
		var count=$(this).siblings("input").val();
		
	//定义一个变量，当点击时获取当前的商品总数，当点击“-”时，商品总数--；
			
		var nowNum = $(".basket_right").find("span").eq(0).find("strong").html();
		
	//获取单价
			
		var danjia = $(this).parent().parent().siblings(".basket_cont_price").find("span").html();
		
	//将价格总的数字提取出来
	
		var allProductPrice    = $(".basket_right").find("span").eq(1).find("strong").html(); 
		
		var allProductPriceNum = allProductPrice.substring(allProductPrice.indexOf("￥")+1);
		
		//console.log(allProductPriceNum);//获取成功
			
		//console.log(3);//事件测试成功
		
		//判断是否大于1
		//console.log(count);
		
		if(count>1){
			
			nowNum--;//商品总数--
			
			count--;
			
			//--后总值，每次点击“-”，总价减一次当前商品的单价
		
			$(".basket_right").find("span").eq(1).find("strong").html("￥"+(allProductPriceNum - danjia)); 
			
		}else if(count==1){
			
//			定义变量_this来取得this的值
			var _this = this;
			
			$(this).parent().siblings().stop().animate({
					
				"opacity":"1"
					
			},300,function(){
					
				setTimeout(function(){
						
					$(_this).parent().siblings().stop().animate({
					
						"opacity":"0"
						
					})
						
				},2000)
			})
			
		}
		$(this).siblings("input").val(count);
		
		//将--后的总数放回原来的位置
			
		$(".basket_right").find("span").eq(0).find("strong").html(nowNum);
		
		//--后小计的值
			
		$(this).parent().parent().siblings(".basket_cont_allprice").find("span").html(count*danjia);
		
		

	})

}
pro_num();

	
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

//					html01 += '<li><div class="buyCar_product_img"><a href="javascript:;"><img src="'+res[sc_obj[i].goods].url+'"/></a></div><div class="buyCar_product_text"><div class="jieshao"><a href="javascript:;">'+res[sc_obj[i].goods].des03+'</a></div><div class="jieshao_price"><strong>￥'+Number(res[sc_obj[i].goods].buy_price)*Number(sc_obj[i].num)+'</strong><span>x'+sc_obj[i].num+'</span><i></i></div></div></li>';
					
					html01 +='<li><div class="basket_pro_cont"><div class="basket_cont_img"><span></span><a href=""><img src="'+res[sc_obj[i].goods].url+'" alt="" /></a></div><div class="basket_cont_name"><p>'+res[sc_obj[i].goods].des03+'</p><span>'+res[sc_obj[i].goods].des04+'</span></div><div class="basket_cont_price">￥<span>'+res[sc_obj[i].goods].buy_price+'</span></div><div class="basket_cont_num"><div class="pro_num"><a class="minus" href="javascript:void(0);">-</a><input type="text" value="'+Number(sc_obj[i].num)+'" class="num_buy" /><a class="plus" href="javascript:void(0);">+</a></div><div class="tankuang"><p>此商品的最小购买数量为1件</p><i class="iconfont lingxing01">&#xe618;</i><i class="iconfont lingxing02">&#xe618;</i>	<i class="iconfont jinggao">&#xe617;</i></div></div><div class="basket_cont_allprice">￥<span>'+Number(sc_obj[i].num)*Number(res[sc_obj[i].goods].buy_price)+'</span></div><div class="basket_dele" num="'+Number(sc_obj[i].num)+'" del="'+sc_obj[i].goods+'">删除</div></div></li>';
						
				}
				//console.log(countNum);//测试商品数量通过
				//console.log(allProduct);//测试商品总价格通过
					
				$(".all_product").html(html01);
					
				//将商品总数量和价格插入到html文档中
					
				$(".basket_right").find("span").eq(0).find("strong").html(countNum);
					
				$(".basket_right").find("span").eq(1).find("strong").html("￥"+allProduct);
					
//				$(".btn_count").find("strong").html("￥"+allProduct);
					
				}
				
				comeBack_index();//调用函数判断有没有商品，有就显示商品,没有就显示返回首页
			}
		
			
		})

	}
	
	sc_msg();//打开页面时自动生成商品放入到购物车
	
	
	//清空购物车，当点击“删除”时，将当前cookie删除
	
	$("body").on("click",".clear_carAll",function(){
		
		//console.log(1);//点击事件获取成功
		
		$.cookie("goods",null);
		
		$(".all_product").html("");
	})
	
	//删除一件商品
	
	$("body").on("click",".basket_dele",function(){
		
		//获取cookies
		
		var cookie = $.cookie("goods");
		
		//console.log(cookie);//获取cookie成功
		
		//将cookie转换为对象
		console.log(cookie);
		var cookieArr = eval(cookie);
		
		//console.log(cookieArr);//转换成功
		
		//利用each，遍历找到cookie中当前商品的对象项
		
		var _this  =  this;
		
		$.each(cookieArr,function(index,value){
			
			if($(_this).attr("del") == value.goods){//如果当前点击的对象的del值和存入的cookie值相同，则删除当前项
				
				cookieArr.splice(index,1);//利用splice将当前项删除
				
				return false;			  //终止$.each循环,否则会报错
			}
			
		})
		
		//console.log(cookieArr);//测试通过，可以删掉当前的cookies
		
		//将得到的对象转换成字符串
		
		var str = JSON.stringify(cookieArr);
		
		//console.log(str);//[{"goods":5,"num":1},{"goods":4,"num":1}] basket.js:247 [{"goods":4,"num":1}]
		
		//将转换为字符串的str存入cookie
		
		$.cookie("goods",str);
		
		//点击时，将html中的商品同时删除
		
		$(this).parents("li").html("");
	})
	

//下面点击切换的商品的动画效果

	function banner_basket(){
			
		//鼠标滑过widht变为340px;划出width:253px;	
		
		$("body").on("mouseenter","#getWidth li",function(){

			$(this).find(".formall").stop().animate({
				
				"width":"340px"
			},200)
		})
		
		//鼠标滑出widht变为253px;划出width:340px;
		
		$("body").on("mouseleave","#getWidth li",function(){
			
			$(this).find(".formall").stop().animate({
				
				"width":"253px"
			},200)
		})
		
		//当鼠标放到小图片上时，大图变小图，加边框，兄弟节点无边框
		
		$("body").on("mouseenter",".small_pic dd",function(){
			
			//console.log(1);//鼠标事件成功
			
			$(this).children().css({
				
				"border":"4px solid #C89961"
			}).parent().siblings().find("img").css({
				
				"border":"0"
			})
			
			//鼠标滑过换图
			
			$(this).parent().siblings(".formall_cont").find(".arr_pic").find("a").find("img").attr("src",$(this).find("img").attr("src"));
			
		
		})
		
		//划过时当前li的z-index为10；兄弟节点为2；
		
		$("body").on("mouseenter",".formall",function(){
			
			//划过时当前li的z-index为10；兄弟节点为2；
			
			$(this).css({
				
				"z-index":"10"
				
			}).parent().siblings().find(".formall").css({
				
				"z-index":"2"
				
			})
		})
		
	}
	banner_basket();
	
//ajax动态获取图片，生成轮播图
	
	function ajax_basket_banner(){
		
		$.ajax({
			
			url:"data/basket_banner.json",
			
			type:"GET",
			
			success:function(res){
				
				//console.log(res);//获取json成功
				
				var obj = [];//定义数组，用于盛放得到的数据
				
				for(var key in res){
					
					//console.log(res[key]);//测试通过
					
					obj.push(res[key]);
				}
				
				//console.log(obj);//得到数据数组
				
				var html = "";//定义变量，用来存放默认显示的拼接的字符串；
				
				for(var h = 0;h<obj[0].length;h++){
					
					html += '<li><div class="formall"><div class="formall_cont"><div class="arr_pic"><b><img src="'+obj[0][h].url1+'" alt="" /></b><span>'+obj[0][h].brand+'</span><a href="javascript:;"><img src="'+obj[0][h].url2+'" alt="" /></a></div><div class="scal_price"><span class="now_price">'+obj[0][h].now_price+'</span><span class="old_price"><del>'+obj[0][h].old_price+'</del></span><span class="discout">'+obj[0][h].discout+'</span></div><div class="arr_info"><h3 class="arr_name"><a href="javascript:;">'+obj[0][h].arr_name+'</a></h3><p class="arr_pr_info"><a href="javascript:;">'+obj[0][h].arr_pr_info+'</a></p><p class="volume">'+obj[0][h].volume+'</p></div><div class="addBuyCar"><a href="javascritp:;">加入购物车</a></div></div><dl class="small_pic"><dd><img style="border:4px solid #C89961;" src="'+obj[0][h].smallPic[0]+'" alt="" /></dd><dd><img src="'+obj[0][h].smallPic[1]+'" alt="" /></dd><dd><img src="'+obj[0][h].smallPic[2]+'" alt="" /></dd></dl></div></li>';	
					
				}
				
				$("#getWidth").html(html);//成功放入拼接好的字符串
				
				//让插入的图片排成一排
				
				var oWidth = $("#getWidth").children().length * ($("#getWidth").children().eq(0).width()+26) + 87;//计算所有li的宽度(26为margin值)
				
				$("#getWidth").css("width",oWidth+"px");//设置ul的宽度为所有li的宽度
				
				//选择加购区的价格区域
				
				$(".radius_bg").children().eq(0).find("a").css("background","#EDCDDA");//第一个“20元以下”默认显示背景色
				
				//价格区间的点击事件
				
				var that = 0;//定义变量，获取点击价格区域时的this.index；默认为0，即第一个价格区间
				
				$(".radius_bg").children().click(function(){
					
					//console.log(1);//点击事件测试成功
					
					//console.log($(this).index());// 0 1 2 测试通过
					
					//点击价格区域时，当前的a背景变色，其他的a背景设置为none;
					
					$(this).children().css("background","#EDCDDA").parent().siblings().children().css("background","none");
					
					//定义变量，点击那个区间,就换成哪个区域的图片
					
					var html01 = "";
					
					for(var j = 0; j<obj[$(this).index()].length;j++){
						
						html01 += '<li><div class="formall"><div class="formall_cont"><div class="arr_pic"><b><img src="'+obj[$(this).index()][j].url1+'" alt="" /></b><span>'+obj[$(this).index()][j].brand+'</span><a href="javascript:;"><img src="'+obj[$(this).index()][j].url2+'" alt="" /></a></div><div class="scal_price"><span class="now_price">'+obj[$(this).index()][j].now_price+'</span><span class="old_price"><del>'+obj[$(this).index()][j].old_price+'</del></span><span class="discout">'+obj[$(this).index()][j].discout+'</span></div><div class="arr_info"><h3 class="arr_name"><a href="javascript:;">'+obj[$(this).index()][j].arr_name+'</a></h3><p class="arr_pr_info"><a href="javascript:;">'+obj[$(this).index()][j].arr_pr_info+'</a></p><p class="volume">'+obj[$(this).index()][j].volume+'</p></div><div class="addBuyCar"><a href="javascritp:;">加入购物车</a></div></div><dl class="small_pic"><dd><img style="border:4px solid #C89961;" src="'+obj[$(this).index()][j].smallPic[0]+'" alt="" /></dd><dd><img src="'+obj[$(this).index()][j].smallPic[1]+'" alt="" /></dd><dd><img src="'+obj[$(this).index()][j].smallPic[2]+'" alt="" /></dd></dl></div></li>';	
						
					}
					
					$("#getWidth").html(html01);//成功放入拼接好的字符串
					
					//点击切换价格区间时，countNum=0;
					
					$("#getWidth").css("left","0");
					
					countNum = 0;
					
					$("#getWidth").children().eq(4).css("opacity","0");
					
					that = $(this).index();
					
				})
				
				
				
//左侧按钮的点击事件
				
				//设置计数器
				
				var countNum = 0;
				
				//默认第5张图透明度为0
				$("#getWidth").children().eq(4).css("opacity","0");
				
				$(".left_btn").click(function(){
					
					//console.log(countNum);//countNum 0-4测试通过
					
					
					//console.log(that);//测试通过，that传值成功

					var page_num = Math.ceil(obj[that].length/4);//求出当前价格区域中的产品有几页
					
					//console.log(page_num);//测试通过，获得每个区间的页数
					
					if(countNum < page_num-1){
						
						countNum ++;
					}

					//点击按钮时向左移动四个
					
					$("#getWidth").stop().animate({
						
						"left": -countNum*(($("#getWidth").children().eq(0).width()+26)*4)
					})
						
					//在大于(countNum*4)小于((countNum+1)*4-1)时，display:block;其他兄弟节点display:none;
						
					//找到所有的商品，遍历所有的商品，在范围内的显示
						
						for(var k=0;k<$("#getWidth").children().length-1;k++){
							
							if(countNum*4<=k && ((countNum+1)*4-1)>=k){
								
								$("#getWidth").children().eq(k).stop().animate({
									
									"opacity":"1"
								});
								
//								console.log(k);
							}else{
								
								$("#getWidth").children().eq(k).stop().animate({
									
									"opacity":"0"
								});
							}
							
						}
					
					
					
				})
				
//右侧按钮的点击事件				
				$(".right_btn").click(function(){
					
					//console.log(countNum);//countNum 0-4测试通过
					
					
					//console.log(that);//测试通过，that传值成功

					var page_num = Math.ceil(obj[that].length/4);//求出当前价格区域中的产品有几页
					
					//console.log(page_num);//测试通过，获得每个区间的页数
					
					if(countNum >0){
						
						countNum --;
					}

					//点击按钮时向左移动四个
					
					$("#getWidth").stop().animate({
						
						"left": -countNum*(($("#getWidth").children().eq(0).width()+26)*4)
					})
						
					//在大于(countNum*4)小于((countNum+1)*4-1)时，display:block;其他兄弟节点display:none;
						
					//找到所有的商品，遍历所有的商品，在范围内的显示
						console.log(countNum);
						
						for(var k=0;k<$("#getWidth").children().length-1;k++){
							
							if(countNum*4<=k && ((countNum+1)*4-1)>=k){
								
								$("#getWidth").children().eq(k).stop().animate({
									
									"opacity":"1"
								});
								
								console.log(k);
							}else{
								
								$("#getWidth").children().eq(k).stop().animate({
									
									"opacity":"0"
								});
							}
							
						}
					
					
					
				})
			}
		})
	}
	ajax_basket_banner();

//判断购物车有没有商品，如果有则显示商品，如果没有，则显示返回首页的界面
	function comeBack_index(){
		
		//如果allproduct中没有内容，则为没有商品
		
		if($(".all_product").html() == ""){
			
			$(".basket_main").css("display","none");
			
			$("#buyCar_null_wrap").css("display","block");
			
		}else{
			
			$(".basket_main").css("display","block");
			
			$("#buyCar_null_wrap").css("display","none");
		}
		console.log($(".all_product").find("li"));
	}
	
})
