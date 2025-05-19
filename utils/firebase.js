const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  // No storageBucket field here
});

// Now you can use Firestore or Auth without issues
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
