Here’s a well-structured **frontend report** for the README file with an explanation of the **flow**:

---

# **Question-Siege Frontend**

---

### **Overview**
The frontend of **Question-Siege** is built using **React.js**, providing a modern and efficient user interface. It communicates with the backend through RESTful APIs to display dynamic content and handle user interactions like gameplay, profile management, and social features (e.g., followings).

---

### **Technology Stack**
- **React.js**: Component-based frontend framework.
- **React-Router**: For client-side routing.
- **Axios**: To handle HTTP requests to the backend API.
- **Bootstrap**: For responsive design and styling.
- **Context API**: To manage global states (like tasks and user authentication).

---

### **Key Features**
1. **Dynamic UI Components**:
   - Reusable components for consistent design across the application.
   - Components include `Header`, `Game`, `Profile`, `Followings`, etc.

2. **Routing**:
   - Managed by `react-router-dom` to navigate between pages.
   - Routes include:
     - `/`: Home Page
     - `/game`: Game Page
     - `/profile`: User Profile Page
     - `/followings`: Followed Users Page
     - `/users`: List of all users.

3. **Game System**:
   - Users can start a new game, answer questions, and track scores.
   - API-driven questions ensure a smooth flow of gameplay.

4. **Social Features**:
   - Users can **follow/unfollow** others.
   - Followed users can be viewed on the "Followings" page.

5. **Authentication**:
   - JWT-based token management with credentials stored in `localStorage`.
   - State is managed through the Context API for global access.

6. **Dark Mode Toggle**:
   - Integrated with an external library like **DarkReader**.
   - Allows users to toggle between light and dark modes.

---

### **Flow of the Application**

1. **Authentication Flow**:
   - The user logs in using their credentials, and a JWT token is saved in `localStorage`.
   - The logged-in user's data (like `username`) is retrieved from the backend using `/api/users/profile`.

2. **Header Navigation**:
   - The `Header` component includes:
     - **Home**: Redirects to the main dashboard.
     - **Game**: Starts a new game.
     - **Followings**: Displays the list of followed users.
     - **Profile**: Redirects to the user’s profile page.
     - **Logout**: Clears the token and reloads the page.

3. **Game Flow**:
   - **Start Game**:
     - Users select categories or random mode to start a new game.
     - API: `POST /api/game/start`
   - **Answer Questions**:
     - Each question is displayed with multiple-choice options.
     - API: `POST /api/game/answer`
   - **End Game**:
     - When the game ends, a summary table displays the answers, correct statuses, and scores.
     - API: `POST /api/game/end`

4. **User Profile**:
   - The `Profile` page retrieves the user's detailed information:
     - API: `GET /api/users/profile/details?name={username}`
   - Displays:
     - Designed questions.
     - Answered questions.
     - Follow and follow status.
   - The "Follow" button allows users to follow/unfollow others.

5. **Followings Page**:
   - Fetches and displays users the logged-in user is following.
   - API: `GET /api/users/followings`

6. **Dark Mode Toggle**:
   - A "Night Mode" button in the header toggles between dark and light modes.

---

### **Folder Structure**

```plaintext
Tree for D:\College\Courses\Web Programming\Project\Repositories\Question-Siege-frontend (excluding ['node_modules', '.git']):
├── .env
├── .gitignore
├── .idea
│   ├── .gitignore
│   ├── Question-Siege-frontend.iml
│   ├── inspectionProfiles
│   │   └── Project_Default.xml
│   ├── modules.xml
│   ├── php.xml
│   ├── vcs.xml
│   └── workspace.xml
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── App.test.js
    ├── assets
    │   └── fonts
    │       ├── IRANSans
    │       │   ├── eot
    │       │   │   ├── IRANSansWeb.eot
    │       │   │   ├── IRANSansWeb_Black.eot
    │       │   │   ├── IRANSansWeb_Bold.eot
    │       │   │   ├── IRANSansWeb_Light.eot
    │       │   │   ├── IRANSansWeb_Medium.eot
    │       │   │   └── IRANSansWeb_UltraLight.eot
    │       │   ├── ttf
    │       │   │   ├── IRANSansWeb.ttf
    │       │   │   ├── IRANSansWeb_Black.ttf
    │       │   │   ├── IRANSansWeb_Bold.ttf
    │       │   │   ├── IRANSansWeb_Light.ttf
    │       │   │   ├── IRANSansWeb_Medium.ttf
    │       │   │   └── IRANSansWeb_UltraLight.ttf
    │       │   ├── woff
    │       │   │   ├── IRANSansWeb.woff
    │       │   │   ├── IRANSansWeb_Black.woff
    │       │   │   ├── IRANSansWeb_Bold.woff
    │       │   │   ├── IRANSansWeb_Light.woff
    │       │   │   ├── IRANSansWeb_Medium.woff
    │       │   │   └── IRANSansWeb_UltraLight.woff
    │       │   └── woff2
    │       │       ├── IRANSansWeb.woff2
    │       │       ├── IRANSansWeb_Black.woff2
    │       │       ├── IRANSansWeb_Bold.woff2
    │       │       ├── IRANSansWeb_Light.woff2
    │       │       ├── IRANSansWeb_Medium.woff2
    │       │       └── IRANSansWeb_UltraLight.woff2
    │       └── icomoon
    │           ├── Read Me.txt
    │           ├── demo-files
    │           │   ├── demo.css
    │           │   └── demo.js
    │           ├── demo.html
    │           ├── fonts
    │           │   ├── icomoon.eot
    │           │   ├── icomoon.svg
    │           │   ├── icomoon.ttf
    │           │   └── icomoon.woff
    │           ├── selection.json
    │           └── style.css
    ├── components
    │   ├── Followings.js
    │   ├── Home
    │   │   └── Home.js
    │   ├── Main
    │   │   └── Main.js
    │   ├── TaskContext
    │   │   └── TasksContext.js
    │   ├── category
    │   │   └── category.js
    │   ├── footer
    │   │   └── footer.js
    │   ├── game
    │   │   └── game.js
    │   ├── header
    │   │   └── header.js
    │   ├── login_signup
    │   │   ├── index.css
    │   │   └── login_signup.js
    │   ├── point
    │   │   └── point.js
    │   ├── profile
    │   │   └── profile.js
    │   ├── question
    │   │   └── question.js
    │   └── user
    │       └── user.js
    ├── index.css
    ├── index.js
    ├── lib
    │   └── utility.js
    ├── reportWebVitals.js
    ├── services
    ├── setupTests.js
    ├── styles
    │   └── global.css
    └── utils
```

---

### **API Integration**

1. **User APIs**:
   - Fetch User Profile: `GET /api/users/profile`
   - Follow a User: `POST /api/users/follow`
   - Fetch Followings: `GET /api/users/followings`

2. **Game APIs**:
   - Start Game: `POST /api/game/start`
   - Submit Answer: `POST /api/game/answer`
   - End Game: `POST /api/game/end`

3. **Profile APIs**:
   - Get User Details: `GET /api/users/profile/details?name={username}`

4. **Category APIs**:
   - Fetch Categories: `GET /api/category`

---

### **Key Components**

1. **Header.js**:
   - Navigation links and actions (home, profile, followings, logout, night mode).

2. **Game.js**:
   - Displays questions and manages the game flow.

3. **Profile.js**:
   - Shows the user’s profile, games, and designed questions.

4. **Followings.js**:
   - Fetches and displays the followed users.

---

### **How It Works**
- **State Management**: Managed via React hooks and Context API.
- **API Communication**: All dynamic data is fetched using `Axios` with JWT tokens for secure communication.
- **Routing**: `react-router-dom` ensures seamless navigation between pages.

---

### **Conclusion**
The frontend of **Question-Siege** is a dynamic, responsive, and feature-rich application that interacts efficiently with the backend. The use of React.js ensures component reusability, maintainability, and scalability for future enhancements. Key features like the game system, user profiles, and followings functionality are seamlessly integrated to provide a smooth user experience.
