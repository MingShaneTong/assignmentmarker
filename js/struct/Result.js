class Result{
	constructor(){
		this.overall = 0;
		this.categoryResults = [];
		this.comments = [];
	}

	addComment(com){
		this.comments.push(com);
	}

	addCategoryResults(marks, max){
		this.categoryResults.push([marks, max]);
	}

	setOverall(marks){
		this.overall = marks;
	}
}