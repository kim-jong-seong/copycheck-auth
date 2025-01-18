import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const PARENT_FRAME = document.location.ancestorOrigins[0];

function sendResponse(result) {
    globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

// Firebase에 새 사용자 생성 함수
async function createNewUser(email) {
    try {
        const userRef = doc(db, 'users', email);
        await setDoc(userRef, {
            email: email,
            isPremium: true,
            createdAt: new Date()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
}

globalThis.addEventListener('message', async function({data}) {
    if (data.initAuth) {
        try {
            const result = await signInWithPopup(auth, provider);
            // 새 사용자 데이터 생성
            if (result.user && result.user.email) {
                await createNewUser(result.user.email);
            }
            sendResponse(result);
        } catch (error) {
            sendResponse(error);
        }
    }
});