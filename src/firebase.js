import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ4DJ-drwe9MyhK4rsGGXnSZ-5QQQm86A',
  authDomain: 'slack-clone-e9e5e.firebaseapp.com',
  projectId: 'slack-clone-e9e5e',
  storageBucket: 'slack-clone-e9e5e.appspot.com',
  messagingSenderId: '533918331382',
  appId: '1:533918331382:web:0bdd62ae25b1fb9ff917d7',
  measurementId: 'G-XBN8S3TZQK',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
