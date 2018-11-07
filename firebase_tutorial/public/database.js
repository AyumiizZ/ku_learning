firebase.database().ref().on('value',function(snapshot){
    document.getElementById('realtime-data').innerText = snapshot.val()
});