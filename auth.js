import { signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAu2w54D_RQKFPqK6yBwJa-KY6bSRAq7xY",
    authDomain: "copy-check-7dbd8.firebaseapp.com",
    projectId: "copy-check-7dbd8",
    storageBucket: "copy-check-7dbd8.firebasestorage.app",
    messagingSenderId: "760648212989",
    appId: "1:760648212989:web:847465efbe7baacaba7994",
    measurementId: "G-NCDX33F3LE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const PARENT_FRAME = document.location.ancestorOrigins[0];

function sendResponse(result) {
  globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener('message', function({data}) {
  if (data.initAuth) {
    signInWithPopup(auth)
      .then(sendResponse)
      .catch(sendResponse);
  }
});