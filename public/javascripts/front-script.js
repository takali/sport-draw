$( function() {

	var host = process.env.HOST || '//localhost:3000';
	
		var socket = io(host);
		
		socket.on('moveTeam', function (data) {
			moveTeamEasy(data, socket);
		});

	function moveTeam(data){
		/*
		identifier la source
		identifier la target
		passer la source en absolute
		la deplacer sur la target
		*/
	}

	function removeTeam(data){
		
	}

	function moveTeamEasy(data, socket){
		/*
		copy div source into target
		hide source
		show target
		*/
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