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
  $('input').click(function(e) {
    e.stopPropagation();
  });
  $('#top').removeClass('filter');
  $('.search-popup').css('display', 'none');
});

$('.js-question').click(function(event) {
  $(this).next('p').toggleClass('open');
});
