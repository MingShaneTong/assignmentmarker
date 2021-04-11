/**
 * Static class that parses the text input into a schedule object
 */
class Parser {
	/**
	 * Parses the text input and returns the schedule class
	 * 
	 * @param {String} text 	The text to be parsed
	 * @return {Schedule}
	 */
	static parseText(text){
		var lines = text.split("\n");

		// 1st line: assignment name, 2nd: number of categories, 3rd: spacer
		var schedule = new Schedule(lines[0]);
		var numOfCat = Number(lines[1]);

		// find the criterion for each of the categories
		var i = 3;
		for(var cat = 0; cat < numOfCat; cat++) {
			// parse the category name and max
			var category = Parser.parseCategory(lines[i++]);

			// parse criterion
			i = Parser.parseCriterion(category, lines, i);
			i++;

			schedule.addCategory(category);
		}
		return schedule;
	}

	/**
	 * Parses the line and returns the instantiated object
	 * 
	 * @param {String} line 	The text to be parsed
	 * @return {Category}
	 */
	static parseCategory(line){
		let catexp = /(\w+)[ \t]*:[ \t]*(\d+)-(\d+)/g;
		let captured = catexp.exec(line);
		let max = Number(captured[3]) - Number(captured[2]);
		return new Category(captured[1], max);
	}

	/**
	 * Parses the criterion and adds to category and returns the index of the blank line
	 * 
	 * @param {Category} category 	The category to add criterion to
	 * @param {String[]} lines 	The lines to be parsed
	 * @param {int} index 	The index to start search from
	 * @return {int}	The index of the blank line
	 */
	static parseCriterion(category, lines, index){
		while(lines[index] != undefined && lines[index].length >= 4){
			var critexp = /\[(\d+)\][ \t]*(.+)/g;
			let captured = critexp.exec(lines[index]);
			// create criterion
			category.addCriterion(new Criterion(captured[2], Number(captured[1])));
			index++;
		}
		return index;
	}
}