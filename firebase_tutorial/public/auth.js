function createUser() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    const user = firebase.auth().currentUser
    user.sendEmailVerification().then(function(){
      alert('Email verification has been sent')
    })
  })
}

function loginWithEmail() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
}

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
}

function logout() {
  firebase.auth().signOut()
  // .then(function () {
  //   const user = firebase.auth().currentUser
  //   document.getElementById('auth-info').innerText = JSON.stringify(user, null, 2)
  // })
}

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    // Signed in
    const user = firebase.auth().currentUser
    document.getElementById('auth-info').innerText = JSON.stringify(user, null, 2)
  }
  else{
    // Signed Out
    document.getElementById('auth-info').innerText = "No user"
  }
})