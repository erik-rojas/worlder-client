$( document ).ready(function() {
    $('table.table tbody').on('click', 'a.btn-danger.delete', function(event) {
		event.stopPropagation();
		tc = $(this);
		var cf = confirm("Are you sure!");
		if (cf == true) {
			url=tc.attr('href');
			$.ajax({
				url: url,
				method: 'post',
				success: function( data ) {
					if(data)
						tc.parent().parent().remove();
				},
			});
		}
		return false;
	});
});