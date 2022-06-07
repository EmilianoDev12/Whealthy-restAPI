const citasCtrl = {};
const con = require('../database');

citasCtrl.buscarDocs = (req, res) => {
    const { dia, mes, ano, hora, IdTip } = req.body;
    console.log(req.body);
    con.query("SELECT * FROM MCitas WHERE Dia = ? AND Mes = ? AND Ano = ? AND HoraCita = ? AND IdPaciente = ?",[dia,mes,ano,hora,IdTip],(err,reso) =>{
        console.log(reso.length);
        console.log(err)
        if(reso.length == 1){
            res.send({"registrado" : "1"});
        }else{
            con.query('SELECT IdMedico FROM MCitas WHERE Dia=? AND Mes=? AND Ano=? AND HoraCita = ?',[dia,mes,ano,hora],(err,resol) => {
                console.log(resol);
                con.query('SELECT * FROM MMedicos',(err,resp) => {
                    res.send({
                        "Lista":resol,
                        "Doctores":resp
                    });
                });
            });
        }
    });
}

citasCtrl.registrarCita = (req, res) => {
    const { dia, mes, ano, hora, IdTip, IdMed,urlCita } = req.body;
    const folio = ''+IdTip+''+IdMed+''+dia+''+mes+''+ano+''+hora;
    console.log(folio);
    con.query('INSERT INTO MCitas (IdPaciente, IdMedico, FolioCita, HoraCita, CitaActiva, Ano, Mes, Dia, CitaUrl) VALUES (?,?,?,?,?,?,?,?,?)',[IdTip,IdMed,folio,hora,'1',ano,mes,dia,urlCita], (err, reso) => {
        console.log(reso);
        console.log(err);
        con.query('SELECT * FROM MPacientes WHERE IdPaciente = ?',[IdTip],(err, resp) => {
            con.query('SELECT * FROM MCitas WHERE FolioCita = ?',[folio],(err, data) => {
                console.log(resp[0]);
                console.log(data[0]);
                con.query('INSERT INTO MReceta (IdCita, NombresPaciente, ApellidoPaternoPaciente, ApellidoMaternoPaciente, EdadPaciente, PesoPaciente, TallaPaciente, ObservacionesPaciente) VALUES (?,?,?,?,?,?,?,?)',[data[0].IdCita,resp[0].NombresPacientes, resp[0].ApellidoPaternoPaciente,resp[0].ApellidoMaternoPaciente,0,0,0," "], (err) => {
                    if(!err){
                        res.send({"siu":"1"});
                    }else {
                        console.log(err);
                    }
                });
            });
        });
        
    });
}

citasCtrl.citasPac = (req, res) => {
    const { IdPac } = req.body;
    con.query('SELECT * FROM MCitas INNER JOIN MMedicos ON MCitas.IdMedico = MMedicos.IdMedico WHERE MCitas.IdPaciente = ?', [IdPac],(err, resp) =>{
        res.send({resp})
    });
}

citasCtrl.citasMedo = (req, res) => {
    const { IdMed } = req.body;
    con.query('SELECT * FROM MCitas INNER JOIN MPacientes ON MCitas.IdPaciente = MPacientes.IdPaciente WHERE MCitas.IdMedico = ?', [IdMed],(err, resp) =>{
        res.send({resp})
    });
}

citasCtrl.buscarPac = (req, res) => {
    const {FolioCita} = req.body;
    con.query('SELECT IdPaciente FROM MCitas WHERE FolioCita = ?',[FolioCita],(err, resp) => {
        res.send(resp[0]);
    });
}

citasCtrl.buscarId = (req, res) => {
    const {FolioCita} = req.body;
    con.query('SELECT IdCita FROM MCitas WHERE FolioCita = ?',[FolioCita],(err, resp) => {
        con.query('DELETE FROM MReceta WHERE IdCita = ?',[resp[0].IdCita],(erro) => {
            if(!erro){
                con.query('DELETE FROM MCitas WHERE IdCita = ?',[resp[0].IdCita],(erros) => {
                    if(!erros){
                        res.send({'Borrado' : '1'});
                    }
                });
            }
        });
    });
}

module.exports = citasCtrl;