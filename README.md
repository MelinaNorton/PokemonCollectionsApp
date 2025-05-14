# Pokémon Collections App

A fan-driven web application to search, collect, and manage your favorite Pokémon. Powered by PHP, jQuery/AJAX, and the RapidAPI Pokémon API.

---

##  Tech Stack

- **Frontend**  
  - HTML5 & CSS3  
  - JavaScript & jQuery  
  - AJAX for dynamic API requests  
- **Backend**  
  - PHP 7.x+  
  - MySQL (or MariaDB)  
- **API**  
  - [Pokémon API via RapidAPI](https://rapidapi.com/) (credited in-app)  
- **Version Control**  
  - Git  

---

##  Key Features

1. **User Authentication**  
   - Secure login & session management in PHP  
   - New users register, existing users sign in  

2. **Pokémon Search**  
   - Search by **name**, **type**, or **ID**  
   - Real-time lookup via AJAX calls to the RapidAPI Pokémon API  
   - **Fallback**: if no results, a random Pokémon appears  

3. **Building Your Collection**  
   - Click any search result to **add** that Pokémon to your personal collection (stored in SQL)  
   - **Double-click** a search result to open a detailed “card” view  

4. **Collection Management**  
   - **View Your Collection**: load all your Pokémon from the database  
   - **Delete** a Pokémon by clicking its entry in your collection  
   - **Favorite** a Pokémon by tapping the heart icon on its card  
   - **Toggle Favorites-Only**: filter your collection to show only favorited Pokémon  
---
##  Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-org/pokemon-collections-app.git
   cd pokemon-collections-app
  
