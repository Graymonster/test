// 메뉴 레이어 스크롤
var myScroll;
var myScrollLogin;
var addressScroll;
var categoryScroll;
function loaded() {
    try {
        myScroll = new IScroll('.nav_list', { mouseWheel: true, click: false, preventDefaultException: { tagName: /.*/ } });
        myScrollLogin = new IScroll('.nav_list_login', { mouseWheel: true, click: false, preventDefaultException: { tagName: /.*/ } });
        addressScroll = new IScroll('.address_scroll', { mouseWheel: true, click: false, preventDefaultException: { tagName: /.*/ } });
        categoryScroll = new IScroll('.category_list', { scrollX: true, scrollY: false, mouseWheel: true, click: false, preventDefaultException: { tagName: /.*/ } });        
    } catch (e) {aaaa

    };
};
// 메뉴 레이어 스크롤 resizezzz
$(window).bind('touchmove', function (e) {
    try {
        myScroll.refresh();
        myScrollLogin.refresh();
        addressScroll.refresh();
        categoryScroll.refresh();
    } catch (e) {

    };
});
// 이벤트 제거
var eventhandler = function (e) {
    e.preventDefault();
};
$.fn.disableScroll = function () {
    window.oldScrollPos = $(window).scrollTop();
    $(window).on('scroll.scrolldisabler', function (event) {
        $(window).scrollTop(window.oldScrollPos);
        event.preventDefault();
    });
};
$.fn.enableScroll = function () {
    $(window).off('scroll.scrolldisabler');
};
// 화면 높이 고정
function lockView() {
    $('html,body').css('height', $(document).height() + 'px');
    $('body').disableScroll();
    $(document).bind('touchmove', eventhandler);
};
// 화면 높이 고정 풀기
function unlockView() {
    $('html,body').css('height', 'auto');
    $('body').enableScroll();
    $(document).unbind('touchmove', eventhandler);
};
// 이전 페이지
function backPage() {
    location.href = history.back();
};
// 배송지 관리
function showAddressManage() {
    $('.pop_address_manage').css('visibility', 'visible');
    lockView();
};
function hideAddressManage() {
    $('.pop_address_manage').css('visibility', 'hidden');
};
// 배송지 등록
function showAddressRegist() {
    $('.pop_address').css('visibility', 'visible');
    lockView();
};
function hideAddressRegist() {
    $('.pop_address').css('visibility', 'hidden');
};
function addressRegistConfirm() {
    if (confirm('이 주소를 기본 배송지로 등록 하시겠습니까?')) {
        $('.pop_address').css('visibility', 'hidden');
        unlockView();
    } else {
        return false;
    }
};
$(function () {
    // 레이어 메뉴
    try {
        $('.nav_list ul').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: false,
            disableLink: true,
            speed: 'fast'
        });
    } catch (e) {

    };
    // 메뉴
    var menuOpen = true; // 메뉴 열림 체크
    var menuLayer = $('#nav');
    var menuWidth = menuLayer.width(); // 메뉴 레이어 가로 사이즈
    var bgLayer = $('.bg');
    var searchLayer = $('.search_box');
    var maxHeight = window.innerHeight;
    bgLayer.hide();
    // 레이어 초기 설정
    bgLayer.css('height', maxHeight);
    // ios 4 버전일 때 메뉴 레이어 높이 설정
    if (/(iPhone|iPad|iPod)\sOS\s4/.test(navigator.userAgent)) {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 1) {
                menuLayer.css('height', (($(window).height()) + 40) + 'px');
                bgLayer.css('height', (($(window).height()) + 40) + 'px');
                $('.pop_basic').css('height', (($(window).height()) + 40) + 'px');
            } else {
                menuLayer.css('height', maxHeight);
                bgLayer.css('height', maxHeight);
                $('.pop_basic').css('height', maxHeight);
            };
        });
    };
    // 메뉴레이어 보이기
    function showMenu() {
        menuLayer.css('visibility', 'visible');
        bgLayer.css('display', 'block');
        if (menuOpen) {
            menuLayer.css('left', '-270px');
            if ($(window).width() == $('#wrap').width()) {
                menuLayer.animate({ left: 0}, 270, 'easeInOutQuint', function () { });
            } else {
                menuLayer.animate({ left: $('#wrap').offset().left + 'px' }, 270, 'easeInOutQuint', function () { });
            };
        };
        menuOpen = false;
        lockView();
    };
    // 메뉴레이어 숨기기
    function hideMenu() {
        if (!menuOpen) {
            menuLayer.animate({ left: -270 }, 270, 'easeInOutQuint', function () {
                menuLayer.css('visibility', 'hidden');
                bgLayer.css('display', 'none');
            });
        };
        menuOpen = true;
        unlockView();
    };
    // 메뉴버튼 클릭
    $('.btn_nav').click(function () {
        showMenu();
    });
    // 메뉴닫기 버튼 클릭
    $('.nav_btn_close').click(function () {
        hideMenu();
    });
    // 배경 클릭
    bgLayer.click(function () {
        hideMenu();
    });
    // 검색 이동
    $(".search_text").keydown(function (key) {
        if (key.keyCode == 13) {
            location.href = '../search/search.html';
        }
    });
    // 레이어 설정
    $('.pop_basic_cnt').each(function () {
        var popHeight = $(this).outerHeight() / 2;
        $(this).css('margin-top', '-' + popHeight + 'px');
    });
});
$(window).resize(function () {
    $('#nav').css('left', $('#wrap').offset().left + 'px');
});
// 검색
var winTopPos;
function showSearch() {
    $('.search_box').show();
    lockView();
    winTopPos = $('#header').offset().top;
};
function hideSearch() {
    $('.search_box').hide();
    unlockView();
    $(window).scrollTop(winTopPos);
};
// orientation 체크
function is_portrait() {
    var uagent = navigator.userAgent.toLowerCase();
    if (uagent.search('ipad') > -1) {
        var r = (window.orientation == 0 || window.orientation == 180);
    } else {
        var r = (screen.width < screen.height);
    }
    return r;
}
function is_landscape() {
    var uagent = navigator.userAgent.toLowerCase();
    if (uagent.search('ipad') > -1) {
        var r = (window.orientation == 90 || window.orientation == -90);
    } else {
        var r = (screen.width > screen.height);
    }
    return r;
}

