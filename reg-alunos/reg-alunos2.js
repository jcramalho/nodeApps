var http = require('http')
var fs = require('fs')
var qs = require('querystring')
var url = require('url')

http.createServer(function (req, res) {
    if (req.method === "GET") {
        if (req.url === "/registo") {
            res.writeHead(200, {'Content-Type': 'text/html'})
            fs.readFile('form-aluno.html', function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    return res.end("404 form-aluno.html - Não encontrado!")
                }  
                else {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.write(data);
                    return res.end();
                }
            })
        }
        else if (req.url.startsWith("/processaForm")) {
            res.writeHead(200, {'Content-Type': 'text/html'})

            var q = url.parse(req.url, true).query
            var myjson = {}
            myjson.nome = q.nome
            myjson.numero = q.numero
            myjson.curso = q.curso
            res.write('<pre>'+ JSON.stringify(myjson) +'</pre>')
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