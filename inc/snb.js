function snb(cate, snb, chk) {

	var uniq = {

		'comp'     : '요양원소개'

	};

	str = ''		
	str += '<div class="snb_list">'
	str += '	<h2 class="snb_tit"><span>' + uniq[cate] + '</span></h2>';
	str += '	<ul class="snb_nav">';

	if ( cate == 'comp' ) {

		str += '	<li><a href="greeting.html">인사말</a></li>';
		str += '	<li><a href="intro.html">법인소개</a></li>';
		str += '	<li><a href="mission.html">비전</a></li>';
		str += '	<li><a href="orga.html">조직도</a></li>';
		str += '	<li><a href="staff.html">직원소개</a></li>';
		str += '	<li><a href="history.html">연혁</a></li>';
		str += '	<li><a href="map.html">오시는길</a></li>';

	}
	
	str += '	</ul>';
	str += '</div>';

	document.getElementById(snb).innerHTML += str;

	$('.snb_nav li:nth-child(' + chk + ')').addClass('on');

}