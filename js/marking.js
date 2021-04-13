function addCriterionListeners(){
	document.querySelectorAll('.criterion').forEach(item => {
		$(item).find('input[type="checkbox"]').on("click", onCheck);
		$(item).find('input[type="range"]').on("change", onSlide);
		$(item).find('input[type="range"]').on("mouseover", onSlideOver);
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
 * When slider is hovered over, create a hovering box that displays the value
 */
function onSlideOver(evt){
	var slider = $(evt.target);
	var position = slider.position();
	var width = slider.width();
	var offset = width * slider.val() / slider.attr("max");
	var left = position.left + offset;

	// place box over
	$("#slider-hover").css({
		"top": position.top,
		"left": left,
		"display": "block"
    });
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
	var max = 0;
	var total = 0;
	var comments = [];
	// get total, max and comments from each criterion
	for(var j = 0; j < criteria.length; j++){
		var critresult = processCriterion($(criteria[j]));
		total += critresult[0]-0;
		max += critresult[1]-0;
		comments.push(critresult[2]);
	}

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
	var max = range.attr("max");

	// check the grade of the criterion
	if(checkbox.attr("data-indeterminate") == "false"){
		// award full points or no points
		if(checkbox.prop("checked"))
			return [max, max, "Completed "+critTitle.text()];
		else
			return [0, max, "No attempt at "+critTitle.text()];
	} 
	// check slider for partial marks
	return [range.val(), max, "Some attempt at "+critTitle.text()];
}


function onScheduleLoad(){
	addCriterionListeners();
	$("#grade-comments").css("display", "block");
}