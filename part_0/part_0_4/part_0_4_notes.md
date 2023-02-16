1. User inputs text into the form element (<input type="text" name="note">)
2. User presses the save button (<input type="submit" value="Save">)
3. When the save button is pressed, the browser sends the value/input from the form element to the server.
4. Submitting causes no fewer than five HTTP requests.
  - The first one is the form submit event.
    - it is an HTTP post requests that is sent to the address "app_url"/new_note
    - The server responds with a 302 HTTP status code. The 302 status code is a redirect code which causes the browser to redirect to the URL given in the Location section of the Response header.
    - This causes the browser to reload the Notes page. 
    - This causes three more HTTP requests. One for the style sheet, one for the JS code and one for the raw data of the notes.

5. The form tag has the attributes *action* and *method*. The value of the *method* attribute is 'POST' which indicates that this form will submit a POST request to the server. The value of the *action* attribute is '/new_note' which means the POST request will be sent to the address '/new_note'
6. The server has some code defined to handle requests to the '/new_note' address. This code receives a POST requests, where the text the user submitted is embedded as the body of said request.
7. This code then creates a new note object with the content corresponding to the note the user sent as well as adding a timestamp to the object. This object is then added to an array of notes objects which the server sends to the user as data.json

---

User inputs text and presses save/submit 
  -> browser takes the value of the form and submits it via POST request to the address '/new_note'
  -> The server receives the POST requests and handles with with a function.
  -> The function creates a new note object where the content is found in the body of the post request. This function also adds a date to the object and the pushes this object to an array of notes objects.
  -> The function finally returns a redirect to a new address located at '/notes'
  -> From the browsers point of view, the browser simply sent a POST request and received a response with the HTTP 302 status code which tells the browser to redirect to '/notes'
  -> The browser then loads '/notes' which to the user looks like the page is simply being reloaded
  -> When the browser loads '/notes' the server sends the newly updated data.json (which contains the array of notes objects) as well as the javascript code and the stylesheet for the page.
  -> The user can now see their new note among the old notes.
