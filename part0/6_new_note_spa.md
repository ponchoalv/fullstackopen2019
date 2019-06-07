# 0.6: New note SPA

Create a diagram depicting the situation where the user goes to the single page app version of the notes app at https://fullstack-exampleapp.herokuapp.com/spa.
## Solution:

### Secuence Diagram Image:

![excercice 0.6: New note SPA](6_new_note_spa.png)

### Secuence Diagram Code:

```code:
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders, using the function redrawNotes(), 
notes to display on the document
end note
note over browser:
user send new post using the form-element "input"
writes the note "note text..." on the text input and click save button
end note

browser -> browser: Browser add (push) the new note on the notes Array. 

browser -> browser: Browser redraw notes on the DOM.  

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
note right of browser:
content-type: application/json
payload: {"content":"Helloooooo!!","date":"2019-06-07T15:09:08.920Z"}
end note
server-->browser: HTTP 201 https://fullstack-exampleapp.herokuapp.com/notes 
note left of server:
response-payload: {"message":"note created"}
end note

note over browser:
browser executes the event handler
that renders notes to display
end note
```