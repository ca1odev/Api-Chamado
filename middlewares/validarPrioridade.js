export function validarPrioridade(req,res,next){
 if(!['baixa','media','alta'].includes(req.body.prioridade))return res.status(400).json({erro:'prioridade deve ser baixa, media ou alta'});
 next();
}
