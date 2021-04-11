/**
 * Stores the criterion title, points and sub criterion
 */
class Criterion {
	/**
	 * Instantiates the criterion
	 * 
	 * @param {String} criterion 	Title given to the crierion 
	 * @param {int} points 	Points given to the crierion 
	 */
	constructor(criterion, points){
		this.criterion = criterion;
		this.points = points;
		this.subcrit = [];
	}

	/**
	 * Adds a sub criterion
	 *
	 * @param {Criterion} sub 	The sub criterion that the student must also complete
	 */
	addSub(sub){
		this.subcrit.push(sub);
	}

	toString(){
		return this.criterion + " " + this.points;
	}
}