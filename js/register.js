$(function(){
	//判断是否符合注册条件，如果符合则注册，否则不能

	$(".submit").click(function(){

		//console.log(1);//点击事件成功

			//调用ajax注册
			
			var $phone_num = $(".phone_num").val();
			
			var $password  = $(".password").val();

			$.ajax({
				
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				
				type:"GET",
				
				data:{
					status:"login",
					userID:$phone_num,
					
					password:$password
				},
				success:function(res){
					console.log(res);
					switch(res){
						case "0":alert_no_02();break;
						case "2":alert_no_01();break;
						default:default_no_03();
						
					}

				},
				error:function(res){
					console.log(2);
				}
				
			})//ajax调用结束
			
			//用户名不存在调用函数
			
			function alert_no_01(){
					$("#z_index_10").css("display","block");
				setTimeout(function(){
					$("#z_index_10").css("display","none");
				},3000)
			}
			
			//用户名或密码错误调用函数
			
			function alert_no_02(){
					$("#z_index_11").css("display","block");
				setTimeout(function(){
					$("#z_index_11").css("display","none");
				},3000)
			}
			
			//默认情况下调用函数
			
			function default_no_03(){
				
				var userName = $(".phone_num").val();
				//console.log(userName);//测试通过，获取手机号成功；
				$.cookie("userName",userName);
				
				window.location.href="index.html";//注册成功跳转到主页
			}
			


	})
	
	//鼠标在input上聚焦时边框变色
	
	$("form").find(".mOver").focus(function(){
		
		//console.log(1);//测试通过
		
		$(this).css({
			"box-shadow": "0px 0px 9px -1px #F9A0B4",
    		"border": "1px solid #F9A0B4"
		})
	})
	
	//鼠标在input上失去焦点时边框变色
	
	$("form").find(".mOver").blur(function(){
		
		//console.log(1);//测试通过
		
		$(this).css({
			"box-shadow": "none",
    		"border":"1px solid #ccc"
		})
	})
	
	
})
