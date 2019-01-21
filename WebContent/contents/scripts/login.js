var name = ""; 
var pwd = "";

$("#btn-login").click(function() {
	if(checkParameter())
	{
		callApi("ServletLogin");
	}
});


function checkParameter(){
	name = $("#username").val() != null? $("#username").val() : false;
	pwd = $("#password").val() != null? $("#password").val() : false;
	if(name && pwd){
		console.log(name,pwd);
		return true;
	}else 
	{
		return false;
	}
}


$("input").click(function(){
	$(".row-error").remove();
})
function callApi(apiName){

	$.post(apiName,
			{
		"idLogin":name,
		"passwordUtente":pwd},
		function(data)
		{
			console.log(data);
			if(data == "true"){
				// similar behavior as clicking on a link
				window.location.href = "./homepage.jsp";
			}else{
				if($(".row-error"))
				{
					$(".row-error").remove();
				}
				else
				{console.log("Error");
				var div = document.createElement("div");
				$(div).addClass("row text-center row-error");
				var texterror = document.createElement("span");
				$(texterror).addClass("error col-12 text-center");
				$(texterror).text("Errore username e/o password");
				$(div).append(texterror);
				$(".login-form").append(div);
				}
			}
		}).fail(function(data){
			alert("Errore nel login");
		});
}