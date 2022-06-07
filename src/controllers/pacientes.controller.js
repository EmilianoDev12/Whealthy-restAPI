const pacientesCtrl = {};
const con = require('../database');

pacientesCtrl.actualizarPaciente = (req, res) =>{
    const { IdUsuario, IdTipo, NombresPaciente, App, Apm, CorreoUsuario, ContraseñaUsuario } = req.body;
    con.query('UPDATE MUsuarios SET CorreoUsuario = ?, ContraseñaUsuario = ? WHERE IdUsuario = ?',[CorreoUsuario, ContraseñaUsuario, IdUsuario], (err) => {
        if(err){
            res.send({"err":err});
        }else{
            con.query('UPDATE MPacientes SET NombresPacientes = ?, ApellidoPaternoPaciente = ?, ApellidoMaternoPaciente = ? WHERE IdPaciente = ?',[NombresPaciente, App, Apm, IdTipo], (err) => {
                if(!err){
                    res.send({"succes":"1"});
                }else{
                    res.send({"err":err});
                }
            });
        }
    });
}

pacientesCtrl.buscarFich = (req, res) => {
    const { IdTipo } = req.body;
    con.query('SELECT * FROM MPacientes WHERE IdPaciente = ?',[IdTipo],(data, err) => {
        if(!err){
            res.send(data);
        }else{
            res.send(err)
        }
    });
}

pacientesCtrl.actualizarFich = (req, res) => {
    const { Ano, Mes, Dia, Nacio, Reli, Late, Sex, Tel, Ocu, IdTipo } = req.body;
    console.log(Tel);
    con.query('UPDATE MPacientes SET IdReligion = ?, IdNacionalidad = ?, SexoPaciente = ?, DiaNacimientoPaciente = ?, MesNacimientoPaciente = ?, AnoNacimientoPaciente = ?, TelefonoPaciente = ?, LaterallidadPacciente = ?, OcupacionPaciente = ? WHERE IdPaciente = ?',[Reli, Nacio, Sex, Dia, Mes, Ano, Tel, Late, Ocu, IdTipo],(err) => {
        if(!err){
            console.log(err);
            res.send({"succes":"1"});
        }
    });
}

module.exports = pacientesCtrl;