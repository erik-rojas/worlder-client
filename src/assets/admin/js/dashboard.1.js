//[Dashboard Javascript]

//Project:	SOA Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)

$(function () {

  'use strict';
	
//ticker
 	if ($('#webticker-1').length) {   
		$("#webticker-1").webTicker({
			height:'auto', 
			duplicate:true, 
			startEmpty:false, 
			rssfrequency:5
		});
	}
	
// scrolling  
	  $('#scroll-1').slimScroll({
		height: '300px'
	  });
	  $('#scroll-2').slimScroll({
		height: '300px'
	  });
	
}); // End of use strict
