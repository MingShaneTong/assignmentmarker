function addCriterionListeners(){
	document.querySelectorAll('.criterion').forEach(item => {
		$(item).find('input[type="checkbox"]').on("click", onCheck);
		$(item).find('input[type="range"]').on("change", onSlide);
		$(item).find('input[type="number"]').on("input", onVal);
	})
	document.querySelectorAll('.category').forEach(item => {
		$(item).find('input').on("input", onInputCategory);
	})
}

/**
 * When checkbox is clicked and set to checked then hide slider and make indeterminate false
 * If not, display slider and check slider
 */
function onCheck(evt){
	var checkbox = $(evt.target);
	var sbox = checkbox.closest('.criterion').find('.sliderBox');
	var range = checkbox.closest('.criterion').find('input[type="range"]');

	if(checkbox.prop("checked")){
		checkbox.attr("data-indeterminate", false);
		sbox.css("display", "none");
	} else {
		sbox.css("display", "block");
		range.trigger('change');
	}
		
}

/**
 * When slider is changed, if it isn't full marks or no marks
 * Make the checkbox indeterminate
 */
function onSlide(evt){
	var range = $(evt.target);
	var checkbox = range.closest('.criterion').find('input[type="checkbox"]');
	var value = range.closest('.sliderBox').find('input[type="number"]');
	var val = Number(range.val());
	var max = Number(range.attr("max"));

	if(val <= 0){
		// smallest value
		checkbox.attr("data-indeterminate", false);
		checkbox.prop("checked", false);
	} else if (val >= max){
		// largest value
		checkbox.attr("data-indeterminate", false);
		checkbox.prop("checked", true);
	} else {
		// middle
		checkbox.attr("data-indeterminate", true);
	}

	value.val(range.val());
}

/**
 * When value in box changes, so does the slider
 */
function onVal(evt){
	var value = $(evt.target);
	var range = value.closest('.sliderBox').find('input[type="range"]');
	var val = Number(value.val());
	var max = Number(value.attr("max"));

	if(val < 0){
		value.val(0);
	} else if (val > max){
		value.val(max);
	}

	range.val(value.val());
	range.trigger("change");
}


function onInputCategory(evt){
	var category = $(evt.target).closest('.category');
	var result = new Result();
	var total = processCategory(category, result);
	category.find(".score").text(total);

}

function onScheduleLoad(){
	addCriterionListeners();
	$("#grade-comments").css("display", "block");
	addAccordionListeners();
}