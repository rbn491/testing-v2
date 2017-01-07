function initSwiper()
{
	var swiper = new Swiper('.swiper-container', 
	{
		'pagination': '.swiper-pagination',
		'paginationClickable': true,
		'direction': 'vertical'
	})
}

window.onload = initSwiper