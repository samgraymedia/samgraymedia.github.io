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

$('.js-question').click(function() {
  $(this).next('p').toggleClass('open');
});


$('.tab').click(function() {
  $('.tab').toggleClass('active');
  $('.tab').toggleClass('notActive');
  $('.feed').toggleClass('active');
  $('.feed').toggleClass('notActive');
});
