;(function(d,$){
	var jQdmtab_defaults = {
		tabContentsContainer:'.tabContentsContainer',
		tabEventAction:'click',
		currentSelector:'current',
	};
	$.fn.jQdmtabAdd=function(options) {
		console.debug(options);
		var firstTab = false;
		var currentTabIdx = -1;
		//find current index
		var _$obj=$(this.get(0));
		var _p = {
				tabObj:_$obj,
				isAnimate:false
		};
		var newTabIdx = $(this).find('li').length;
		
		if (newTabIdx==0) {
			console.debug("first tab");
			firstTab=true;
		}else {
			currentTabIdx = $(this).find("li[class='current']").index();
		}
		
		var tabName = "tab_" + options.newTabId;
		var newTabControl = "<li>" +
				"<a href='#tab_" + options.newTabId + "' id='" + options.newTabId + "'>" + options.newTabId + "</a>"+
				"<img id='closeTabImg_" + options.newTabId + "' class='closeTabIcon', src='images/close-icon.png' title='Close'>" + 
				"</li>";
		$(this).find('ul').append(newTabControl);
		var newTabContent = "<div id='tab_" + options.newTabId + "' class='tab_content'>" + options.newTabId + "</div>";
		$(this).find('.tabContentsContainer').append(newTabContent);
		if (firstTab) {
			tabChangeCurrent(newTabIdx);
		}else {
			hideTabContent(currentTabIdx);
			tabChangeCurrent(newTabIdx);
		}
		console.debug($(this).find("a[id=" + options.newTabId + "]").closest('li'));
		$(this).find("a[id=" + options.newTabId + "]").closest('li').on('click',function(e){
			if (typeof e.preventDefault === 'function') {
				e.preventDefault();
			}
			var currentTabIdx=$(this).closest('ul').find("li[class='current']").index();
			console.debug(currentTabIdx);
			var newClickTabIdx = $(this).index();
			
			if (newClickTabIdx != currentTabIdx && !_p.isAnimate) {
				hideTabContent(currentTabIdx);
				showTabContent(newClickTabIdx);
			}
		});
		$(this).find("img[id='closeTabImg_" + options.newTabId + "']").data('tabId',options.newTabId);
		$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('mouseover',function(e){
			$(this).attr("src","images/close-icon-on.png");
		});
		//$(this).find('img').attr('id', "closeTabImg_" + options.newTabId).on('mouseleave',function(e){
		$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('mouseleave',function(e){
			$(this).attr("src","images/close-icon.png");
		});
		//$(this).find('img').attr('id', "closeTabImg_" + options.newTabId).on('click',function(e){
		$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('click',function(e){
			console.debug(e);
			var currentTabIdx=$(this).closest('ul').find("li[class='current']").index();
			var closeEventIdx =  $(this).closest('ul').find($(this).closest('li')).index();
			var lastTabIdx = $(this).closest('ul').find("li").length-1;
			console.debug(currentTabIdx);
			console.debug("event on li index " + $(this).closest('ul').find($(this).closest('li')).index());
			console.debug("li length " + $(this).closest('ul').find('li').length);
			console.debug($(this).data('tabId') + " click event");
			console.debug($(this).closest('li'));
			console.debug($('#tab_'+$(this).data('tabId')));
			$('#tab_'+$(this).data('tabId')).remove();
			$(this).closest('li').remove();
			if (currentTabIdx==closeEventIdx && lastTabIdx >currentTabIdx) {
				tabChangeCurrent(currentTabIdx);
			}else if (currentTabIdx==closeEventIdx && lastTabIdx > 0 && lastTabIdx == currentTabIdx) {
				tabChangeCurrent(currentTabIdx-1);
			}
		});
		//console.debug(this.find('img').attr('id', "closeTabImg_" + options.newTabId));
		
		function tabChangeCurrent(_t) {
			console.debug("tabChangeCurrent");
			_p.tabObj.find('li').eq(_t).toggleClass('current');
			console.debug(_p.tabObj.find('li'));
			console.debug(_p.tabObj);
		}
		function hideTabContent(_current) {
			var _$target =_p.tabObj.find('.tabContentsContainer').children().eq(_current);
			_p.isAnimate=false;
			tabChangeCurrent(_current);
			
			_$target.css({
				left:0,
				opacity:0,
				display:'none',
				position:'relative'
			});
		}
		function showTabContent(_t) {
			var _$target=_p.tabObj.find('.tabContentsContainer').children().eq(_t);
			_p.isAnimate=true;
			tabChangeCurrent(_t);
			_$target.css({
				display:'block',
				position:'relative'
			}).animate({opacity:1},{duration:500,
				complete:function(){
					showComplete(_$target);
				}});
		}
		function showComplete(_$target){
			_p.isAnimate=false;
			_$target.css({
				display:'block',
				position:'relative',
				opacity:1
			});
		}
	}
	$.fn.jQdmtab=function(options){
		console.debug("jQdmtab begin");
		console.debug($(this));
		var defaults=jQdmtab_defaults;
		var setting = $.extend(defaults,options);
		var _$obj=$(this.get(0)),
		_s = $.data($(this),setting),		
		_p = {
			tabObj:_$obj,
			tabs:_$obj.find('ul'),
			tabCn:_$obj.find(_s.tabContentsContainer),
			isAnimate:false
		};
	};
}(document,jQuery));