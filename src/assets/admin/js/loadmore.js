$(document).ready(function () {
    (function($) {
    var rowCount = $('.table tr.data').length;
    var numbershow = 5;
    var i=0;
    var nguyen = rowCount / 5;
    var du = rowCount % 5;
    if(rowCount<=5){
        $('a#loadmore').hide();
    }
    $("#loadmore").click(function(e){
        e.preventDefault();
        i = i + 1;
        if(i<=(nguyen-1)){
            for (var j=numbershow+1; j<=(numbershow+5); j++) {
                $('.table #jobs'+j).show();
            }
            numbershow = numbershow + 5;
        }else{
            for (var j=numbershow+1; j<=(numbershow+du); j++) {
                $('.table #jobs'+j).show();
            }
            numbershow = numbershow + du;
        }
        if(numbershow==rowCount){
          $('a#loadmore').hide();
        }
    })
    })(jQuery);
});