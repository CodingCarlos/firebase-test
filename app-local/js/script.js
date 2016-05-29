

// Encapsulate all into a function
(function() {
	
	var notes = [
		{
			title: 'First note',
			content: 'This is the first note. Is just a test'
		},
		{
			title: 'Other note',
			content: 'You can update the note list just changing this array elements'
		},
		{
			title: 'Buy bread',
			content: 'Do this app, but don\'t forget to buy bread'
		}
	];


	/**
	 *	OnLoad:
	 *	What must be loaded on the very begginning
	 */
	window.onload =  function() {
		
		// Add event listener for add a new note
		document.getElementById("add-button").addEventListener("click", function(){
			addNote();
		});

		// Do the initial routing
		route();
	}

	// On hash change, route to section
	// window.onhashchange = route;
	window.onhashchange = function() {
		route();
	}

	/**
	 *	Route:
	 *	Execute the function acording with the url (hash)
	 */
	function route() {
		// Get the hash
		var hash = document.location.hash.split('/');
		var section = hash[0];
		var id = -1;

		if(hash.length > 1) {
			id = hash[1];
		}

		console.log(hash);

		switch(section) {
			
			case '#note':
				viewNote(id);
				break;
			
			case '#add':
				addScreen();
				break;

			case '#list':
			default:
				listNotes();
				break;
		}
	}


	/**
	 *	List notes:
	 *	List all the elements of the notes array
	 */
	function listNotes() {

		var html = '';

		// Create the list into the html var
		for(var i = 0; i < notes.length; i++) {
			html += '<li><a href="#note/' + i + '">';
			html += notes[i].title;
			html += '</a></li>';
		}

		// Print the note list into the html list
		document.getElementById('note-list').innerHTML = html;

		// Show the list
		document.getElementById('list').style = 'display: block;';
		// Hide the other modules
		document.getElementById('view').style = 'display: none;';
		document.getElementById('add').style = 'display: none;';
	}

	/**
	 *	View note:
	 *	View all the details of a note
	 */
	function viewNote(id) {

		// If don't came any id, get it from url
		if(typeof(id) == 'undefined') {
			//
			console.log('Gotten id from URL');
		}

		var note = notes[id];

		document.getElementById('view-title').innerHTML = note.title;
		document.getElementById('view-content').innerHTML = note.content;

		// Show the note
		document.getElementById('view').style = 'display: block;';
		// Hide the other modules
		document.getElementById('list').style = 'display: none;';
		document.getElementById('add').style = 'display: none;';
	}

	/**
	 *	View note:
	 *	View all the details of a note
	 */
	function addScreen() {

		document.getElementById('add-title').value = '';
		document.getElementById('add-content').value = '';

		// Show the note
		document.getElementById('add').style = 'display: block;';
		// Hide the other modules
		document.getElementById('list').style = 'display: none;';
		document.getElementById('view').style = 'display: none;';
	}

	/**
	 *	Add note:
	 *	Add a new note to list
	 */
	function addNote() {

		var title = document.getElementById('add-title').value;
		var content = document.getElementById('add-content').value;

		var note = {
			title: title,
			content: content
		}

		// Push the note to notes array
		notes.push(note);

		document.getElementById('add-title').value = '';
		document.getElementById('add-content').value = '';

		listNotes();
	}

})();