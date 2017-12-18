$(".dropdown-menu li a").click(function(){
  $(this).parents(".selectRegion").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".selectRegion").find('.btn').val($(this).data('value'));
});

/*well height equalizer using jquery*/
var elements = document.querySelectorAll(".well"), heights = [];

[].forEach.call(elements, function(each) {
  heights[heights.length] = getComputedStyle(each, null).getPropertyValue("height");
});

heights.sort(function(a, b) {
  return parseFloat(b) - parseFloat(a);
});

[].forEach.call(elements, function(each) {
  each.style.height = heights[0];
});
/*end of well height equalizer*/

/* for testing :)
document.addEventListener('DOMContentLoaded', function() {
    //alert("Ready!");
}


}, false);*/

