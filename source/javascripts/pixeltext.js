var convertImage = function(imageSource) {
  var img,
    canvas,
    canvasContext,
    dataURL,
    imageData,
    pixels,
    pixelString;

  pixelString = "";
  img = new Image;
  img.src = imageSource;

  canvas = document.createElement('canvas'),
  canvasContext = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;

  canvasContext.drawImage(img,0,0);

  imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  px = imageData.data;

  for (var i = 0; i < px.length; i += 4) {
    if (px[i] == px[i+1] && px[i] == px[i+2] && px[i+3] == 255) {
      pixelString = pixelString + String.fromCharCode(px[i]);
    } else {
      alert("Image isn't greyscale!")
      break;
    }
  }

  return pixelString
}

var readerOnLoadFunction = function(theFile) {
  return function(e) {
    var imageString,
      downloadLink,
      stringArea;

    // convert file and get data blob
    imageString = convertImage(e.target.result);
    stringArea = document.getElementById("stringArea");
    stringArea.innerHTML = imageString;
  };
}

var handleFileSelect = function (evt) {
  var files,
    file,
    reader;

  evt.stopPropagation();
  evt.preventDefault();

  files = evt.dataTransfer.files; // FileList object.
  file  = files[0]; // grab first file

  reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (readerOnLoadFunction)(file);
  // Read in the image file as a data URL.
  reader.readAsDataURL(file);
}

var handleDragOver = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

document.addEventListener("DOMContentLoaded", function() {
  // Setup the dnd listeners.
  var dropZone;

  dropZone = document.getElementById("pixeltext");

  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
});
