

// Import firebase
// var Firebase = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/");
var Firebase = new Firebase("https://flickering-heat-9903.firebaseio.com/"); // This is my db. You can use it for testing, but plz don't abuse.

// Encapsulate all into a function
(function() {

	// Local notes array
	var notes = [];

	/**
	 *	OnLoad:
	 *	What must be loaded on the very begginning
	 */
	window.onload =  function() {

		// Load default firebase content
		Firebase.child("notes").on("value", function(snapshot) {
			
			var note = snapshot.val();

			// For each note
			for (var key in note) {
				
				// Add it to array
				notes.push({
					title: note[key].title,
					content: note[key].content,
					key: note[key].key
				});
			}

			refreshList();
		});

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

		refreshList()

		// Show the list
		document.getElementById('list').style = 'display: block;';
		// Hide the other modules
		document.getElementById('view').style = 'display: none;';
		document.getElementById('add').style = 'display: none;';
	}

	/**
	 *	Refresh list:
	 *	Repaint the list of the notes array
	 */
	function refreshList() {

		var html = '';

		// Create the list into the html var
		for(var i = 0; i < notes.length; i++) {
			html += '<li><a href="#note/' + i + '">';
			html += notes[i].title;
			html += '</a></li>';
		}

		// Print the note list into the html list
		document.getElementById('note-list').innerHTML = html;
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

		// Add note to firebase
		var FirebaseNotes = Firebase.child("notes");
		FirebaseNotes.push(note);
		// Firebase.parent();

		document.getElementById('add-title').value = '';
		document.getElementById('add-content').value = '';

		listNotes();
	}

})();