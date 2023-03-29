const admin = require('firebase-admin');
const serviceAccount = require('../firebase/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Write cookie data to Firestore
async function writeCookieData(cookieName, cookieData) {
    const cookiesRef = admin.firestore().collection('cookies');
    await cookiesRef.doc(cookieName).set({ data: cookieData });
}

// Read cookie data from Firestore
async function readCookieData(cookieName) {
    const cookiesRef = admin.firestore().collection('cookies');
    const cookieDoc = await cookiesRef.doc(cookieName).get();
    if (!cookieDoc.exists) {
        return null;
    }
    return cookieDoc.data().data;
}

module.exports = {writeCookieData, readCookieData}