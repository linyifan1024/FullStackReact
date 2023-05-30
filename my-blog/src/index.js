import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQFclaI7h9bWiBl4TRzAoENsv3Fc5CHdA",
  authDomain: "fullstack-a641f.firebaseapp.com",
  projectId: "fullstack-a641f",
  storageBucket: "fullstack-a641f.appspot.com",
  messagingSenderId: "319320706020",
  appId: "1:319320706020:web:8166895dca7775dd8215f1",
  measurementId: "G-9KD9C361YD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
