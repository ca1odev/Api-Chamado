export function validarChamado(req,res,next){
 const {titulo,descricao,setor,prioridade}=req.body;
 if(!titulo||!descricao||!setor||!prioridade)return res.status(400).json({erro:'titulo, descricao, setor e prioridade são obrigatórios'});
 next();
}
