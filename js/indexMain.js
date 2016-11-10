function topCallBack(){
$(function(){
	
	function buyCar_auto(){
		//顶部购物车滑过出来的提示信息
		
		$(".link_buyCar").hover(fn1,fn2);
		
		function fn1(){
			
			if($(".buyCar_product").children().html()){
				console.log($(".buyCar_product").children());
				
				$("#buyCar_po").html($(".buyCar_product").html());
				
			}

			
			$("#buyCar_po").stop().fadeIn(500);
			
		}
		
		function fn2(){
			
			$("#buyCar_po").stop().fadeOut(1000);
		}
		
		
	}
	buyCar_auto();
	
	//点击顶部的购物车的删除按钮，将li删除
	
//	$(".buyCar_po").on("click",".del_buyCar",function(){
//		
//		
//	})
	
	function shoufengqin_index(){
		//首页顶部的手风琴效果
		
		$(".sfq").children().mouseenter(function(){
			
			//鼠标滑过

			$(this).stop().animate({
				
				"width":"115px"
				
			},300).siblings().stop().animate({
				
				"width":"35px"
				
			},300)

		})
	
	}
	shoufengqin_index();
	

	function topNav_menu_index(){
		
		
		
		//鼠标滑过变色
		
		$(".n_B_L_Ul").find(".H").mouseenter(function(){
			
			$(this).css("background","#CA1466");
			
			$(".nav_saojiao01").css("borderColor","  #eee #CA1466 #CA1466 #CA1466");
			
			$(".nav_saojiao02").css("borderColor","   #CA1466 #CA1466 #eee #CA1466");

		})
		$(".n_B_L_Ul").find(".H").mouseleave(function(){
			
			$(this).css("background","#EC417D");
			
			$(".nav_saojiao01").css("borderColor"," #eee #EC417D #EC417D  #EC417D");
			
			$(".nav_saojiao02").css("borderColor","   #EC417D #EC417D #eee #EC417D");
			
			
		})
		
		//主页顶部导航菜单下的二级菜单
		
		$(".MENU").hover(fn1,fn2)
		
		//鼠标滑过下拉，鼠标移出后滑上去
		
		function fn1(){
			
			$(".nav_two").css("border","1px solid #BABABA");
			$(".nav_saojiao02").css("borderColor","#CA1466 #CA1466 #eee #CA1466");
			$(".nav_two").stop().animate({

				"height":"280px"
			
			},300,function(){
				
				$(".nav_saojiao02").css("display","block");
				
			});
			
		}
		function fn2(){
			$(".nav_saojiao02").css("borderColor","#EC3E7D #EC3E7D #eee #EC3E7D");

			$(".nav_two").stop().animate({

				"height":"0"
			
			},300,function(){

				$(".nav_saojiao02").css("display","none");
				
				$(".nav_two").css("border","0");
				
			});
			
		}
		
		
//导航左侧的三级菜单
		
		//调用ajax
		
		$.ajax({
			
			url:"data/category.json",
			type:"GET",
			success:function(res){
				//console.log(res[0].oUl01.ul);//["保湿", "美白提亮", "提亮祛斑", "收毛孔"]
				//console.log(res[0].oUl01.U3_01);//热门功效
//				console.log(res[0].oUl01_01.U3_02);//热门功效
				//console.log(res[0].oUl01.ul.length);//1
				var html05 = "";
				for(var i=0;i<res.length;i++){//求出res的长度
					
					//定义变量放内容
				
					var html01 = "";
					
					var html02 = "";
					
					var html03 = "";
					
					var html04 = "";
					
					var html06 = "";
					var html07 = "";
					
					//第一个循环，将oUl01中的内容获取
					
					for(var j=0;j<res[i].oUl01.ul.length;j++){
						
						//循环生成多个li，左侧的内容
						
						html01 +='<li><a href="javascript:;">'+res[i].oUl01.ul[j]+'</a></li>';
					}
					
					//将生成的li放到ul中
					
					html02 +='<div class="oUl01"><h3 style="background:url('+res[i].oUl01.url+') no-repeat left center;background-size:20px;"><a href="javascript">'+res[i].oUl01.U3_01+'</a></h3><ul >'+html01+'</ul></div>';
					
					//console.log(html02);
					//第2个循环，将oUl01_01中的内容获取
					for(var k=0;k<res[i].oUl01_01.U3_02.length;k++){//U3_02标题的长度
						
						//循环生成多个h3，右侧的内容
						
						html06 ='<h3><a href="javascript:;">'+res[i].oUl01_01.U3_02[k]+'</a></h3>';
						
						//生成和h3对应的li的内容
						for(var h =0;h<res[i].oUl01_01.ul[k].length;h++){
							
							html03 +='<li><a href="javascript:;">'+res[i].oUl01_01.ul[k][h]+'</a></li>';
						
						}
						//将h3和li放到一起
						
						
						html07 += '<div >'+html06+'<ul >'+html03+'</ul></div>';
						 html03 = "";
					}
					
					//console.log(html03);
					html04 +='<div class="oUl01_01">'+html07+'</div>';
					
					html05 +='<li>'+html02+html04+'</li>';
//					console.log(html05);
				}
				//console.log(html05);
				
				//将生成的内容放到li并插入到category_content中
				
				$(".category_content").append(html05);
				
//鼠标划过背景变色隐藏的右侧菜单显示
		
				$(".category_content").children().mouseenter(function(){
					
					//console.log($(".category_content").children());

					$(this).css("background","#fff");
					
					console.log($(".oUl01").length);
					
					console.log($(this).index());
					
					$(".oUl01_01").css("display","none");
					
					$(".oUl01_01").eq($(this).index()).css("display","block");
				})
			
//鼠标划出全部隐藏
				
				$(".category_content").children().mouseleave(function(){
					
					$(this).css("background","none");
					
					$(".oUl01_01").eq($(this).index()).css("display","none");
		
				})
			
				
			}
		})
		

		
	}
	
	topNav_menu_index();
	
	//banner上面nav line跟随鼠标移动
	
	function line_move(){
		
		$(".other_category").children().has("a").mouseenter(function(){
			
			//console.log(1);//测试通过
			
			//鼠标滑过line_move显示出来
			
			$(".line_move").css("display","block");
			//定义变量left
			
			var left = $(this).index()*90+"px";
			//line_move跟随鼠标移动
			
			$(".other_category").find(".line_move").stop().animate({
				"left":left
			})
		})
		
		$(".other_category").children().has("a").mouseleave(function(){
			
			//鼠标移开line_move消失
			
			$(".line_move").css("display","none");
		})
	}
	line_move();
	
	//banner开始
	function banner(){

			//调用ajax,生成banner
			
			$.ajax({
				
				url:"data/banner.json",
				
				type:"GET",
				
				success:function(res){
					
					//console.log(res);//获取json数据成功
					
					var html="";

					for(var i=0;i<res.length;i++){
						
						html    +='<a href="javascript:;"><div style="background:'+res[i].bg+' url('+res[i].url+') no-repeat center top"></div></a>';

					}
					$(".banner").append(html);

					$(".banner").find("a").eq(0).css("display","block");
					
					autoPlay();//调用函数自动播放
				}
				
				
			})
			
			//设置自动播放函数，利用fadeIn fadeOut 制作轮播图
			var count=0;
				
			var timer;
			function autoPlay(){
				
				
				
				clearTimeout(timer);//清理定时器
				
				timer = setInterval(function(){
					
					//判断count
					
					if(count == $(".banner").children().length-1){
						
						count =	0;//如果到达边界，从第一张开始
						
					}else{
						
						count ++;
					}
					
//					console.log(count);//0 1 2 3 4 5 ,输出正确
					
					$(".banner").children().eq(count).fadeIn().siblings().fadeOut();
					
					$(".banner_btn").children().eq(count).addClass("activeBtn").siblings().removeClass();//添加红色按钮
					
					
				},2000)
				
			}
			
			//鼠标滑过按钮换图
			
			$(".banner_btn").find("li").mouseenter(function(){
				
				clearTimeout(timer);//当鼠标放到当前按钮上时，清除定时器，自动播放暂停
			
				//console.log(1);//测试通过

				$(".banner_btn").children().eq($(this).index()).addClass("activeBtn").siblings().removeClass();//添加红色按钮
				
				$(".banner").children().eq(count).fadeIn().siblings().fadeOut();//鼠标放到当前按钮上,相应的图片淡入，其他图片淡出

			})
			
			//鼠标移出时，调用自动播放按钮，从当前图片开始轮播
			
			$(".banner_btn").find("li").mouseleave(function(){
				
				count = $(this).index();//将count设置为当前按钮对象的index
				
				autoPlay();
			})

	}

	banner();
	
//主页刚打开时出来的弹出框
	function tankuang(){
		
		$(".close_fixed").click(function(){
			
			$("#setI_box").stop().animate({
				
				"opacity":"0"
				
			},function(){
				
				$("#setI_box").css("display","none");
			})
		})
		
		setTimeout(function(){
			
			$("#setI_box").stop().animate({
				
				"opacity":"0"
				
			},function(){
				
				$("#setI_box").css("display","none");
			})
		},5000)
		
	}
	tankuang();

})
}