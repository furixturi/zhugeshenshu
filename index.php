<?php
	$result = "";
	if(isset($_POST["result"]) && isset($_POST["newGua"])){
		$result = $_POST["result"];
		$newGua = $_POST["newGua"];
	}
?>
<!doctype html>
<html lang="zh-CN">
	<meta content="text/html; charset=utf8" http-equiv="Content-Type">
	<head>
		<title>周易未来预知</title>
		<style>
			body {
				width: 400px;
				margin: 0px auto;				
				text-align: center;
				font-family: sans-serif;
				font-size: 12px;
			}
			
			h1 {
				font-size: 16px;
				height: 50px;
				line-height: 60px;
				display: inline-block;
				font-weight: normal;
				padding: 10px 0 0px 70px;
				margin-left: -50px;
				background: url("bagua1.gif") 0 10px no-repeat;
			}
			
			#explain {
				margin: 30px 0;
				text-align: left;
			}
		</style>
	</head>
	<body>
		<h1>周易未来预知</h1>
		<p>《周易测事》取自汉蜀诸葛武侯著，浙南刘伯温批的《未来预知术》<br/>
  古人行事，践行为主，占卦辅之，以防不测，即谓之人算不如天算也。</p>
		<form method="post">
			<input type="button" id="btn1" value="1"/>
			<input type="button" id="btn2" value="2"/>
			<input type="button" id="btn3" value="3"/>
			<input type="text" id="result" name="result" maxlength="3" />
			<input type="hidden" id="newGua" name="newGua" />
			<input type="submit" value="submit"/>
		</form>
		<div id="explain"><?php echo '<a href="http://jrs.myweb.hinet.net/Y'.$newGua.'.htm" target="_blank">'.$result.'</a>'; ?></div>
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript">
			(function($){
				var gua = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"],
					result = "",
					sequenceAlert = "请按顺序 1，2，3 点按！";
				$("#btn1, #btn2").click(function(){
					$(this).attr("disabled", "disabled");
					if($("#btn1").attr("disabled")){
						var newGua = Math.floor(Math.random()*8);
						$(this).data("gua", newGua+1);
						result += gua[newGua];
						$("#result").val(result);
					}else{
						alert(sequenceAlert);
						$(this).removeAttr("disabled");
					}
				});
				$("#btn3").click(function(){
					$(this).attr("disabled", "disabled");
					if($("#btn1").attr("disabled") && $("#btn2").attr("disabled")){
						var newYao = Math.ceil(Math.random()*6);
						$(this).data("yao", newYao);
						result += newYao;
						$("#result").val(result);
						$("#newGua").val($("#btn1").data("gua"));
					}else{
						alert(sequenceAlert);
						$(this).removeAttr("disabled");
					}
				});
				$("input[type=submit]").click(function(){
				});
			})(jQuery);
		</script>
	</body>
</html>