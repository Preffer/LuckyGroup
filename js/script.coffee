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
		$('#fileName').html("Source file: <b>#{file[0].name}</b>")
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
	groups = $('#groupRange').val()
	html = ''
	for i in [1..groups]
		html += "<ul id='group#{i}'><li><a class='btn #{btnClass[i%4 + 1]}'>第#{i}组</a></li></ul><br />"
	
	$('.pagination').html(html)
	
	#writing to groupMap
	groupMap = []
	for row in [1..groups]
		groupMap[row] = []

	row = col = 1
	for i in [0..window.nameList.length]
		groupMap[row++][col] = window.nameList.pop()
		if row > groups
			row = 1
			col++

	row = col = 1
	handle = setInterval ->
		$("#group#{row}").append("<li><a class='target btn btn-primary'>#{groupMap[row][col++]}</span></li>")
		$(".target").slideDown(250)
		if col >= groupMap[row].length
			col = 1
			row++
			if row > groups
				clearInterval(handle)
	, 300