var answers; //题目
var myquestion={};
var $layer = {
	msg: function(content) {
		layer.open({
			skin: 'msg',
			content: content,
			time: 2
		});
	},
	open: function(content, e) {
		//信息框
		layer.open({
			content: content,
			btn: ['确定', '取消'],
			yes: function(index) {

				layer.close(index);
				e();
			}
		});
	}
}
var tools = {
	close: function(event) {
		$(event).parents().find(".dig").hide();
	},
	show: function(s) {
		$(s).show();
		$.getJSON("json/answer-sm.json", function(res) {
			$(s).find("p").html("").append(res.content);
		});
	},
	getgamesm: function(select) {
		$.getJSON("json/answer-sm.json", function(res) {
			$(select).html("").append(res.content);
		});
	},
	getgameanswer: function(select) {
		var swiper = new Swiper('.question', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			watchSlidesProgress: true,
			paginationType: "fraction",
			onSlideChangeStart: function(swiper) { //改变题目 事件
				$("#tmanswer .answer").html("").append(answers.answer[swiper.activeIndex].title);
				//$layer.msg(answers.answer[swiper.activeIndex].title);
				$("#thisquestionid").val(swiper.activeIndex);
				//alert(answer.answer[swiper.activeIndex]) //切换结束时，告诉我现在是第几个slide
			}
		});
	},
	gopage: function(select) {
		$.mobile.go(select);
	},
	gopage: function(select, show) {
		$.mobile.go(select, show);
	},
	startgame: function() {
		localStorage.setItem("page", 1);
		$.mobile.changePage("#yxcontent", "pop");
	}
}
paceOptions = {
	ajax: false, // disabled 
	document: false, // disabled 
	eventLag: false, // disabled 
	elements: {
		selectors: ['body']
	}
};

$(function() {
	//tools.gopage("#yxstart","A");
});

$(document).on("pageinit", "#yxstart", function() { //第一个页面初始化事件
	//定义上级页面
	localStorage.setItem("page", 0);

});
$(document).on("pageinit", "#yxsm", function() {
	//游戏说明
	if(localStorage.getItem("page")) {
		console.log(localStorage.getItem("page"))
	} else {
		console.log(localStorage.getItem("page"))
	}
	var $sel = $(".hdsm").find("p");
	tools.getgamesm($sel);
})
$(document).on("pageinit", "#yxcontent", function() { //第二页面初始化加载
	if(localStorage.getItem("page") == 0) {
		$.mobile.changePage("#yxstart", "pop");
	}

	$.getJSON("json/answer.json", function(res) {
		answers = res;
		for(var i = 0; i < answers.answer.length; i++) {
			var questionlist = "<div class='swiper-slide' index='" + i + "'><ul><li> <p><mark>A</mark>" + res.answer[i].question.A + "</p></li><li> <p><mark>B</mark>" + res.answer[i].question.B + "</p></li>" +
				"<li ><p><mark>C</mark>" + res.answer[i].question.C + "</p></li><li><p><mark>D</mark>" + res.answer[i].question.D + "</p></li><ul></div>";
			//console.log(questionlist);
			$("#yxcontent").find(".question .swiper-wrapper").append(questionlist);
			myquestion[res.answer[i].TM]="" ;
		}
	
		$("#yxcontent").find(".question .swiper-wrapper").find("div li").click(function() {
			$(this).addClass("active").siblings().removeClass("active");
		//	$layer.msg($(this).find("mark").html());
			answers.answer[parseInt($("#thisquestionid").val())].Select = $(this).find("mark").html();
			
			myquestion[answers.answer[parseInt($("#thisquestionid").val())].TM]=$(this).find("mark").html();
			//$layer.msg(JSON.stringify(myquestion));
		console.log(myquestion)
			
			
		});
		$("#tmanswer .answer").html("").append(answers.answer[0].title);
		
	});
	$("#question li").on("tap", function() {
		$layer.msg($(this).attr("val"));
		document.querySelector("#selectVal").value = $(this).attr("val");
		$(this).addClass("select").siblings().removeClass("select");
	});
	
	$('#yxcontent').live('pageshow', function(event, ui) {
		tools.getgameanswer("#yxcontent");
	});

	//alert("第二页面被加载")

	//$.mobile.changePage("#yxstart", "slideup");
	//		layer.open({
	//			content: "非正常加载，请前往欢迎页面!",
	//			btn: ['确定'],
	//			yes: function(index) {
	//				layer.close(index);
	//				$.mobile.changePage("#yxstart", "slideup");
	//			}
	//		});
});