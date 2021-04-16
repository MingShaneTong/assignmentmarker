function getGradeBox(){
	return $("#grade");
}

function getCommentBox(){
	return $("#comment");
}

/**
 * Generate the grade and comment
 * @return {Result}
 */
function processSchedule(){
	var result = new Result();

	var categories = $("#file-content").find(".category");
	var total = 0;
	for(var i = 0; i < categories.length; i++){
		// find the criterion from the category
		var category = $(categories[i]);
		total += processCategory(category, result)-0;
	}
	if(total > 100)
		total = 100;

	result.setOverall(total);
	return result;
}

/**
 * Returns the points awarded for the category
 *
 * @param {$(Category)}	category 	The element of the category
 * @param {Result}	result 	The result object to add to
 * @return {int}	points awarded to the category
 */
function processCategory(category, result){
	var body = category.children(".accordion-body");

	var criteria = body.children(".criterion");
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

	result.addCategoryResults(total, max);
	result.addComment(category.find("h3").text() + " - " + total + "/" + max);
	// add the comments
	for(var i = 0; i < comments.length; i++) {
		result.addComment(comments[i]);
	}
	result.addComment("");

	return total;
}

/**
 * Returns the points awarded for the criteria
 *
 * @param {$(Criterion)}	criterion 	The element of the criterion
 * @return {int, String}	points awarded, comment
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

function collectGrades(){
	var result = processSchedule();
	// add grades to the correct places
	getGradeBox().val(result.overall);
	var comment = "";
	for (var i = 0; i < result.comments.length; i++) {
		comment += result.comments[i] + "\n";
	}
	getCommentBox().val(comment);
}