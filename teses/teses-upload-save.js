var http = require('http')
var fs = require('fs')
var formidable = require('formidable')
var url = require('url')
var pug = require('pug')
var util = require('util')

// Compile template source code
const ackTese = pug.compileFile('tese-recebida.pug')
const askTese = pug.compileFile('form-tese2.pug')

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
            var form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {'content-type': 'text/html'})
                fields.fnome = files.fich.name
                
                var fenviado = files.fich.path;
                var fnovo = './uploaded/' + files.fich.name;
                fs.rename(fenviado, fnovo, function (err) {
                    if (!err) {
                        fields.status = "Ficheiro recebido e gravado com sucesso."
                    }
                    else {
                        fields.status = "Ocorreram erros na gravação do ficheiro enviado."
                    }
                
                res.write(ackTese(fields))
                console.log(JSON.stringify(fields))
                console.log(JSON.stringify(files))
                res.end()
                })
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