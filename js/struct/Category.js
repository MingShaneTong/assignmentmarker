/**
 * Stores the criterion that is needed for either core, completion and challenge
 */
class Category {
	/**
	 * Instantiates the category object
	 * 
	 * @param {String} title	The title of the category
	 * @param {int} max	The maximum points in the category
	 */
	constructor(title, max){
		this.title = title;
		this.max = max;
		this.criteria = [];
	}

	/**
	 * Add a criterion to the criteria
	 * 
	 * @param {Criterion}	criterion
	 */
	addCriterion(criterion){
		this.criteria.push(criterion);
	}

	toString(){
		var s = this.title + " " + this.max;
		for(var i in this.criteria){
			s += "\n";
			s += this.criteria[i].toString();
		}
		return s;
	}

}