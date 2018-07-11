const express = require('express')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const net = require('net');
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const binPath = path.join('')


app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/hehe', function (req, res) {
	fs.writeFileSync('scripts/vars.json', JSON.stringify(req.query));

	const child = spawn("C:\\Program Files\\Adobe\\Adobe Photoshop CC 2015\\Photoshop.exe", ["C:\\Users\\khanhpro\\Documents\\Code\\psd\\scripts\\test.jsx"]);

	var client = new net.Socket();

	client.connect(8888, '127.0.0.1', function() {
		console.log('Connected to socket server successfully');
	});

	client.on('data', function(data) {
		data = JSON.parse(data)
		if (data.action !== 'welcomeMsg') {
			res.json(data)
			client.end()
		} else {
			console.log(data)
		}
	});

	client.on('error', function(error) {
		console.log('Error: ', {error: error});
		res.json({
			error: true
		})
	});

	child.on('exit', exit => console.log({exit}))
})

app.listen(80, () => console.log('Web app listening on port 80!'))



