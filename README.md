# Angularjs Skills Test
A sample project for testing skills in AngularJS.

## Prerequisites
- Install nodejs from https://nodejs.org/
- So in a terminal run
    - Install gulp: npm install gulp-cli -g then npm install gulp -D
    - Install json-server: npm install json-server -g

## Getting started
- clone the project
- into the project folder run:
    - run `npm install` and `bower install` to install dependencies
    - run `gulp` to serve the project
    - run `json-server -p 4000 -w server/db.json` to serve the web api

## Tasks

### Implement "Welcome"
Implement a welcome feature based on [this mockup](mockups/welcome.png).
Sliced images can be found [here](mockups/slices).
It would be nice to apply some CSS3 animations on the logo.

After the user sees the welcome view for the fist time, it should never appear again.

### Implement "Events"
Create a calendar as shown in [this mockup](mockups/events.png), using a jquery/javascript plugin.
I would recommend you to use [CLNDR.js](https://github.com/kylestetz/CLNDR), but if you prefer to use another plugin, feel free to do so.
The plugin should be wrapped inside an angular directive.

The calendar displays the days which have associated events and the number of events for each day.
The list of events can be grabbed from `http://localhost:4000/events` after running `json-server`.

Tapping on a day, should display the events that are available for that specific day.
There isn't any mockup for the list of events. It's up to you to decide on the design.

Finally, "Events" tab should be opened first when you enter inside tabs view.
In other words it should be the home tab.

### Add "Contacts"
Add another tab named "Contacts".
If you are thinking that it should display a list of contacts, well, you guessed it right ;)
This list can be grabbed from `http://localhost:4000/contacts` after running `json-server`.
Tapping on a contact should make the app go to "Video Call", which will not be a tab anymore.

### "Favourite contact" feature 
Add the possibility to mark the contact as favourite.
This functionality should be accessible from both "Contacts" tab and "Video Call" tab.

The contacts endpoint mentioned above, is RESTful. Use it for saving changes that are made to contacts.

### Fix "Video Call"
Well guys, there is an evil little bug here and we don't want it, right?
So this let's teach to this guy that there is no room for him in our project.

---
Good luck!