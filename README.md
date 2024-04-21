# Kitchen-Kingdom-AI


## Introduction

Kitchen-Kingdom-AI is an innovative application that leverages artificial intelligence to assist users in the kitchen. Whether you're a seasoned chef or a novice cook, this application aims to simplify the cooking process by providing recipes and generating images of dishes with just a few clicks.

## Project Type
Fullstack

## Deployed App
- Frontend: http:https://kitchen-kingdom-ai.vercel.app/
- Backend: https://kitchen-kingdom-ai-q6fy.onrender.com

## Directory Structure
```bash
Kitchen-Kingdom-AI/
├─ Backend/
│   ├─ .env
│   ├─ node_modules/
│   ├─ server.js
│   ├─ package.json
│   └─ package-lock.json
├─ Frontend/
│   ├─ dist/
│   ├─ node_modules/
│   ├─ public/
│   ├─ src/
│   │   ├─ components/
│   │   │   ├─ navbar.jsx
│   │   │   ├─ privateroute.jsx
│   │   │   ├─ recipedetailsmodal.jsx
│   │   │   ├─ recipeeditmodal.jsx
│   │   │   ├─ recipesearch.jsx
│   │   │   ├─ spinner.jsx
│   │   │   └─ uploadwidget.jsx
│   │   ├─ pages/
│   │   │   ├─ auth/
│   │   │   │   ├─ forms/
│   │   │   │   │   ├─ loginForm.jsx
│   │   │   │   │   └─ registerForm.jsx
│   │   │   │   └─ authLayout.jsx
│   │   │   ├─ createRecipe.jsx
│   │   │   ├─ myRecipes.jsx
│   │   │   └─ savedRecipes.jsx
│   │   ├─ redux/
│   │   │   ├─ user/
│   │   │   └─ store.js
│   │   ├─ styles/
│   │   │   ├─ authLayout.css
│   │   │   ├─ create-recipe.css
│   │   │   ├─ home.css
│   │   │   ├─ navbar.css
│   │   │   └─ register.css
│   │   ├─ App.css
│   │   ├─ App.jsx
│   │   ├─ constants.js
│   │   ├─ index.css
│   │   └─ main.js
│   ├─ .eslintrc.cjs
│   ├─ .gitignore
│   ├─ index.html
│   ├─ package.json
│   ├─ package-lock.json
│   └─ vite.config.js
├─ .gitignore
└─ README.md

```

## Features
- **Recipe Generation:** Users can request recipes for various dishes by providing the dish name, and the application will generate detailed recipes, including ingredients, instructions, and additional add-ons.
- **Save Recipe:** Users can save recipes to the database and view them later on the recipe page.
- **Image Generation:** Users can request images of dishes, and the application will utilize AI to generate images based on the dish name.
- **Secure Authentication and Login Functionality:** Implemented a secure login mechanism using password hashing.


## Installation & Getting started
To run the backend server 

```bash
cd Backend
npm install 
npm run start
```
```bash
cd FrontEnd
npm install
npm run dev
```


## API Endpoints

- POST / - Create a recipe
- POST /dish - Generate an image of a dishe


## Technology Stack
- **Gen-ai:** Utilized for generating content and images using AI capabilities.
- **Node.js:** Server-side JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens):** Used for secure authentication and authorization.
- **React:** JavaScript library for building user interfaces.




