/* particles-js */
particlesJS.load('particles-js', 'assets/js/assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});


/* scroll tracker and events */
$(document).scroll(function(e) {
  var scrollPosition = $("body").scrollTop();
  console.clear();
  console.log("Scroll Position = " + scrollPosition);


});
