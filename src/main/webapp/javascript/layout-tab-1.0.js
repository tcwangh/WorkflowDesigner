;(function(d,$){
	var jQdmtab_defaults = {
		tabContentsContainer:'.tabContentsContainer',
		tabEventAction:'click',
		currentSelector:'current',
		current:0
	};
	$.fn.jQdmtab=function(options){
		console.debug("jQdmtab begin");
		console.debug($(this));
		console.debug($(this.get(0)));
		var defaults=jQdmtab_defaults;
		var setting = $.extend(defaults,options);
		var _$obj=$(this.get(0)),
		_s = $.data($(this),setting),
		
		_p = {
			tabObj:_$obj,
			tabs:_$obj.find('li'),
			tabCn:_$obj.find(_s.tabContentsContainer),
			current:_s.newTabIdx,
			isAnimate:false
		};
		console.debug($.data);
		//console.debug(_$obj);
		console.debug(_p.tabs);
		_p.tabs.each(function(index ){
	        console.debug(index + " " + this.className);
	        if(this.className.indexOf('current') != -1){
	        	console.debug("hideTab:" + index);
	        	hideTabContent(index);
	        }
	   });
		console.debug(_p.current);
		tabChangeCurrent(_p.current);
		_p.tabCn.children().not(':eq('+ _p.current + ')').css({
			display:'none',
			opacity:0
		});
		_p.tabCn.css({
			position:'relative',
			padding:_s.padding
		});
		
		_p.tabs.on(_s.tabEventAction,function(e){
		
			console.debug("tab click event");
			console.debug(e);
			if (typeof e.preventDefault === 'function') {
				e.preventDefault();
			}
			var _$t = $(this),
			_index = _$t.index();
			console.debug(_$t);
			var _current = _p.current
			console.debug (_current  + " vs " +  _index);
			console.debug(_p.tabs);
			if (_index != _current && !_p.isAnimate) {
				hideTabContent(_current);
				_p.current = _index;
				showTabContent(_index);
			}
		});
		function hideTabContent(_current) {
			var _$target =_p.tabCn.children().eq(_current);
			_p.isAnimate=false;
			tabChangeCurrent(_current);
			
			_$target.css({
				left:0,
				opacity:0,
				display:'none',
				position:'relative'
			});
		}
		
		/*
		function showTabContent(_t) {
			var _$target=_p.tabCn.children().eq(_t);
			_p.isAnimate=true;
			tabChangeCurrent(_t);
			_$target.css({
				display:'block',
				position:'relative',
				opacity:1
			});
		}
		*/
		function showTabContent(_t) {
			var _$target=_p.tabCn.children().eq(_t);
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
		function tabChangeCurrent(_t) {
			console.debug("tabChangeCurrent");
			//_p.tabs.eq(_t).toggleClass(_s.currentSelector);
			if (_p.tabs.eq(_t).hasClass('current')) {
				
				_p.tabs.eq(_t).removeClass(_s.currentSelector);
			}else {
				_p.tabs.eq(_t).addClass(_s.currentSelector);
			}
			console.debug(_p);
		}
	};
}(document,jQuery));