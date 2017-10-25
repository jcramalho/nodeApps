var http = require('http')
var fs = require('fs')
var qs = require('querystring')
var url = require('url')
var pug = require('pug')

// Compile template source code
const formatador = pug.compileFile('aluno-recebido.pug')
const formataForm = pug.compileFile('form-aluno.pug')

http.createServer(function (req, res) {
    if (req.method === "GET") {
        if (req.url === "/registo") {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(formataForm())
        }
        else if (req.url.startsWith("/processaForm")) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            var q = url.parse(req.url, true).query
            // cria uma representação HTML do registo recebido
            res.write(formatador(q))
            res.end()
        }
        else { // Outros URL no método GET
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 " + req.url + " - Não está disponível!")
        }
    } 
    else { // Outros métodos
        res.writeHead(404, {'Content-Type': 'text/html'})
        return res.end("404 " + req.method + " - Ainda não temos respostas para esse método!")
    }
}).listen(2222)

console.log('Servidor à escuta na porta: 2222')