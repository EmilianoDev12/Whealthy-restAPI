const medicosCtrl = {};
const con = require('../database');

medicosCtrl.actualizarMedico = (req, res) => {
    console.log(req.body);
    const { IdUsuario, IdTipo, NombresMedico, App, Apm, CorreoUsuario, ContraseñaUsuario, SexoMedico, EspecialidadMedica, CedulaProfesional } = req.body;
    con.query('UPDATE MUsuarios SET CorreoUsuario = ?, ContraseñaUsuario = ? WHERE IdUsuario = ?', [CorreoUsuario, ContraseñaUsuario, IdUsuario], (err) => {
        if(err){
            res.send({"err": "1"});
        }else {
            con.query('UPDATE MMedicos SET NombresMedico = ?, ApellidoPaternoMedico = ?, ApellidoMaternoMedico = ?, SexoMedico = ?, EspecialidadMedica = ?, CedulaProfesional = ? WHERE IdMedico = ?',[NombresMedico,App,Apm,SexoMedico,EspecialidadMedica,CedulaProfesional,IdTipo], (erro) => {
                if(!erro){
                    res.send({"succes": "1"});
                }else{
                    res.send({"err" : erro});
                }
            });
        }
    });
}

module.exports = medicosCtrl;