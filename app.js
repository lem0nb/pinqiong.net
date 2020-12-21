/*
 * @Descripttion: 
 * @Author: yumu
 * @Email: 2@33.al
 * @Date: 2020-12-21 17:45:12
 * @LastEditors: yumu
 * @LastEditTime: 2020-12-21 18:52:53
 */
console.clear();
console.log("\n\n\n\n\n\n\n当你凝视深渊的时候,深渊也在凝视你\n [https://33.al] 出品\n复制请保留版权~");
change = function(){
  var contents=['加油','努力赚钱','不要被消灭！','努力活下去','成为最贫穷的人！'];
  var content = contents[Math.floor(Math.random() * contents.length)];
  $("input[name='body']").val(content);
}
changetype = function(){
    $("#amountchose").hide();
    $("#inputtip").hide();
    $("#amountinput").show();
    $("#choseamount").removeAttr("name");
    $("#inputamount").attr("name","amount");
}
check = function(){
    amount = parseFloat($("select[name='amount']").val());
    if(amount>0===false){
         amount=parseFloat($("input[name='amount']").val());
            if(amount>0===false){
                alert("请选择正确的金额");
                return false;
            } 
    }
    $("form").submit();
}
checkvalue = function(){
	amount = parseFloat($("input[name='amount']").val());
	$("input[name='amount']").val(amount);
}

$.ajax({
      type: "get",
      url: "getdata.php",
      dataType: "json",
      data: {
         "cb":Math.random(),
      },
      async: true,
      success: function(res) {
          if (res.code == 200) {
                html='<h3 class="title">扶贫记录(>=1元的最近5笔)</h3>';
                $.each(res.data, function(index, value) {
                	if(value['mount']>=10){
                		html+="<div class=\"itemred\"><span class=\"price\">￥"+value['mount']+"</span><p class=\"item-name\">"+value['time']+"</p><p class=\"item-description\">来自于<b>"+value['buyer']+"</b>的留言:&nbsp;&nbsp;"+value['mark']+"</p></div>";  
                		
                	}else{
                		html+="<div class=\"item\"><span class=\"price\">￥"+value['mount']+"</span><p class=\"item-name\">"+value['time']+"</p><p class=\"item-description\">来自于"+value['buyer']+"的留言:&nbsp;&nbsp;"+value['mark']+"</p></div>";  
                	}
                                
                
              });
                html+='<div class="total">小计<span class="price">￥'+res['total']+'</span></div>';
                $(".products").html(html);
                html='共收到来自['+res['diff_buyer']+']位大爷的打赏，人民币金额共计['+res['total_money']+']元。您的每次付出，我们皆有记录！如果您在打赏后没有记录，请反馈给我们。由于贫穷，现特价出售本站备用域名[pinqiong.cc]，有意者请发送邮件到<img src="https://cdn.jsdelivr.net/gh/pic-cdn/cdn1@master/2020/01/13/284840575cfc5db9038baf8a6a37a132.png"。源码下载请到 https://github.com/yumusb/pinqiong.net>';
                $(".total1").html(html);

          } else {
            html='<h3 class="title">扶贫记录加载失败</h3>';
              $(".products").html();
          }

      },
      error: function(a) {
              html='<h3 class="title">扶贫记录加载失败</h3>';
              $(".products").html();        

      }
});    