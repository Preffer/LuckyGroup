//define data
var strJson = [
	{"name":"陈瑞峰","gender":"man","major":"art"},
	{"name":"王一鹤","gender":"woman","major":"art"},
	{"name":"陈瑞","gender":"man","major":"art"},
	{"name":"潘琼怡","gender":"woman","major":"art"},
	{"name":"孙继超","gender":"man","major":"art"},
	{"name":"唐洋","gender":"man","major":"art"},
	{"name":"上官福豪","gender":"man","major":"art"},
	{"name":"金雪璐","gender":"woman","major":"art"},
	{"name":"孙敉","gender":"woman","major":"cultural"},
	{"name":"林意桥","gender":"woman","major":"cultural"},
	{"name":"刘雨","gender":"woman","major":"cultural"},
	{"name":"王宇韬","gender":"woman","major":"cultural"},
	{"name":"李家城","gender":"man","major":"cultural"},
	{"name":"杨云平","gender":"woman","major":"tech"},
	{"name":"周星辰","gender":"man","major":"tech"},
	{"name":"李欣语","gender":"woman","major":"art"},
	{"name":"孔益萍","gender":"woman","major":"tech"},
	{"name":"严玉棋","gender":"woman","major":"tech"},
	{"name":"尹婷","gender":"woman","major":"tech"},
	{"name":"朱圣日美","gender":"woman","major":"art"},
	{"name":"詹思成","gender":"man","major":"tech"},
	{"name":"张亦驰","gender":"man","major":"tech"},
	{"name":"杨珖","gender":"man","major":"tech"},
	{"name":"李昊","gender":"man","major":"tech"},
	{"name":"戴凯奇","gender":"man","major":"tech"},
	{"name":"高泊宁","gender":"man","major":"art"},
	{"name":"冯思睿","gender":"man","major":"tech"},
	{"name":"钱晨辉","gender":"man","major":"tech"},
	{"name":"曹舜","gender":"man","major":"tech"},
	{"name":"汪羿","gender":"woman","major":"tech"},
	{"name":"潘启桢","gender":"man","major":"tech"},
	{"name":"黄羽众","gender":"man","major":"tech"},
	{"name":"林津玮","gender":"man","major":"tech"},
	{"name":"林思远","gender":"man","major":"tech"},
	{"name":"申正","gender":"man","major":"art"},
	{"name":"郭磊","gender":"man","major":"tech"},
	{"name":"吴镓成","gender":"man","major":"tech"},
	{"name":"沈捷","gender":"woman","major":"cultural"},
	{"name":"朱旺达","gender":"man","major":"art"}
];
var groups=6;
//data area end.
var list=eval("strJson");
var members=list.length;
var i,t;

//init groupmap to global var
var groupmap = new Array();
for(i=0; i<groups; i++){
	groupmap[i] = new Array();
}
$(document).ready(function(){
	//init put order
	var order = new Array();
	for(i=0; i<members; i++){
		order[i]=i;
	}
	//random
	for(i=0; i<5; i++){
		order.sort(function(){  
    		return Math.random()-0.5;  
		});
	}	
	//start put
	var row,col;
	row=col=0
	for(i=0; i<members; i++){
		groupmap[row][col] = list[order[i]].name;
		row++;
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
			for(i=0; i<groups; i++){
				for(t=0; t<groupmap[i].length; t++){
					setTimeout(function(){
						alert(i + " " + t);
						$("#group"+i).append("<li><a class='target'>" + groupmap[i][t] + "</span></li>");
						$(".target").slideDown(500);
					},500);
				}
			}
			done=1;
		}
	});
});