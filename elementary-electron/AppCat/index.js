var catPic = require('cat-picture');
var image = require('lightning-image-poly');
var remote = require('electron').remote;
var fs = require('fs');

var src = catPic.src;
catPic.remove();
var viz = new image('#visualization', null, [src], {hullAlgorithm: 'convex'});

function writePDFHandler (err) {
  if (err) alert('error generating pdf! ' + err.message);
  else alert('pdf saved!');
}

function printPDFHandler (err, data) {
  fs.writeFile('annotation.pdf', data, writePDFHandler);
}

function save () {
  remote.getCurrentWindow().webContents.printToPDF({ portrait: true },
                                                   printPDFHandler);
}

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 80) {
    save();
  }
});
