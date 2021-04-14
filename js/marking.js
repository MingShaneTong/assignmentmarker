function addCriterionListeners(){
	document.querySelectorAll('.criterion').forEach(item => {
		$(item).find('input[type="checkbox"]').on("click", onCheck);
		$(item).find('input[type="range"]').on("change", onSlide);
		$(item).find('input[type="number"]').on("input", onVal);
	})
}

function getGradeBox(){
	return $("#grade");
}

function getCommentBox(){
	return $("#comment");
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

/**
 * Generate the grade and comment
 */
function processSchedule(){
	getGradeBox().val('');
	getCommentBox().text('');

	var categories = $("#file-content").find(".category");
	var total = 0;
	for(var i = 0; i < categories.length; i++){
		// find the criterion from the category
		var category = $(categories[i]);
		total += processCategory(category)-0;
	}
	if(total > 100)
		total = 100;

	getGradeBox().val(total);
}

/**
 * Returns the points awarded for the category
 *
 * @param {$(Category)}	category 	The element of the category
 * @return {int}	points awarded to the category
 */
function processCategory(category){
	getCommentBox().append(category.find("h3").text() + " - ");

	var criteria = category.children(".criterion");
	var max = Number(category.attr("data-max"));
	var total = 0;
	var comments = [];
	// get total, max and comments from each criterion
	for(var j = 0; j < criteria.length; j++){
		var critresult = processCriterion($(criteria[j]));
		total += critresult[0]-0;
		comments.push(critresult[1]);
	}

	// check total is less than the max
	if(total > max)
		total = max;

	getCommentBox().append(total + "/" + max +"\n");
	// print the comments
	for(var i = 0; i < comments.length; i++) {
		getCommentBox().append(comments[i] +"\n");
	}
	getCommentBox().append("\n");

	return total;
}

/**
 * Returns the points awarded for the criteria
 *
 * @param {$(Criterion)}	criterion 	The element of the criterion
 * @return {int, int, String}	points awarded, maximum points, comment
 */
function processCriterion(criterion){
	var checkbox = criterion.find("input[type=\"checkbox\"]");
	var critTitle = criterion.find("p");
	var range = criterion.find("input[type=\"range\"]");
	var max = Number(range.attr("max"));

	// check the grade of the criterion
	if(checkbox.attr("data-indeterminate") == "false"){
		// award full points or no points
		if(checkbox.prop("checked"))
			return [max, "Completed "+critTitle.text()];
		else
			return [0, "No attempt at "+critTitle.text()];
	} 
	// check slider for partial marks
	return [range.val(), "Some attempt at "+critTitle.text()];
}


function onScheduleLoad(){
	addCriterionListeners();
	$("#grade-comments").css("display", "block");
}