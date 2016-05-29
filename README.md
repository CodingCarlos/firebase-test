# firebase-test
Un repositorio para colgar las pruebas de firebase. El proceso despiezado está en https://medium.com/p/bcd7f822fa26

## Funciones utilizadas
Listado de funciones utilizadas, y breve documentación sobre ellas:

- [new Firebase](#new-firebase)
- [.child()](#child)
- [.push()](#push)


### new Firebase
Para usar la API de Firebase, simplemente tienes que crear una nueva conexión. Esto se hace así:
` var Firebase = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/"); `
Pon tu app en lugar de ese texto dummy, y listo, a usar Firebase.


### .child()
La función .child tiene dos usos: Crear una referencia a una estructura hija, y crear un enlace de recogida de datos para una estructura hija. La diferencia será si le pones un .on o no.

####  - Crear una referencia:
```
var FirebaseNotes = Firebase.child("notes");
FirebaseNotes.push(note);
```
El push se hará dentro de un elemento "notes"

####  - Crear un enlace:
```
Firebase.child("notes").on("value", function(snapshot) {
	// For each update, execute this function
	var note = snapshot.val(); // This is an object
	
	console.log(note);
}
```
Se recibirán los datos que haya anidados al elemento "nodes" (sus hijos) cada vez que se actualicen.


### .push()
Como si de un array se tratase, añadirá un nuevo elemento como parte de un listado. Es recomendable definir un padre antes de nada, aunque no es necesario.
```
var note {
	title: 'I am a note',
	content: 'And I have a lot of things to say.'
}
var FirebaseNotes = Firebase.child("notes");	// This is the father, notes (imagine an array)
FirebaseNotes.push(note);						// Push a new note ^^
```
