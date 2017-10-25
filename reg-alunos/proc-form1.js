var http = require('http')
var fs = require('fs')
var qs = require('querystring')
var url = require('url')

http.createServer(function (req, res) {
    if (req.method === "POST") {
        var requestBody = ''
        req.on('data', function(data) {
          requestBody += data
          if(requestBody.length > 1e7) {
            res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'})
            res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>')
          }
        })
        req.on('end', function() {
          var formData = qs.parse(requestBody);
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write('<!doctype html><html><head><title>Resposta</title></head><body>')
          res.write('Envio de dados:<br />Utilizador: ' + formData.pnome + " " + formData.unome)
          res.write('<br />Sexo: ' + formData.sexo)
          res.end('</body></html>')
        })
    } 
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('form1.html', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'})
                return res.end("404 form1.html - Não encontrado!")
            }  
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
}).listen(7777)

console.log('Servidor à escuta na porta: 7777')