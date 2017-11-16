$( function() {
	//drag n drop
	$( ".country" ).draggable({
		revert: "invalid",
        scope: "items",
        stop: function(){
	        $(this).draggable('option','revert','invalid');
	        $(this).find('.undo').show();
	    }
	});
	$( ".elem" ).droppable({
		scope: "items",
		tolerance: "fit",
		drop: function( event, ui ) {
			// hoverClass: 'active',
			
			$(ui.draggable).addClass('dropped');
			$(ui.draggable).draggable({"disabled":true});
			// $(this).droppable('destroy');

			// if (!ui.draggable.data("originalPosition")) {
   //          	ui.draggable.data("originalPosition", ui.draggable.data("draggable").originalPosition);
   //          }
        	$(this).find('.undo').show();

			var cty = $(ui.draggable).attr('data-key');
			var code = $(ui.draggable).attr('data-id');
			var grp = $(this).parent( ".group" ).attr('data-key');
			var pos = $(this).attr('data-key');
			var data = {'country': cty, 'code': code, 'group': grp, 'position': pos};
			$.post( "/admin/update", data );
		}

	});

	// for revert
	/*
	$(".country").on('click',function() {
		if(($(this).hasClass('dropped')))
		{
			console.log('click');
		    $(this).animate({
		        "left": $(this).data("left"),
		        "top": $(this).data("top")
		    });
		    $(this).removeClass('dropped');
	    }
	});
	$(".ui-widget-content").data("left", $(".ui-widget-content").position().left).data("top", $(".ui-widget-content").position().top);
	*/
	$('.country').find('.undo').click(function(i, e) {
	    var $div = $(this).parent();
	    revertDraggable($div);
	});
	function revertDraggable($selector) {
	    $selector.each(function() {
	        var $this = $(this),
	            position = $this.data("originalPosition");

	        if (position) {
	            $this.animate({
	                left: position.left,
	                top: position.top
	            }, 500, function() {
	                $this.data("originalPosition", null);
	            });
	        }
	    });
	    
	     $selector.find('.undo').hide();
	}
} );