#include "libs/JSON.jsxinc"

app.displayDialogs = DialogModes.NO;

const projectRoot = '/c/Users/khanhpro/Documents/Code/psd'
const targetDoc = app.open(new File(projectRoot + "/psd-files/b.psd"))

const sampleDoc = app.open(new File(projectRoot + "/psd-files/cuaso2.psd"))


var vars = new File(projectRoot + '/scripts/vars.json');  

vars.open('r');  

const content = JSON.parse(vars.read());  

const newPNG = thayCuaSo(content.src, content.des)

closePhotoshop()

var socket = new Socket;

if (socket.open("127.0.0.1:8888")){
	socket.write(JSON.stringify({
		action: 'thaycuaso',
		status: 'ok',
		data: {
			'png': newPNG
		}
	}));
	socket.read()
	socket.close();
}

vars.close();  



function thayCuaSo(tenCuaSoMuonThay, tenCuaSoMoi) {
    const layerSrc = timLayer(targetDoc, tenCuaSoMuonThay)
    const layerDes = timLayer(sampleDoc, tenCuaSoMoi)

    const newLayer = layerDes.duplicate(targetDoc)
	
	app.activeDocument = targetDoc
	
	const translateX = layerSrc.bounds[0] - newLayer.bounds[0]
	const translateY = layerSrc.bounds[1] - newLayer.bounds[1]
	
	newLayer.translate(translateX, translateY)

	layerSrc.remove()

	var fileName = Math.random() + '.png'
	var newFile = new File(projectRoot + '/public/output/' + fileName)

	const options = new PNGSaveOptions
	options.compression = 9

	app.activeDocument.saveAs(newFile, options, true)

	return fileName
}

function timLayer(doc, tenLayer) {
    for (var i = 0; i < doc.layers.length; i++) {  
        if (doc.layers[i].name === tenLayer) return doc.layers[i]
    }

    return null
}

function closePhotoshop() {
	while(app.documents.length > 0) {  
    	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    }  
}