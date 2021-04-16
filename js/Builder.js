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
		var div = $(`<div class=\"category\" data-max="${category.max}"></div>`);
		// add the accordion header and body
		div.append($(`
			<div class="accordion-header">
				<h3>${category.title}</h3>
				<div class="fr">
					<h4><span class="score">0</span>/${category.max}</h4><span class="material-icons">expand_less</span>
				</div>
			</div>`));

		// construct elements for categories
		var accordbody = $(`<div class=\"accordion-body\"></div>`);
		var criteria = category.criteria;
		for(var i in criteria) {
			Builder.constructCriterion(criteria[i], accordbody);
		}

		div.append(accordbody);
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
		rightdiv.append(Builder.getSlider(criterion.points));

		div.append(rightdiv);
		parent.append(div);
	}

	/**
	 *
	 */
	static getSlider(points){
		return $(`
			<div class='sliderBox'>
				<label class="mdc-text-field mdc-text-field--outlined">
	                <span class="mdc-notched-outline">
	                    <span class="mdc-notched-outline__leading"></span>
	                    <span class="mdc-notched-outline__notch">
	                        <span class="mdc-floating-label"></span>
	                    </span>
	                    <span class="mdc-notched-outline__trailing"></span>
	                </span>
	                <input type="number" class="mdc-text-field__input" min="0" max="${points}" value="0">
	            </label>
				<input type='range' class='slider' min='0' max='${points}' value='0' steps='1'>
			</div>`);
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
