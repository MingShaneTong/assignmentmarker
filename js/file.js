/* open the file selection for hidden file input */
document.querySelector("#file-action").addEventListener('click', function() {
	document.getElementById('read-file').click();
});
document.querySelector("#file-name-label").addEventListener('click', function() {
	document.getElementById('read-file').click();
});

/* change the text in text input */
document.querySelector("#read-file").addEventListener('change', function() {
	if(document.querySelector("#read-file").files.length > 0) {
		let file = document.querySelector("#read-file").files[0];
		$("#file-name").text(file.name);
	} else {
		$("#file-name").text("No File Chosen");
	}
});


document.querySelector("#read-file-button").addEventListener('click', function() {
	if(document.querySelector("#read-file").files.length == 0) {
		alert('Error : No file selected');
		return;
	}

	let file = document.querySelector("#read-file").files[0];
	let reader = new FileReader();

	// loads the file
	reader.addEventListener('load', function(e) {
	   // contents of the file
	    let text = e.target.result;

	    let s = Parser.parseText(text);
	    console.log(s.toString());
	});

	// when file reading fails
	reader.addEventListener('error', function() {
	    alert('Error : Failed to read file');
	});

	reader.readAsText(file);
});