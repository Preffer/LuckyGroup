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
});

function getFileContent(file){
	//console.log(file[0]);
	var reader = new FileReader();
	reader.onload = function(event) {
		var nameList = reader.result.split("\n");
		//console.log(nameList);
		var last = nameList.pop()
		//console.log(last.length);
		if(last.length){
			nameList.push(last);
		}
		//console.log(nameList);
		window.peopleCount = nameList.length;
		//console.log(peopleCount);
		$('#fileName').html('Source file: ' + file[0].name);
		$('#total').html('<b>' + window.peopleCount +'</b> people in total');
		updateRange();
		$('#rangeChooser').animate({
			opacity: 1
		}, 1500);
	}
	reader.readAsText(file[0]);
}
function updateRange(){
	$('#group').html('<b>' + $('#groupRange').val() +'</b> groups');
	$('#upto').html('up to <b>' + Math.ceil(window.peopleCount/($('#groupRange').val())) + '</b> people in each group')
}