var fs = require('fs');  // file system

var rstream = fs.createReadStream('data.txt', {
	autoClose: false
});


rstream
  .on('data', function (chunk) {
  	console.log({chunk})
  })
  .on('end', function () {  // done
    console.log('end');
  });