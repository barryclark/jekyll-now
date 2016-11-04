	var __tileOnArray = [];

	function __toggleFeed(szUrl,opt){
		if (maptune.isFeedLayer(szUrl)){
			__tileOnArray[szUrl] = null;
			$(this)[0].event.target.style.setProperty("background","#dddddd");
			maptune.removeFeedLayer(szUrl);
		}else{
			__tileOnArray[szUrl] = $(this)[0].event.target;
			$(this)[0].event.target.style.setProperty("background","#99dd88");
			maptune.addFeedLayer(szUrl,opt);
		}
	}	
	function __clear(){
		maptune.embededApi.clear();
		for ( a in __tileOnArray ){
			try{
				__tileOnArray[a].style.setProperty("background","#dddddd");
			}catch(e){}
		}
		__tileOnArray = [];
	}
