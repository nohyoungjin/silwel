function snb(cate, snb, chk) {

	var uniq = {

		'comp'     : '요양원소개',
		'bulid'    : '시설안내',
		'donat'    : '사랑나눔',
		'notify'   : '알림마당'

	}

	str = ''		
	str += '<div class="snb_list">'
	str += '	<h2 class="snb_tit"><span>' + uniq[cate] + '</span></h2>'
	str += '	<ul class="snb_nav">'

	if (cate == 'comp') {

		str += '	<li><a href="greeting.html">인사말</a></li>'
		str += '	<li><a href="intro.html">법인소개</a></li>'
		str += '	<li><a href="mission.html">비전</a></li>'
		str += '	<li><a href="orga.html">조직도</a></li>'
		str += '	<li><a href="staff.html">직원소개</a></li>'
		str += '	<li><a href="history.html">연혁</a></li>'
		str += '	<li><a href="map.html">오시는길</a></li>'

	}

	if (cate == 'bulid') {

		str += '	<li><a href="city.html">시설안내</a></li>'
		str += '	<li><a href="camp.html">입소안내</a></li>'

	}
	
	if (cate == 'donat') {

		str += '	<li><a href="support.html">후원신청</a></li>'
		str += '	<li><a href="volunteer.html">자원봉사신청</a></li>'

	}

	if (cate == 'notify') {

		str += '	<li><a href="s_list.html">공지사항</a></li>'
		str += '	<li><a href="g_list.html">실로암소식지</a></li>'
		str += '	<li><a href="p_list.html">포토갤러리</a></li>'

	}

	str += '	</ul>'
	str += '</div>'

	document.getElementById(snb).innerHTML += str

	$('.snb_nav li:nth-child(' + chk + ')').addClass('on')

}