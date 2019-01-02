const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.toUpperCase = functions.https.onRequest((request, response) => {
  const text = request.query.text
  console.log(text)
  response.send(text.toUpperCase())
})

// Auth Trigger
exports.createUser = functions.auth.user().onCreate(function(event) {
  const promise = admin.database().ref('users').child(event.uid).set({
    displayName: event.displayName,
    photoURL: event.photoURL,
    email: event.email,
    purchaseHistory: [
      "Nike",
      "Converse",
      "Adidas",
    ]
  })

  return promise
})

// Database Trigger
exports.sanitizedText = functions.database
  .ref("messages/{key}")
  .onWrite(function(snapshot) {
    const text = snapshot.after.val()
    const sanitized = text.replace(/บ้า/g, "***")
    return snapshot.after.ref.set(sanitized)
})
