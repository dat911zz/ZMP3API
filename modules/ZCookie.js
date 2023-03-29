const ZingMp3 = require('./ZingMp3');
const request = require('request');
const firebase = require('firebase/app');
require('firebase/database');
const encrypt = require('./encrypt');

const firebaseConfig = {
    apiKey: "AIzaSyDuzN79Vcy1W1b3sL3mMRjRjuOFBwz6tRk",
    authDomain: "cringempone-351c7.firebaseapp.com",
    projectId: "cringempone-351c7",
    storageBucket: "cringempone-351c7.appspot.com",
    messagingSenderId: "686832790049",
    appId: "1:686832790049:web:c0e2cea6e6a12bfdf0d160",
    measurementId: "G-VQ81H3RS4L"
};

class ZCookie {
    URL_API = "";
    constructor() {
        this.URL_API = "";
    }
    // Initialize firebase app with your config object
    initFirebase(firebaseConfig) {
        firebase.initializeApp(firebaseConfig);

        // Use the downloaded private key to authenticate
        const serviceAccount = require('./firebase/serviceAccountKey.json');
        firebase.auth().signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(null, serviceAccount)
        );
    }
    // Save cookies to Firebase Database
    saveCookies(cookiePath, cookiejar) {
        const cookies = cookiejar.getCookiesSync(URL_API).join(''); // Get cookies as a string
        const encryptedCookies = encrypt(cookies); // Encrypt cookies

        database.ref(cookiePath).set(encryptedCookies); // Save encrypted cookies to database
    }

    // Load cookies from Firebase Database
    loadCookies(cookiePath, cookiejar) {
        database.ref(cookiePath).once('value')
            .then((snapshot) => {
                const encryptedCookies = snapshot.val();
                if (encryptedCookies) {
                    const cookies = encrypt(encryptedCookies, true); // Decrypt cookies
                    const parsedCookies = request.cookie(cookies); // Parse cookies
                    cookiejar.setCookieSync(parsedCookies, URL_API); // Set cookies in cookie jar
                }
            });
    }
}


module.exports = new ZCookie();