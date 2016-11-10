$(function(){
	
	
//放大镜
function fangdajing(){
	//获取元素
	var $fangdajing_mask  = $(".fangdajing_mask");
	
	var $fangdajing		  = $(".fangdajing");
	
	var $pic_big_mask     = $(".pic_big_mask");
	
	var $pic_big          = $(".pic_big"); 
	
	//获取鼠标在左侧图片上的位置
	
	$fangdajing_mask.mousemove(function(event){
		
		//console.log(1);//测试通过
		
		event = event || window.event;
		
		//鼠标的位置
		
		var left = event.offsetX - $fangdajing.width()/2;
		
		var top  = event.offsetY - $fangdajing.height()/2;
		
		//console.log(left);//测试通过

		//不让放大镜超出遮罩
		
		//定义变量，posx,posy,确定放大镜移动到右侧的宽度和高度
		
		var posx  =  $fangdajing_mask.width() - $fangdajing.width();
		
		var posy  =  $fangdajing_mask.height() - $fangdajing.height();
		
		left = left < 0    ? 0    : left ;
		
		left = left > posx ? posx : left ;
		
		top  = top  < 0    ? 0    : top  ;
		
		top  = top  > posy ? posy : top  ;
		
		//鼠标移动时，让透明放大镜的left和top等于鼠标位置
		
		$fangdajing.css({
			
			"left":left,
			
			"top" :top 
		});

		//让右侧图片跟随鼠标一起移动
		
		var  proLeft = left / posx ;
		
		var  proTop  = top  / posy ;
		
		$pic_big_mask.css({
			
			"left" : - proLeft * ($pic_big_mask.width()  - $pic_big.width()),
			
			"top"  : - proTop  * ($pic_big_mask.height() - $pic_big.height()),
		})
		
		
		
	})
	//鼠标划过左侧图片时，放大镜出现,大图出现
		
		$fangdajing_mask.mouseenter(function(){
			
			$fangdajing.css("display","block");
			
			$pic_big.css("display","block");
			
		})
		
		//鼠标划出左侧图片时，放大镜，大图消失
		
		$fangdajing_mask.mouseleave(function(){
			
			$fangdajing.css("display","none");
			
			$pic_big.css("display","none");
			
		})
}
fangdajing();



function details_lunbo(){
	
	//详情页主图下面的小图轮播，点击切换
	
	$.ajax({
		url:"data/detailspic.json",
		type:"GET",
		success:function(res){
			
			var idNum="id0001";
			//console.log(res.id0001);//Object {pic01: "images/meidan.jpg", pic_02: "images/meidan.jpg", picArr: Array[6]}
			
			$(".pic").find("img").attr("src",res[idNum].pic01);
			
			//console.log(res.id0001.pic01);//images/meidan.jpg
			
			$(".pic_big").find("img").attr("src",res[idNum].pic01);
			
			//console.log(res[idNum].picArr.length);//6
			
			//定义变量，放字符串
			
			var html = "";
			
			for(var i=0;i<res[idNum].picArr.length;i++){
				
				html +='<li><img src="'+res[idNum].picArr[i]+'" alt="" /></li>';
			}
			
			$(".pro_smallPic").children().html(html);
	
			//点击左按钮,把第一个插到最后一个
			
			$(".forward").children().click(function(){
				
				$(".pro_smallPic").children().append($(".pro_smallPic").children().find("li:first"));
				
			})
			$(".backward").children().click(function(){
				
				$(".pro_smallPic").children().prepend($(".pro_smallPic").children().find("li:last"));
				
			})
			
			//鼠标滑过小图时，将大图和主图替换了
			
			$(".pro_smallPic").children().children().mouseenter(function(){
				
				$(".pic").find("img").attr("src",$(this).children().attr("src"));
				
				$(".pic_big").find("img").attr("src",$(this).children().attr("src"));

				//console.log($(this).children().attr("src"));//测试通过
				$(this).css({
					"border":"5px solid #e5cbb2",
					"margin-top":"0"
				}).siblings().css({
					"border":"1px solid #666",
					"margin-top":"5px"
				});
				
			})
			
			
		}
		

	})
}
details_lunbo();

function xidingdaohang(){
	
	//吸顶菜单
	
	$(window).scroll(function(){
		
		var oTop = $("#pro_main_cont").offset().top - $(document).scrollTop();
		
		//console.log($(".pro_main_cont_nav").offset().top);//窗口中某元素到顶部的距离
		//console.log(oTop);//测试通过
		
		if(oTop <=0){
			
			$(".pro_main_cont_nav").css("position","fixed");
			
		}else{
			
			$(".pro_main_cont_nav").css("position","absolute");
			
		}
	})
	
	//点击参数，详情，评价，页面滑动到相应区域，并且下面线条移动
	
	$(".pro_main_cont_nav").children().find("li:has(a)").click(function(){
		
		if($(this).index() == 0){
			
			$("html,body").stop().animate({
				
				"scrollTop":$(".para").offset().top -50
			
			},function(){
				
				$(".pro_nav_line").css("left",$(".pro_main_cont_nav").children().find("li:first").width()*0)

			})
	
		}
		if($(this).index() == 1){
			
			$("html,body").stop().animate({
				
				"scrollTop":$(".details").offset().top -50 
		
			},function(){
			
				$(".pro_nav_line").css("left",$(".pro_main_cont_nav").children().find("li:first").width()*1)
//				console.log( $(this).index());

			})
		}
		if($(this).index() == 2){
			
			$("html,body").stop().animate({
				
				"scrollTop":$(".reviews").offset().top -50 
			
			},function(){
				
				$(".pro_nav_line").css("left",$(".pro_main_cont_nav").children().find("li:first").width()*2)
								
			})
		}
	})
	
}
xidingdaohang();


function saomaBuy(){
	
	//鼠标滑过，扫码购买的二维码出现
	$(".btn_buy_02").mouseenter(function(){
		
		$(".btn_buy_02").find("img").stop().animate({
			
			"height":"220px",
			"opacity":"1"
		})
		
	})
	
	//鼠标移出，二维码消失
	$(".btn_buy_02").mouseleave(function(){
		
		$(".btn_buy_02").find("img").stop().animate({
			
			"height":"-220px",
			"opacity":"0"
		})
		
	})
}
saomaBuy();

function pro_num(){
	
	//点击按钮实现要购买商品数量的加减，最少为1
	
	var count=$(".pro_num").find("input").val();

	$(".plus").click(function(){
			
			count++;
			
			//console.log(count);
			
			$(".pro_num").find("input").val(count);
			
			//console.log(0);//点击事件成功
			
	})
	
	$(".minus").click(function(){
			
		//console.log(3);//事件测试成功
		
		//判断是否大于1
		console.log(count);
		
		if(count>1){
			
			count--;
			
		}else if(count==1){
			
			$(".tankuang").stop().animate({
					
				"opacity":"1"
					
			},300,function(){
					
				setTimeout(function(){
						
					$(".tankuang").stop().animate({
					
						"opacity":"0"
						
					})
						
				},2000)
			})
			
		}
		$(".pro_num").find("input").val(count);
	})

}
pro_num();


//	分页
	function getMsg(num){
				
				$.ajax({
					url:'data/details.json',
	                type:'GET',
	                dataType:'json',
	                success:function(res){
	                	//console.log(res.length);//111测试通过
	                	var pageNum = Math.ceil(res.length/num);
	                	$("#Pagination").pagination(pageNum, {
		                num_edge_entries: 1,         //两侧显示的首尾分页的条目数
		                num_display_entries: 4, //连续分页主体部分显示的分页条目数
		                prev_text: "&lt;",
		                link_to:"javascript:void(0);",
                        next_text: "&gt;",
                        items_per_page: 1, //每页显示1项
		                callback: function(index){
		                    //alert(index)
		                    var html="";
		                    
		                    for(var i=index*num;i<(index+1)*num;i++){
		                    	if(i<res.length){
		                    		html+='<li><div class="user_text"><i class="iconfont">&#xe603;</i><span>VIP</span><span>'+res[i].userName+'</span></div><div class="user_talk"><i class="iconfont">&#xe613;</i><div class="user_talk_title"><h3 >'+res[i].title+'</h3><span><p>评分</p><ul><li class="iconfont">&#xe615;</li><li class="iconfont">&#xe615;</li><li class="iconfont">&#xe615;</li><li class="iconfont">&#xe615;</li><li class="iconfont">&#xe615;</li></ul></span></div><div class="user_talk_text"><p>'+res[i].reviews+'</p></div><div class="user_date"><span>'+res[i].date+'</span></div></div></li>';
		                    	}
		                    }
		                    $('.reviews_cont').children().html(html);
		                }
		    
						});

	                }
				})
			}
			getMsg(9);//默认显示一页4张图
})
