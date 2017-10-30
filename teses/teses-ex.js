var http = require('http')
var fs = require('fs')
var qs = require('querystring')
var url = require('url')
var pug = require('pug')

// Compile template source code
const ackTese = pug.compileFile('tese-recebida.pug')
const askTese = pug.compileFile('form-tese.pug')

http.createServer(function (req, res) {
    if (req.method === "GET") {
        if (req.url === "/registo") {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(askTese())
        }
        else { // Outros pedidos no método GET
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 " + req.url + " - Não está disponível!")
        }
    } 
    else if (req.method === "POST"){ // pedidos post
        if (req.url.startsWith("/processaForm")){
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
              res.write('<pre>'+ JSON.stringify(formData) + '</pre>')
              res.end('</body></html>')
            })
        }
        else { // outros pedidos POST
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 " + req.url + " - Não está disponível!")
        }
    }
    else { // outros métodos
        res.writeHead(404, {'Content-Type': 'text/html'})
        return res.end("404 " + req.method + " - Ainda não temos respostas para esse método!")
    }
}).listen(2222)

console.log('Servidor à escuta na porta: 2222')