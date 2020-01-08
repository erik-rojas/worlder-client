$(document).ready(function () {
	(function($) {
		$("#name").on("propertychange change click keyup input paste blur", function(){
			var nameStr = $(this).val();
			$("#slug").val(string_to_slug(nameStr));
		});
	})(jQuery);
});
