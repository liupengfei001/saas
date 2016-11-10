$(function (){

function productList_banner(){
	
//	手风琴banner	

	//定义变量计数
		
	var count = 0;
		
	var timer;
	
	//鼠标划入
	
	$(".pro_list_banner").children().children().mouseenter(function(){
		
		clearInterval(timer);
		
		//鼠标划上时，宽度675，兄弟节点83；（current）
		
		$(this).stop().animate({
			
			"width":"675px",
			
			"opacity":"1"
		}).siblings().stop().animate({
			
			"width":"82px",
			
			"opacity":"0.5"
		})
		
		//鼠标滑过时透明广告出现，移出时消失，透明渐变
		
		$(this).find(".pro_li_banner_ad").stop().animate({
			
			"opacity":"1"
		})
		$(this).siblings().find(".pro_li_banner_ad").stop().animate({
			
			"opacity":"0"
		})
		
		count = $(this).index();
		
		autoplay_proList_banner();
	})
	
	//默认情况下li依次展示
	
		
		
	function autoplay_proList_banner(){
		
		//设置定时器
		
		clearInterval(timer);
		
		timer = setInterval(function timers(){
			
			
		
			if(count == $(".pro_list_banner").children().children().length-1){
				
				count =0;
				
			}else{
				
				count++;
			}
			
			//添加class前将所有的li的class名移除
			
			$(".pro_list_banner").children().children().removeClass();
			
			//为当前的li添加class名current_pic
			
			$(".pro_list_banner").children().children().eq(count).addClass("current_pic");
			
			
			//名字为current_pic的li运动
			
			$(".current_pic").stop().animate({
			
				"width":"675px",
				
				"opacity":"1"
				
			}).siblings().stop().animate({
				
				"width":"82px",
				
				"opacity":"0.5"
			})
			
			
			//鼠标滑过时透明广告出现，移出时消失，透明渐变
		
			$(".current_pic").find(".pro_li_banner_ad").stop().animate({
				
				"opacity":"1"
			})
			$(".current_pic").siblings().find(".pro_li_banner_ad").stop().animate({
				
				"opacity":"0"
			})
				
		},2000)
	}
	
	autoplay_proList_banner();
				
}
productList_banner();


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
clockDate();

function pro_list_tag(){
	
	//获取产品列表的json
	
	$.ajax({
		
		url:"data/pro_list_tag.json",
		
		type:"GET",
		
		success:function(res){
			
			//console.log(res);//测试成功
			
			var html ="";
			
			for( var i=0; i<res.length;i++){
				
				html +='<a href="'+res[i].url+'">'+res[i].tag+'</a>';
			}
			
			//将拼接完成的html插入到导航标签的pro_list_tag中
			
			$("#pro_list_tag").append(html);
		}
	})
}
pro_list_tag();

function pro_list_all_pic(){
	
	//利用ajax动态生成产品列表，添加到“所有商品”的ul中
	
	$.ajax({
		
		url:"data/detailspic.json",
		
		type:"GET",
		
		success:function(res){
			
			//console.log(res);//获取成功
			
			//定义变量
				
			var html ="";
				
			//for 循环，链接字符串
				
			for ( var i=0; i<res.length;i++){

				html +='<li class="limite_children" id="'+res[i].id+'"><a href="'+res[i].link+'"><i class="count"><b>'+res[i].discout+'</b></i><div class="flashscal_pic"><span class="vertical"></span><img src="'+res[i].url+'" alt="'+res[i].alt+'"/></div><div class="scale_price clear"><span class="buy_num">'+res[i].buy_num+'</span><span class="buy_price">'+res[i].buy_price+'</span><span class="buy_del"><del>'+res[i].buy_del+'</del></span></div><div class="flash_info"><div class="des01"><i class="douhao"></i>'+res[i].douhao+'</div><div class="des02">'+res[i].des02+'</div><p class="des03">'+res[i].des03+'</p><p class="des04">'+res[i].des04+'</p><p class="des05"><i class="iconfont clock">&#xe600;</i>剩余	<span class="days"></span>天	<span class="hours"></span>时<span class="minutes"></span>分<span class="second"></span>秒</p></div>	<span class="comeBuy_bg"></span></a></li>';
	
			}
			
			//将字符串放到Limite 的ul中
				
			$("#pro_list_all_pic").append(html);
		}
	})
}
pro_list_all_pic();


function setCookies(){
	
	//实现点击时设置cookies,将点击产品的id存为cookies,并且跳转到购买页面
	
	$("body").on("click",".limite_children",function(){
		
		$.cookie("id",this.id,{expires:3,path:"/"});
		
//		window.location.href = "details.html";
		
		window.open("details.html","_blank");
	})
}
setCookies();
})
