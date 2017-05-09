var options = {
  byRow: true,
  property: 'min-height',
  target: null,
  remove: false
};
$(function() {
  $('.pod').matchHeight(options);
});


$('#popup-js').click(function(e) {
  $('#top').addClass('filter');
  $('.search-popup').css('display', 'block');
  e.stopPropagation();
});
$("body").click(function() {
  $('#top').removeClass('filter');
  $('.search-popup').css('display', 'none');
});
