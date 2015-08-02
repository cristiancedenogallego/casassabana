var jssorslider = require('jssorslider');
var slider_id = "slider-photos";

export default class JsorSlider{
	constructor(){
		let options = {
			$AutoPlay: true,
			$ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,
                $ChanceToShow: 2
            } };
		global.jssor_slider = new $JssorSlider$(slider_id, options);
		this.ScaleSlider();
		$(window).bind("load", this.ScaleSlider);
        $(window).bind("resize", this.ScaleSlider);
        $(window).bind("orientationchange", this.ScaleSlider);
	}
	/**
	 * Hacer responsive
	 */
	ScaleSlider() {
            var parentWidth = $(`#${slider_id}`).parent().width();
            if (parentWidth)
                global.jssor_slider.$ScaleWidth(parentWidth);
            else
                window.setTimeout(this.ScaleSlider, 30);
    }
}

