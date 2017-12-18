$(".dropdown-menu li a").click(function(){
  $(this).parents(".selectRegion").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".selectRegion").find('.btn').val($(this).data('value'));
});

window.onload =function changeImg(imgNumber)	{
			var myImages = ["Images/Background.jpg", 
			"Images/Background1.jpg", 
			"Images/Background2.jpg", 
			"Images/Background3.jpg", 
			"Images/Background4.jpg"]; 
			var imgShown = document.body.style.backgroundImage;
			var newImgNumber =Math.floor(Math.random()*myImages.length);
			var currImg = document.getElementById("top2");
			//currImg.style.backgroundImage = 'url('+myImages[newImgNumber]+')';
			document.body.style.backgroundImage = 'url('+myImages[newImgNumber]+')';
		}