/**
 * Stores the categories and criterions for the whole assignment
 */
class Schedule {
	/**
	 * Instantiates the schedule object
	 * 
	 * @param {String} title	The title of the assignment
	 */
	constructor(title){
		this.title = title;
		this.categories = [];
	}

	/**
	 * Add a category to the schedule
	 * Eg, core, completion, challenge
	 * 
	 * @param {Category}	category
	 */
	addCategory(category){
		this.categories.push(category);
	}


	toString(){
		var s = this.title;
		for(var i in this.categories){
			s += "\n";
			s += this.categories[i].toString();
		}
		return s;
	}
}