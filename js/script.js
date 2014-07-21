'use strict';

/* js wirte for LuckyGroup
 * design and code by Yuzo
 */
 $(function() {
	$('#chooseButton').click(function(){
		$('#fileButton').click();
	});
	var handle;
	$('#groupRange').mousedown(function(){
		handle=setInterval(function(){
			updateRange()
		},100);
	})
	$('#groupRange').mouseup(function(){
		clearInterval(handle);
	})
	$('#slogan').click(function(){
		//$('html, body').scrollTo(1000);
		makeGroup();
	});
});

function getFileContent(file){
	//console.log(file[0]);
	var reader = new FileReader();
	reader.onload = function(event) {
		window.nameList = reader.result.split("\n");
		//console.log(nameList);
		var last = nameList.pop()
		//console.log(last.length);
		if(last.length){
			window.nameList.push(last);
		}
		//console.log(nameList);
		$('#groupRange').attr('max', Math.ceil(window.nameList.length/2));
		$('#fileName').html('Source file: ' + file[0].name);
		$('#total').html('<b>' + window.nameList.length +'</b> people in total');
		updateRange();
		$('#rangeChooser').animate({
			opacity: 1
		}, 1500);
	}
	reader.readAsText(file[0]);
}
function updateRange(){
	$('#group').html('<b>' + $('#groupRange').val() +'</b> groups');
	$('#upto').html('up to <b>' + Math.ceil(window.nameList.length/($('#groupRange').val())) + '</b> people in each group')
}
function makeGroup(){
	window.nameList.sort(function(){  
    	return Math.random()-0.5;  
	});
	//console.log(nameList);
	var html = '';
	//use hack there, that btnClass actually start from [1], due to i%5+1 method
	var btnClass = ['', 'btn-info', 'btn-success', 'btn-warning', 'btn-danger'];
	for(var i = 1; i <= $('#groupRange').val(); i++){
		html += '<ul id="group' + i + '"><li><a class="btn ' + btnClass[i%4 + 1] +'">第' + i + '组</a></li></ul><br />';
	}
	$('.pagination').html(html);
	//init put order
	var order = new Array();
	for(var i = 0; i < window.nameList.length; i++){
		order[i]=i;
	}
	//random
	order.sort(function(){  
    	return Math.random()-0.5;  
	});
	//start put
	var groupmap = new Array();
	var row, col;
	for(row = 1; row <= $('#groupRange').val(); row++){
		groupmap[row] = new Array();
	}
	//console.log(order);
	row = col = 1;
	for(var i = 0; i < window.nameList.length; i++){
		//console.log(i, window.nameList[order[i]]);
		groupmap[row++][col] = window.nameList[order[i]];
		if(row > $('#groupRange').val()){
			row = 1;
			col++;
		}
	}
	console.log(groupmap);
	row = col = 1;
	var handle=setInterval(function(){
		$("#group"+row).append("<li><a class='target btn btn-primary'>" + groupmap[row][col++] + "</span></li>");
		$(".target").slideDown(250);
		if(col >= groupmap[row].length){
			col=1;
			row++;
			if(row > $('#groupRange').val()){
				clearInterval(handle);
			}
		}
	},300);
}