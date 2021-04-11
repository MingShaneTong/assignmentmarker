function addCriterionListeners(){
	document.querySelectorAll('.criterion').forEach(item => {
		$(item).find('input[type="checkbox"]').on("click", onCheck);
		$(item).find('input[type="range"]').on("change", onSlide);
	})
}

/**
 * When checkbox is clicked and set to checked then hide slider and make indeterminate false
 * If not, display slider and check slider
 */
function onCheck(evt){
	var checkbox = $(evt.target);
	var range = checkbox.closest('.criterion').find('input[type="range"]');

	if(checkbox.prop("checked")){
		checkbox.attr("data-indeterminate", false);
		range.css("display", "none");
	} else {
		range.css("display", "block");
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

	if(range.val() == 0){
		// smallest value
		checkbox.attr("data-indeterminate", false);
		checkbox.prop("checked", false);
	} else if (range.val() == range.attr("max")){
		// largest value
		checkbox.attr("data-indeterminate", false);
		checkbox.prop("checked", true);
	} else {
		// middle
		checkbox.attr("data-indeterminate", true);
	}
}

/**
 * Generate the grade and comment
 */
function processSchedule(){
	var categories = $("#file-content").find(".category");
	var total = 0;
	for(var i = 0; i < categories.length; i++){
		// find the criterion from the category
		var category = $(categories[i]);
		var criteria = category.children(".criterion");
		console.log(criteria);
		for(var j = 0; j < criteria.length; j++){
			total += processCriterion($(criteria[j]))-0;
		}
	}
	console.log(total);
}

/**
 * Returns the points awarded for the criteria
 *
 * @param {$(Criterion)}	criterion 	The element of the criterion
 * @return {int}	points awarded to the criterion
 */
function processCriterion(criterion){
	var checkbox = criterion.find("input[type=\"checkbox\"]");
	var range = criterion.find("input[type=\"range\"]");

	if(checkbox.attr("data-indeterminate") == "false"){
		// award full points or no points
		if(checkbox.prop("checked"))
			return range.attr("max");
		else
			return 0;
	} 
	// check slider for partial marks
	return range.val();
}


function onScheduleLoad(){
	addCriterionListeners();
}