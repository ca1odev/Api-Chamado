# api de chamados

api para controlar chamados de suporte técnico usando node.js, express e postgresql.

## instalação

npm i express
npm i pg

## banco

execute o arquivo database.sql no postgresql e depois coloque sua senha no arquivo db.js.

## iniciar

npm start

servidor na porta 3000.

## tokens

tecnico123
admin123

## rotas

get /chamados
get /chamados/:id
post /chamados
patch /chamados/:id/assumir
patch /chamados/:id/finalizar
delete /chamados/:id
get /chamados/estatisticas
