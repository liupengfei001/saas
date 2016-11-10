function header_callback(){
	
	$(function(){
		
		//console.log(1);//测试通过
		
		//topBar 第一个二级菜单
		
		$(".pos_re_01").mouseover(function(){
			
			$(".pos_ab_01").stop().slideDown(300);
			
			$("#mOver01").css("background","#fff");
			
		})
		$(".pos_re_01").mouseout(function(){
			
			$(".pos_ab_01").stop().slideUp(300);
			
			$("#mOver01").css("background","none");
		})
		
		//topBar 第二个二级菜单
		
		$(".pos_re_03").mouseover(function(){
			
			$(".link").stop().slideDown(300);
			
			$("#mOver02").css("background","#fff");
			
		})
		$(".pos_re_03").mouseout(function(){
			
			$(".link").stop().slideUp(300);
			
			$("#mOver02").css("background","none");
		})
	
		//topbar二级菜单，鼠标滑过出二维码
		
		$(".xinlang").mouseover(function(){
			
			$(".xl").css("display","block");
		})
		$(".xinlang").mouseout(function(){
			
			$(".xl").css("display","none");
		})
		$(".shasha").mouseover(function(){
			
			$(".wx").css("display","block");
		})
		$(".shasha").mouseout(function(){
			
			$(".wx").css("display","none");
		})
		$(".youku").mouseover(function(){
			
			$(".yk").css("display","block");
		})
		$(".youku").mouseout(function(){
			
			$(".yk").css("display","none");
		})
		
		//获取cookie
		
		var getCookie = $.cookie("userName");
		
		
	})
}
