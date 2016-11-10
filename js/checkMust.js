$(function(){

//	checkMust的图片

	function checkMust(){
		//	checkMust ajax json获取

		$.ajax({
			url:"data/checkMust.json",
			type:"GET",
			success:function(res){
				//console.log(res);//测试通过
				
				//获取元素
				$(".bg_change").mouseenter(function(){
					//console.log(res[$(this).index()].bgl);
					//console.log(1);//测试通过

					$(".checkBg_left").css("background",res[$(this).index()].bgl);
					
					
					$(".checkBg_right").css("background",res[$(this).index()].bgr);
				})
				
				
			}
		})
	}
	checkMust();

//limiteOffer中的6张可爱图片

	function clockDate(){
		
		//倒计时
		
		//设置变量
		
		var d1 = new Date(2016,9,1,0,0,0);//设置结束时间为2016年10月1日0点
		
		var timer,differ;
		
		function timer(){
			
			var d2   = new Date();//获取当前时间
			
			differ   = (d1 - d2)/1000 ;//求出相差多少秒
			
			var day  = Math.floor(differ/(60*60*24));//求出相差天数
			
			var hour = Math.floor((differ-day*60*60*24)/(60*60));//求出相差小时数
			
			var min  = Math.floor((differ-day*60*60*24-hour*60*60)/60);//求出相差分数
			
			var sec  = Math.floor(differ-day*60*60*24-hour*60*60-min*60);
			
			//console.log(hour);
			
			$(".days").html(day);
			
			$(".hours").html(hour);
			
			$(".minutes").html(min);
			
			$(".second").html(sec);
			
			setTimeout(timer,1000);
		}
		timer();
	}
	
	
//limiteOffer动态获取

	
function limiteAjax(){
	
	//利用ajax动态生成产品列表，添加到“所有商品”的ul中
	
	$.ajax({
		
		url:"data/detailspic.json",
		
		type:"GET",
		
		success:function(res){
			
			//console.log(res);//获取成功
			
			//定义变量
				
			var html ="";
				
			//for 循环，链接字符串
				
			for ( var i=0; i<6;i++){

				html +='<li class="limite_children" id="'+res[i].id+'"><a href="'+res[i].link+'"><i class="count"><b>'+res[i].discout+'</b></i><div class="flashscal_pic"><span class="vertical"></span><img src="'+res[i].url+'" alt="'+res[i].alt+'"/></div><div class="scale_price clear"><span class="buy_num">'+res[i].buy_num+'</span><span class="buy_price">'+res[i].buy_price+'</span><span class="buy_del"><del>'+res[i].buy_del+'</del></span></div><div class="flash_info"><div class="des01"><i class="douhao"></i>'+res[i].douhao+'</div><div class="des02">'+res[i].des02+'</div><p class="des03">'+res[i].des03+'</p><p class="des04">'+res[i].des04+'</p><p class="des05"><i class="iconfont clock">&#xe600;</i>剩余	<span class="days"></span>天	<span class="hours"></span>时<span class="minutes"></span>分<span class="second"></span>秒</p></div>	<span class="comeBuy_bg"></span></a></li>';
	
			}
			
			//将字符串放到Limite 的ul中
				
			$(".limite").append(html);
			
			//调用计时器
			clockDate();
		}
		
		
	})
}
limiteAjax();


function setCookies(){
	
	//实现点击时设置cookies,将点击产品的id存为cookies,并且跳转到购买页面
	
	$("body").on("click",".limite_children",function(){
		
		$.cookie("id",this.id,{expires:3,path:"/"});
		
//		window.location.href = "details.html";
		
		window.open("details.html","_blank");
//		window.location.href = "details.html?id="+"1233445532";
	})
}
setCookies();
	
	
	
	
//	<!--new arrivals新品上市中小滑块跟随鼠标运动
	
	function cus_line(){
		
		$(".cus_tab").children().has("a").mouseenter(function(){
			
			//console.log(1);//测试通过
			//cus_line的宽度随着li的宽度变化
			
			$(".cus_line").css("width",$(this).css('width'));
			//console.log($(this).css('width'));
			

			//定义变量left
			var left=0;
			//console.log($(this).index());
			for(var i=0;i<$(this).index();i++){
				
				left+=parseInt($(".cus_tab").children().has("a").eq(i).css('width'));
				
			//console.log(left);
			}
			
			//line_move跟随鼠标移动
			left = left+"px";
			$(".cus_tab").find(".cus_line").stop().animate({
				"left":left
			},300)
		})

	}
	cus_line();
	
//new arrivals新品上市

	function newArrAjax(){
		
		$.ajax({
			url:"data/newArr.json",
			type:"GET",
			success:function(res){
				//console.log(res);//获取json成功
				
				//鼠标滑过cus_tab，动态加载相关图片
				
				//将所有对象提取出来放到obj数组中
				var obj=[];
				
				for(var key in res){
						//console.log(res[key]);
						//obj = res[key];
						//console.log(obj);
						obj.push(res[key])
				}
					//console.log(obj);//[Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8]]
					
					//console.log(obj[$(this).index()][0].url1);//images/arr_pic01.png
					//console.log(obj[$(this).index()]);//第index的8张图
				//默认显示第一批图片
				var html2 = "";
					
					for(var h=0;h<obj[0].length;h++){
						
						//连接字符串
						html2 += '<li><div class="formall"><div class="formall_cont"><div class="arr_pic"><b><img src="'+obj[0][h].url1+'" alt="" /></b><span>'+obj[0][h].brand+'</span><a href="javascript:;"><img src="'+obj[0][h].url2+'" alt="" /></a></div><div class="scal_price"><span class="now_price">'+obj[0][h].now_price+'</span><span class="old_price"><del>'+obj[0][h].old_price+'</del></span><span class="discout">'+obj[0][h].discout+'</span></div><div class="arr_info"><h3 class="arr_name"><a href="javascript:;">'+obj[0][h].arr_name+'</a></h3><p class="arr_pr_info"><a href="javascript:;">'+obj[0][h].arr_pr_info+'</a></p><p class="volume">'+obj[0][h].volume+'</p></div><div class="addBuyCar"><a href="javascritp:;">加入购物车</a></div></div><dl class="small_pic"><dd><img style="border:4px solid #C89961;" src="'+obj[0][h].smallPic[0]+'" alt="" /></dd><dd><img src="'+obj[0][h].smallPic[1]+'" alt="" /></dd><dd><img src="'+obj[0][h].smallPic[2]+'" alt="" /></dd></dl></div></li>';	
						
					}
				//将连接好的字符串放到ul中
					
				$("#newArr_tab").append(html2);
				newArr();
				
				//调用移除margin_left函数
					
				removeMargin_left();
					
				$(".cus_tab").children().has("a").mouseenter(function(){
					
					//清空原有的内容
					
					$("#newArr_tab").html("");
					
					//console.log($(".cus_tab").children().has("a").length);//获取导航成功
					
					//for循环遍历this.index 的8个对象，定义HTML空对象
					
					var html = "";
					
					for(var j=0;j<obj[$(this).index()].length;j++){
						
						//连接字符串
						html += '<li><div class="formall"><div class="formall_cont"><div class="arr_pic"><b><img src="'+obj[$(this).index()][j].url1+'" alt="" /></b><span>'+obj[$(this).index()][j].brand+'</span><a href="javascript:;"><img src="'+obj[$(this).index()][j].url2+'" alt="" /></a></div><div class="scal_price"><span class="now_price">'+obj[$(this).index()][j].now_price+'</span><span class="old_price"><del>'+obj[$(this).index()][j].old_price+'</del></span><span class="discout">'+obj[$(this).index()][j].discout+'</span></div><div class="arr_info"><h3 class="arr_name"><a href="javascript:;">'+obj[$(this).index()][j].arr_name+'</a></h3><p class="arr_pr_info"><a href="javascript:;">'+obj[$(this).index()][j].arr_pr_info+'</a></p><p class="volume">'+obj[$(this).index()][j].volume+'</p></div><div class="addBuyCar"><a href="javascritp:;">加入购物车</a></div></div><dl class="small_pic"><dd><img style="border:4px solid #C89961;" src="'+obj[$(this).index()][j].smallPic[0]+'" alt="" /></dd><dd><img src="'+obj[$(this).index()][j].smallPic[1]+'" alt="" /></dd><dd><img src="'+obj[$(this).index()][j].smallPic[2]+'" alt="" /></dd></dl></div></li>';	
						
					}
					
					//将连接好的字符串放到ul中
					
					$("#newArr_tab").append(html);
					
					//调用移除margin_left函数
					
					removeMargin_left();
					
					//调用控制li运动的函数newArr
					
					newArr();

				})
			}
			
			
		})
	}
	newArrAjax();
	
	//移除margin_left函数
	
	function removeMargin_left(){
		
		//由于每组图片固定为8张，所有可以不用obj[$(this).index()].length，直接写8即可
		for(var k=0;k<8;k++){
							
			//判断，给左边的li的margin-left:25px；去掉
							
			if(k%4==0){
				$("#newArr_tab").children().eq(k).css("margin-left","0");
								
			}
	
		}
	}
	
	//控制li运动的函数newArr
	
	function newArr(){
		
	//li的 heihgt 增大,向下运动
	
	$("#newArr_tab").children().mouseenter(function(){
		
		//console.log(1);
		
		//商品宽度高度和z-index发生 变化
		
		$('.formall').eq($(this).index()).stop().animate({
			
			//console.log(1);
			
			"z-index":"10",
			
			"height":"538px",
			
			"width":"340px"
			
			
		},50)
		
		//加入购物车按钮出现
		
		$('.addBuyCar').eq($(this).index()).css({
			
			"display":"block"
		})
	})
	$("#newArr_tab").children().mouseleave(function(){
		
		$(".formall").eq($(this).index()).stop().animate({
			
			"z-index":"2",
			
			"height":"485px",
			
			"width":"253px"
			
		},50)
		
		//加入购物车按钮消失
		
		$('.addBuyCar').eq($(this).index()).css({
			
			"display":"none"
		})
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

	
	}
	
	
	

	//	<!--hotbrands 中小滑块跟随鼠标运动
	
	function hot_line(){
		
		$(".hot_tab").children().has("a").mouseenter(function(){
			
			//console.log(1);//测试通过
			//cus_line的宽度随着li的宽度变化
			
			$(".hot_line").css("width",$(this).css('width'));
			//console.log($(this).css('width'));
			

			//定义变量left
			var left=0;
			//console.log($(this).index());
			for(var i=0;i<$(this).index();i++){
				
				left+=parseInt($(".hot_tab").children().has("a").eq(i).css('width'));
				
			//console.log(left);
			}
			
			//line_move跟随鼠标移动
			left = left+"px";
			$(".hot_tab").find(".hot_line").stop().animate({
				"left":left
			},300)
		})

	}
	hot_line();
	
	//hotbrands产品列表
	function hotBrands(){
		
		//通过ajax动态生成产品列表
		
		$.ajax({
			url:"data/hotBrands.json",
			type:"GET",
			success:function(res){
				//console.log(res);//获取json成功
				
				//鼠标滑过hot_tab，动态加载相关图片
				
				//将所有对象提取出来放到obj数组中
				var obj=[];
				
				for(var key in res){
						//console.log(res[key]);
						//obj = res[key];
						//console.log(obj);
						obj.push(res[key])
				}
					//console.log(obj);//[Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8], Array[8]]
					
					//console.log(obj[0][0].url01);//images/hot_pic01.jpg

				//默认显示第一批图片
				var html2 = "";
				var html04="";
					for(var h=0;h<obj[0].length;h++){
						
						//连接字符串
						html2 += '<li><p><img src="'+obj[0][h].url01+'" alt="" /><a href="'+obj[0][h].link+'"><img src="'+obj[0][h].url02+'" alt="" /></a></p></li>';	
						
					}
					html04='<ul>'+html2+'</ul>';
				
					//console.log(html2);
				//将连接好的字符串放到ul中
					
				$("#hot_pic").append(html04);
				top_move();
				//调用移除margin_left函数
					
				removeHotBrandsMargin_left();
					
				$(".hot_tab").children().has("a").mouseenter(function(){
					
					//清空原有的内容
					
					$("#hot_pic").html("");
					
					//console.log($(".hot_tab").children().has("a").length);//获取导航成功
					
					//for循环遍历this.index 的8个对象，定义HTML空对象
					
					var html = "";
					
					var html03="";
					
					for(var j=0;j<obj[$(this).index()].length;j++){
						
						//连接字符串
						html += '<li><p><img src="'+obj[$(this).index()][j].url01+'" alt="" /><a href="'+obj[$(this).index()][j].link+'"><img src="'+obj[$(this).index()][j].url02+'" alt="" /></a></p></li>';	
						
					}
					html03 ='<ul>'+html+'</ul>';
					//console.log(html);
					//将连接好的字符串放到ul中
					
					$("#hot_pic").append(html03);
					
					//调用移除margin_left函数
					
					removeHotBrandsMargin_left();
					
					//调用控制li运动的函数newArr
					
					top_move();

				})
			}
			
			
		})
		
	}
	hotBrands();
	function removeHotBrandsMargin_left(){
		
			//由于每组图片固定为8张，所有可以不用obj[$(this).index()].length，直接写8即可
			for(var k=0;k<12;k++){
								
				//判断，给左边的li的margin-left:25px；去掉
								
				if(k%4==0){
					$("#hot_pic").find("li").eq(k).css("margin-left","0");
									
				}
		
			}
		}
		
		function top_move(){
			//鼠标滑过position_top 由0--150
			
			$("#hot_pic").find("p").mouseenter(function(){
				//console.log(1);//测试通过
				
				$(this).stop().animate({
					
					"top":"-150px"
				})
			})
			//鼠标滑出position_top 由-150-0
			$("#hot_pic").find("p").mouseleave(function(){
				//console.log(1);//测试通过
				
				$(this).stop().animate({
					
					"top":"0px"
				})
			})
		}
		
	
})
