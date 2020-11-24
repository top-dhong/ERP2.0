export default {
    methods: {
		//阻止F5刷新
		stopF5Refresh() {
			document.onkeydown = function (e) {
				var evt = window.event || e;
				var code = evt.keyCode || evt.which;
				if (code == 116) {
					if (evt.preventDefault) {
						evt.preventDefault();
					} else {
						evt.keyCode = 0;
						evt.returnValue = false
					}
				}
			}
		},
		//浏览器刷新事件
		beforeunloadHandler (e) {
			if (JSON.parse(localStorage.getItem('havePlay'))&& JSON.parse(localStorage.getItem('havePlay')).currentTime == this.currentTime) {
				window.localStorage.removeItem("havePlay");
			}
		}
    }
}