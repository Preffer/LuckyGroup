'use strict'
$ ->
	$('#chooseButton').click ->
		$('#fileButton').click()
	
	handle = null
	$('#groupRange').mousedown ->
		handle = setInterval ->
			updateRange()
		, 100

	$('#groupRange').mouseup ->
		clearInterval(handle)

	$('#slogan').click ->
		$('html,body').animate
			scrollTop: window.innerHeight * 0.8
		, 400
		makeGroup()

window.getFileContent = (file) ->
	reader = new FileReader()
	reader.onload = ->
		window.nameList = reader.result.split("\n")
		last = nameList.pop()
		window.nameList.push(last) if last.length

		$('#groupRange').attr('max', Math.ceil(window.nameList.length / 2))
		$('#fileName').html("Source file: #{file[0].name}")
		$('#total').html("<b>#{window.nameList.length}</b> people in total")
		
		updateRange()
		
		$('#rangeChooser').animate
			opacity: 1
		, 1500

	reader.readAsText(file[0])

updateRange = ->
	$('#group').html("<b>#{$('#groupRange').val()}</b> groups")
	$('#upto').html("up to <b>#{Math.ceil(window.nameList.length / ($('#groupRange').val()))}</b> people in each group")

makeGroup = ->
	window.nameList.sort ->
		return Math.random() - 0.5

	#use hack there, that btnClass actually start from [1], due to i%5+1 method
	btnClass = ['', 'btn-info', 'btn-success', 'btn-warning', 'btn-danger']
	rowLimit = $('#groupRange').val()
	html = ''
	for i in [1..rowLimit]
		html += "<ul id=\"group#{i}\"><li><a class=\"btn #{btnClass[i%4 + 1]}\">第#{i}组</a></li></ul><br />"
	
	$('.pagination').html(html)
	
	#init put order & random
	order = [0...window.nameList.length]
	order.sort ->
		return Math.random() - 0.5
	
	#start put
	groupmap = []
	for row in [1..rowLimit]
		groupmap[row] = []

	row = col = 1
	for i in [0..window.nameList.length]
		groupmap[row++][col] = window.nameList[order[i]]
		if row > rowLimit
			row = 1
			col++

	row = col = 1
	handle = setInterval ->
		$("#group#{row}").append("<li><a class='target btn btn-primary'>#{groupmap[row][col++]}</span></li>")
		$(".target").slideDown(250)
		if col >= groupmap[row].length
			col = 1
			row++
			if row > rowLimit
				clearInterval(handle)
	, 300