# React Firebase Chat App

This is a simple chat application built with React and Firebase, allowing users to send text messages, upload images, and use emojis. Users can log in by entering their username, and their messages will be displayed in real-time in the chat room.

Live demo [HERE](https://chatnow-668cb.web.app/)

## Features

-   User authentication using Firebase Authentication.
-   Real-time chat updates using Firebase Firestore.
-   Image upload functionality using Firebase Storage.
-   Emoji picker for adding emojis to messages.

## Installation

1.  Clone the repository:
    
    
    `git clone https://github.com/your-username/react-firebase-chat-app.git
    cd react-firebase-chat-app` 
    
2.  Install dependencies:
    
    
    `npm install
    or
    yarn install` 
    
3.  Create a Firebase project:
    
    -   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    -   Enable the Authentication and Firestore services in the Firebase project settings.
4.  Set up Firebase configuration:
    
    -   Copy your Firebase configuration object from the Firebase Console (Settings > General > Your apps > Firebase SDK snippet) and replace the configuration in `src/firebase-config.js` with your own.
5.  Set up Firebase Storage rules:
    
    -   In the Firebase Console, go to the Storage section and set the following rules:
    
    `rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write;
        }
      }
    }` 
    
6.  Run the development server:
   
    
    `npm start
    or
    yarn start` 
    
7.  Open the application in your browser:
    
    The development server will start, and the chat app will be accessible at [http://localhost:3000](http://localhost:3000/).
    

## Usage

-   Enter your desired username to log in to the chat room.
-   Type your message in the input field and click "Send" to send a text message.
-   Click on the emoji button (😊) to open the emoji picker and select an emoji to add to your message.
-   To upload an image, click the "Choose File" button and select an image from your device.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request or submit an issue in the repository.

