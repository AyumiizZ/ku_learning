let file
let uploadTask

function addFile() {
  file = document.getElementById('input-file').files[0];
  console.log(file);
}

function upload() {
  uploadTask = firebase.storage().ref(file.name).put(file);

  uploadTask.on(
    'state_changed',
    function onProgress(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('progress').innerHTML = `Uploading progress: <progress value="${progress}" max="100"></progress>`;
    },
    function onError(error) {

    },
    function onComplete() {
      firebase.storage().ref(file.name).getDownloadURL().then(function (url) {
        document.getElementById('progress').innerHTML = `Completed!! <a href="${url}">Download here</a>`
        firebase.database().ref('files').push({
          name: file.name,
          url: url,
        });
      });
    }
  );
}

function pause() {
  uploadTask.pause()
}

function resume() {
  uploadTask.resume()
}

function cancel() {
  uploadTask.cancel()
}

firebase.database().ref('files').on('value', function (snapshot) {
  const value = snapshot.val();
  const list = Object.values(value);
  document.getElementById('file-list')
  for (let file of list) {
    document.getElementById('file-list').innerHTML += `<a href="${file.url}">${file.name}</a><br>`
  }
})