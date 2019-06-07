# 0.5: Single page app

Create a diagram depicting the situation where the user goes to the single page app version of the notes app at https://fullstack-exampleapp.herokuapp.com/spa.
## Solution:

### Secuence Diagram Image:

![excercice 0.5: Single page app](5_new_note.png)

### Secuence Diagram Code:

```code:
note over browser:
user send new post using the form-element "input"
writes the note "note text..." on the text input and click save button
end note
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note right of browser:
form-parameters: [note: "note text..."]
end note
server-->browser: HTTP REDIRECT (302) https://fullstack-exampleapp.herokuapp.com/notes 

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

