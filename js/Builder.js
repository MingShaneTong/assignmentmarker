/**
 * Static class that builts the schedule on the page
 */
class Builder {
	/**
	 * Static method that creates the schedule
	 * 
	 * @param {Schedule}	schedule
	 * @param {$element}	parent 	The jquery element to add to
	 */
	static constructSchedule(schedule, parent){
		var div = $("<div class=\"schedule\"></div>");
		div.append($("<h1>" + schedule.title + "</h1>"));
		div.append($("<h2>Criteria</h2>"));

		// construct elements for categories
		var categories = schedule.categories;
		for(var i in categories) {
			Builder.constructCategory(categories[i], div)
		}

		parent.append(div);
	}

	/**
	 * Static method that creates the categories
	 * 
	 * @param {Category}	category
	 * @param {$element}	parent 	The jquery element to add to
	 */
	static constructCategory(category, parent){
		var div = $("<div class=\"category\"></div>");
		div.append($("<h3>" + category.title + "</h3>"));

		// construct elements for categories
		var criteria = category.criteria;
		for(var i in criteria) {
			Builder.constructCriterion(criteria[i], div);
		}

		parent.append(div);
	}


	/**
	 * Static method that creates the criterion with a checkbox and slider
	 * 
	 * @param {Criterion}	criterion
	 * @param {$element}	parent 	The jquery element to add the constructed bar to
	 */
	static constructCriterion(criterion, parent){
		var div = $("<div class=\"criterion\"></div>");
		div.append(Builder.checkbox.clone());
		// right side of div
		var rightdiv = $("<div class=\"rightcrit\"></div>");
		rightdiv.append($("<p>" + criterion.criterion + "</p>"));
		rightdiv.append($(`<input type="range" max="`+criterion.points+`" value="0" step="1">`));

		div.append(rightdiv);
		parent.append(div);
	}
}

/**
 * STATIC FIELDS OF HTML ELEMENTS, PLEASE CLONE THESE
 */
Builder.checkbox = $(`
	<div class="mdc-touch-target-wrapper">
        <div class="mdc-checkbox mdc-checkbox--touch">
            <input type="checkbox" class="mdc-checkbox__native-control" data-indeterminate="false"/>
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
            </div>
            <div class="mdc-checkbox__ripple"></div>
        </div>
    </div>
`);