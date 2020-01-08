$(document).ready(function () {
  $('.small-box').on('click','.daily', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    if($(this).attr('alt') == 'today') {
      var td = converDate(new Date());
      var field = {'date': td};
    } else if($(this).attr('alt') == 'yesterday') {
      var yd = converDate(new Date(Date.now() - 864e5));
      var field = {'date': yd};
    }
    util.post(url, field);
  });
});