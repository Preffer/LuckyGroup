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

var list=eval("strJson");
var minMember = 5;
var members = list.length;

//date define end. 

var countMan=countWoman=countArt=countTech=countcultural=0;

function showAll(){
	var i,para,node,prev;

	for(i=0; i<=list.length; i++){
		list[i].gender == "man" ? countMan++ : countWoman++;
		if(list[i].major == "art"){
			countArt++;
		} else{
			if(list[i].major == "tech"){
				countTech++;
			}
			else {
				countcultural++;
			}
		}
		prev = document.getElementById("head");
		para = document.createElement("p");
		node = document.createTextNode("N0." + i + " " + list[i].name + " " + list[i].gender + " " + list[i].major + " " + "Man:" + countMan + " " + "Woman:" + countWoman + " " + "Art:" + countArt + " " + "Tech:" + countTech + " " + "cultural:" + countcultural);
		para.appendChild(node);
		prev.appendChild(para);
		prev=para;
	};
};
	
function group(){
	//group members control
	var groups,remain,i,r;
	groups = Math.floor(members / minMember);
	remain = members % minMember;
	if(remain)groups++;
	var eachGroup = new Array();
	for(i = 1; i <= groups; i++){
		eachGroup[i] = minMember;
	}
	for(i = 1; i <= remain; i++){
		r = Math.floor(Math.random()*(groups-1)) + 1;
		if(eachGroup[r] - minMember){
			i--;
		}else{
			eachGroup[r]++;
		}
	}
	//group woman control
	var eachWoman = new Array();
	var minWoman = Math.floor(countWoman / groups);
	var remain = countWoman % groups;

	for(i = 1; i <= groups; i++){
		eachWoman[i] = minWoman;
	}
	for(i = 1; i <= remain; i++){
		r = Math.floor(Math.random()*(groups-1)) + 1;
		if(eachWoman[r] - minWoman){
			i--;
		}else{
			eachWoman[r]++;
		}
	}
	//group art control
	var eachArt = new Array();
	var minArt = Math.floor(countArt / groups);
	var remain = countArt % groups;

	for(i = 1; i <= groups; i++){
		eachArt[i] = minArt;
	}
	for(i = 1; i <= remain; i++){
		r = Math.floor(Math.random()*(groups-1)) + 1;
		if(eachArt[r] - minArt){
			i--;
		}else{
			eachArt[r]++;
		}
	}
	//group cultural control
	var eachCultural = new Array();
	var minCultural = Math.floor(countcultural / groups);
	var remain = countcultural % groups;

	for(i = 1; i <= groups; i++){
		eachCultural = minCultural;
	}
	for(i = 1; i <= remain; i++){
		r = Math.floor(Math.random()*(groups-1)) + 1;
		if(eachCultural[r] - minArt){
			i--;
		}else{
			eachCultural[r]++;
		}
	}
	//start group
	var user = new Array();
	for(i = 0; i < members; i++){
		user[i] = 1;
	}

	var groupmap = new Array();
	for(i = 1; i <= groups; i++){
		groupmap[i] = new Array();
		groupmap[i][10] = groupmap[i][11] = groupmap[i][12] = groupmap[i][13] = 0;
	}
	//start put
	var step,record;
	r = 0;
	for(i = 1; i <= groups; i++){
		while(groupmap[i][10] < eachGroup[i]){
			r++;
			r = r % (members+1);
			if(user[r]){
				if((list[r].gender == "woman") && (groupmap[i][11] == eachWoman[i]))continue;
				if((list[r].major == "art") && (groupmap[i][12] == eachArt[i]))continue;
				if((list[r].major == "cultural") && (groupmap[i][13] == eachCultural[i]))continue;
				groupmap[i][10]++;
				groupmap[i][groupmap[i][10]] = r;
				if(list[r].gender == "woman")groupmap[i][11]++;
				if(list[r].major == "art")groupmap[i][12]++;
				if(list[r].major == "cultural")groupmap[i][13]++;
				user[r] = 0;
			}
		}
	}
	alert("200");
}
