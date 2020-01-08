$( document ).ready(function() {
    $('.image-upload input[name="image"]').change( function() {
        readURL(this);
    });
});

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$('.image-upload img')
				.attr('src', e.target.result)
				.width(300)
				.height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}