# NetflixGPT

- Create-React-App
- Configured TailwindCSS
- use npm i -D react-router-dom this for routing
- Login In page
  - use the usestate hooke functionality to handle the signup and signIn form
  - Add form validation
- Use Firebase For Authentication
  - run command - npm install -g firebase-tools, firebase login, firebase init, npm run build, firebase deploy
  - Deploying our app inthe production
- Create SignUp/ SignIn User Account via firebase Authentication
- use redux toolkit for store the user details
  - npm i -D @reduxjs/toolkit, npm i react-redux
  - first thing we will create a store
  - second we will create slice
  - then i added the slice reducer onto my store
  - then i am providing my store in main app
  - dispatch and navigate 
  - show the Header according the user selector
  - Implement Sign Out
  - Update Profile
- Fetch from TMDB Movies

# Features

- Login/Sign UP
  - Sign In/ Sign up Form
  - redirect to Browse Page
- Browse (after authentication)
  - Header
  - Main Movie
    - Trailer in Background
    - Title & Description
    - MovieSuggestion
- NetflixGPT
  - Search Bar
  - Suggestion
