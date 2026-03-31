# Guidebooking Vancouver


## Overview
Guidebooking Vancouver is a client-side JavaScript web application that helps users discover and explore events in Vancouver. The app displays a list of local events, each with details such as name, location, type, and an image. Users can browse the list and add events to the itinerary for easy access later.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for storing user favorites.

---


## Features

- Browse a list of events with images and details
- Add and remove events to and from itinierary
- Create events and add them to the database
- View events on a dynamically loaded map
- Responsive design for desktop and mobile

---


## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase for hosting
- **Database**: Firestore

---


## Usage

To run the application locally:

1.  **Clone** the repository.
2.  **Install dependencies** by running `npm install` in the project root directory.
3.  **Start the development server** by running the command: `npm run dev`.
4.  Open your browser and visit the local address shown in your terminal (usually `http://localhost:5173` or similar).

Once the application is running:

1.  Browse the list of hiking trails displayed on the main page.
2.  Click the heart icon (or similar) to mark a trail as a favorite.
3.  View your favorite hikes in the favorites section.

---


## Project Structure

```
elmo-hikes/
├── src/
│   ├── main.js
├── styles/
│   └── style.css
├── public/
├── images/
├── index.html
├── package.json
├── README.md
```

---


## Contributors
- **Bill** - BCIT CST first term student with no prior experience attempting first project. Has an interest in the outdoors and food. 
- **Luka Gajic** - BCIT CST Student in comp 1800. 
- **Oliver Wright** - BCIT CST Student with a perfectly normally sized dice collection. Fun fact: Types at 110 wpm average.

---


## Acknowledgments

- Trail data and images are for demonstration purposes only.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/) and images from [Unsplash](https://unsplash.com/).

---


## Limitations and Future Work
### Limitations

- Limited security features
- Limited customizable features

### Future Work

- Implement ability to share itineraries.
- Add filtering and sorting options (e.g., by type, distance from user).
- Create a dark mode for better usability in low-light conditions.

---


## License

This project is licensed under the MIT License. See the LICENSE file for details.
