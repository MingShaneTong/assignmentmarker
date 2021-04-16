function addAccordionListeners(){
	document.querySelectorAll('.accordion-header').forEach(item => {
		$(item).on("click", onHeaderClick);
	})
}

/**
 * show the body
 */
function onHeaderClick(evt){
	var header = $(evt.target);
	var cat = header.closest(".category");
	var body = cat.find(".accordion-body");
	var icon = header.find(".material-icons");

	// toggle body visibility
	body.toggle();
	if(body.is(":visible")){
		// 2 rounded corners
		header.css({"border-radius": "0.5rem 0.5rem 0 0"});
		icon.text("expand_less");
	} else {
		// 2 rounded corners
		header.css({"border-radius": "0.5rem"});
		icon.text("expand_more");
	}
}