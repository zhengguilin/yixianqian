jQuery(function (){

    //首页幻灯片
    jQuery('#video_img').get(0).innerHTML+=jQuery('#video_img').get(0).innerHTML;

    var aNum = jQuery('#ifocus_btn li');
    var aTxt = jQuery('#video_txt li');
    var oFocus = jQuery('#ifocus');
    var oPicList = jQuery('#ifocus_piclist');
    var iLen = jQuery('#video_img li').length;
    var index = null;
    var iNow = null;
    var timer = null;
    var iTarget = 168;

    aNum.mouseenter(function (){
        index = aNum.index(this);
        iNow = index;
        showPic();

    });

    function autoPlay(){
        timer = setInterval(function (){
            if(iNow == iLen/2){
                aNum.eq(0).removeClass('normal').addClass('current').siblings().removeClass('current').addClass('normal');
                aTxt.eq(0).removeClass('normal').addClass('current').siblings().removeClass('current').addClass('normal');
            }
            if(iNow == iLen/2+1){
                oPicList.css('top',0);
                iNow = 1;
            }
            showPic();
			iNow++
        }, 3000)
    };
    autoPlay();

    function showPic(){
        aNum.eq(iNow).removeClass('normal').addClass('current').siblings().removeClass('current').addClass('normal');
        aTxt.eq(iNow).removeClass('normal').addClass('current').siblings().removeClass('current').addClass('normal');
        oPicList.stop().animate({top:-iTarget * iNow},400)
    };

    oFocus.hover(function (){
        clearInterval(timer);
    },function (){
        autoPlay();
    });

		
    //成功故事
	function storyTit(i){
		jQuery('#tabcontent'+i+'').delegate('li', 'mouseover', function(){
			var iIndex = jQuery('#tabcontent'+i+' li').index(this);
			jQuery('#tabcontent'+i+' .ShadowA-Hover').eq(iIndex).show().stop().animate({bottom:0},200);
		})
		
		jQuery('#tabcontent'+i+'').delegate('li', 'mouseout', function(){
			var iIndex = jQuery('#tabcontent'+i+' li').index(this);
			jQuery('#tabcontent'+i+' .ShadowA-Hover').eq(iIndex).stop().animate({bottom:-40},200,function (){
				jQuery(this).hide();
			});
		})
	}
	
	for(var i=0; i<jQuery('.ui-tab-underBg-content ul').length; i++){
		storyTit(i);	
	}

});