Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

POST to the address:
	https://studies.cs.helsinki.fi/exampleapp/new_note_spa

Containing ->
Content-type: application/json
request: {"content":"this is not a new note",
          "date":"2023-02-14T16:07:24.327Z"}

Server response with 201 Created.
response: {"message":"note created"}

The code to for handling the notes logic now lives in the browser
The code adds an event handler to the form when the form submits.
This event handler creates a note object with the content of the form as well as a Date timestamp.
It then adds this newly created note to a local array of notes.
Then it executes the function "redrawNotes" which takes all the notes from the notes array and fills the unordered list on the webpage with the notes.
Finally it sends the newly created note to the server for the server with the function 'sendToServer'.
The send to server function submits a POST request to '/new_note_spa' with the note as well as setting the request header to 'Content-type: application/json'


