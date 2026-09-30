export function somenteAdmin(req,res,next){
 if(!req.usuario||req.usuario.tipo!=='admin')return res.status(403).json({erro:'você não tem permissão para realizar esta operação'});
 next();
}
