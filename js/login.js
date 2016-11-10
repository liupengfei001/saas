//登录界面表单验证
$(function(){
	
	//console.log(1);//jq调用成功
	var juddge01=juddge02=juddge03=juddge04 =juddge05= false;
	$(".phone_num").blur(function(){
		var $phone_num = $(".phone_num").val();
		
		//console.log(2);//事件OK
		
		//验证邮箱或者手机号，最少5个字符
		
		var reg01 = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;//邮箱
		
		var reg02 = /^1[3|4|5|7|8]\d{9}$/;//手机号
		
		if(reg01.test($phone_num) || reg02.test($phone_num)){
			
			console.log("邮箱或者手机号正确");
			
			$("#po_phone_num").css("display","none");
			
			juddge01 = true;
		}else{
			
			$("#po_phone_num").css("display","block");
			
			juddge01 = false;
		}
		
		
	})
		
	//验证密码
	
	$(".password").blur(function(){
		
		//console.log(1);//事件通过
		
		var $password  = $(".password").val();
		
		var reg03      = /^\w{6,16}$/;
		
		if(reg03.test($password)){
			
			console.log("邮箱或者手机号正确");
			
			juddge02 = true;
			
			$("#po_password").css("display","none");
		}else{
			
			$("#po_password").css("display","block");
			
			juddge02 = false;
		}
		
	})
	
	//判断前后两次密码是否一致
	
	$(".again_p").blur(function(){
		
		//console.log(1);//事件通过
		
		var $again_p  = $(".again_p").val();
		
		var reg04     = $(".password").val();
		
		if(reg04 !="" && reg04 == $again_p){
			
			console.log("密码与确认密码相符");
			
			juddge03 = true;
			
			$("#po_again_p").css("display","none");
		}else{
			
			$("#po_again_p").css("display","block");
			
			juddge03 = false;
		}
		
	})
	
	//随机生成验证码
	
	function randomNum(){
		
		var str;//定义局部变量，供判断使用
		
		function randomCallback(){
			
			str="";
			
			var ranDom = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			
			//取出4位放到验证码位置

			for(var i = 0; i < 4; i++){//将验证码限制为4位
	
				str += ranDom[Math.round(Math.random()*61)];
	
			}
			//console.log(str);//测试通过可以产生4位随机字符
			
			$("#code").html(str);
			
			//console.log($("#code").html(str));
			
		}
		randomCallback();
		
		//点击更换验证码
	
		$(".po_form_act").find("a").click(function(){
			
			//console.log(1);//点击事件测试通过
			
			randomCallback();//调用函数生成验证码
		
		})
		
		//鼠标离开时判断填写是否正确
		
		$('.form_act').blur(function(){
			
			//console.log(1);//事件通过
			
			var $form_act  = $(".form_act").val();
			
			if(str == $form_act){
				
				console.log("验证码正确");
				
				juddge04=true;
				
				$("#form_act").css("display","none");
			}else{
				
				randomCallback();
				
				$("#form_act").css("display","block");
				
				juddge04 = false;
			}
		})
	}
	
	randomNum();
	
	
	//判断是否符合注册条件，如果符合则注册，否则不能

	$(".submit").click(function(){

		//console.log(1);//点击事件成功
		
		//判断
		
		if(juddge01 && juddge02 &&juddge03 &&juddge04 &&$('input[type=checkbox]').is(':checked')){
			//$("#position_form").has("id").css("display","none") && $("input[checked=checked]")
			//调用ajax注册
			
			var $phone_num = $(".phone_num").val();
			
			var $password  = $(".password").val();

			$.ajax({
				
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				
				type:"POST",
				
				data:{
					status:"register",
					userID:$phone_num,
					
					password:$password
				},
				success:function(res){
					console.log(res);
					switch(res){
						case "0":alert("用户名重名");break;
						case "1":alert("注册成功");window.location.href="login.html";break;//注册成功跳转到登录页
						case "2":alert("数据库报错");break;
						default:alert(res);
					}
					
				},
				error:function(res){
					console.log(2);
				}
				
			})//ajax调用结束
		}else{
			alert("请认真填写");
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
