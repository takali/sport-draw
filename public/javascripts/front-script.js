$( function() {

	var host = 'http://localhost:3000';
	
		var socket = io(host);
		
		socket.on('moveTeam', function (data) {
			moveTeamEasy(data, socket);
		});

	function removeTeam(data){
		
	}

	function moveTeamEasy(data, socket){
		
		var position = data.position - 1;
		var source   = $(".country[data-id='" + data.code + "']");
		
		var target   = $(".group[data-key='" + data.group + "'] .item:eq("+position+")");
		var sourceC = source.html();
		sourceC = '<span class="helper"></span>'+sourceC;
		target.append(sourceC);
		source.addClass("animated");
		target.addClass("animated");
	}

	function removeTeamEasy(data){
		
	}

	// https://codepen.io/ThibaultJanBeyer/pen/RRPQEX
} );