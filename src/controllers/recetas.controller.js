citasCtrl = {};
const con = require('../database');

citasCtrl.cargarReceta = (req, res) => {
    const { FolioCita } = req.body;
    con.query('SELECT IdCita FROM MCitas WHERE FolioCita = ?',[FolioCita], (err, data) => {
        con.query('SELECT * FROM MReceta WHERE IdCita = ?',[data[0].IdCita], (err, datos) => {
            res.send(datos[0]);
        });
    });
}

citasCtrl.actualizarReceta = (req, res) => {
    const { EdadPaciente, ObservacionesPaciente, PesoPaciente, TallaPaciente, IdCita } = req.body;
    con.query('UPDATE MReceta SET EdadPaciente = ?, ObservacionesPaciente = ?, PesoPaciente = ?, TallaPaciente = ? WHERE IdCita = ?',[EdadPaciente,ObservacionesPaciente,PesoPaciente,TallaPaciente,IdCita], (err) => {
        console.log(err);
        if(!err){
            res.send({"success":"1"});
        }
    });
}

module.exports = citasCtrl;