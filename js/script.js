//define data
var list = new Array("陈瑞峰","王一鹤","陈瑞","潘琼怡","孙继超","唐洋","上官福豪","金雪璐","孙敉","林意桥","刘雨","王宇韬","李家城","杨云平","周星辰","李欣语","孔益萍","严玉棋","尹婷","朱圣日美","詹思成","张亦驰","杨珖","李昊","戴凯奇","高泊宁","冯思睿","钱晨辉","曹舜","汪羿","潘启桢","黄羽众","林津玮","林思远","申正","郭磊","吴镓成","沈捷","朱旺达","徐轶文","杨玲","诸葛熹","程冬筱","舒婷","李江纯","黄轶群","戴泳","林丹燕 ","吴晓亮","李则慧","许琢璞","洪意涵","吴佳阳");
var groups = 9;
//data area end.
var members=list.length;
var i=row=col=0;
//init groupmap to global var
var groupmap = new Array();
for(row=0; row<groups; row++){
	groupmap[row] = new Array();
}
$(document).ready(function(){
	//init put order
	var order = new Array();
	for(i=0; i<members; i++){
		order[i]=i;
	}
	//random
	for(row=0; row<5; row++){
		order.sort(function(){  
    		return Math.random()-0.5;  
		});
	}	
	//start put
	row=col=0;
	for(i=0; i<members; i++){
		groupmap[row++][col] = list[order[i]];
		if(row>=groups){
			row-=groups;
			col++;
		}
	}
	var done=0;
	$("#start").click(function(){
		if(done == 1){
			alert("已经分组了哦");	
		} else{
			row=col=0;
			done=1;
			handle=setInterval(function(){
				$("#group"+row).append("<li><a class='target'>" + groupmap[row][col++] + "</span></li>");
				$(".target").slideDown(250);
				if(col>=groupmap[row].length){
					col=0;
					row++;
					if(row>=groups){
						clearInterval(handle);
					}
				}
			},300);
		}
	});
});