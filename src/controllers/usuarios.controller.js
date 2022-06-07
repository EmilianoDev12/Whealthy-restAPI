const usuariosCtrl = {};
const con = require('../database');

usuariosCtrl.buscarUsuario = (req, res) => {
    const { CorreoUsuario, ContraseñaUsuario } = req.body;
    console.log(req.body);
    con.query('SELECT * FROM MUsuarios WHERE CorreoUsuario = ? AND ContraseñaUsuario = ?',[CorreoUsuario, ContraseñaUsuario], (err, usuarios) => {
        if(err) {
            console.log(err);
            res.send({"error" : "1"});
        }else {
            if(usuarios.length != 1) {
                res.send({"found" : "1"});
            }else {
                const user = usuarios[0];
                if(user.TipoUsuario == 'p') {
                    con.query('SELECT * FROM MUsuarios INNER JOIN MPacientes ON MUsuarios.IdUsuario = MPacientes.IdUsuario WHERE MUsuarios.IdUsuario = ?',[user.IdUsuario],(err,com) => {
                        res.send(com[0]);
                    });
                }else {
                    con.query('SELECT * FROM MUsuarios INNER JOIN MMedicos ON MUsuarios.IdUsuario = MMedicos.IdUsuario WHERE MUsuarios.IdUsuario = ?',[user.IdUsuario],(err,com) => {
                        res.send(com[0]);
                    });
                }
            }
        }
    });
};

usuariosCtrl.registrarUsuario = (req, res) => {
    const { CorreoUsuario, ContraseñaUsuario, NombresPaciente, App, Apm } = req.body;
    con.query('SELECT * FROM MUsuarios WHERE correousuario = ?', [CorreoUsuario],(err,usuario) => {7
        if(err) {
            res.send({"error" : "1"});
            console.log(err);
        }else {
            if(usuario.length != 0) {
                res.send({"registrado" : "1"});
            }else {
                con.query('INSERT INTO MUsuarios (correousuario, contraseñausuario, tipousuario) VALUES (?,?,?)',[CorreoUsuario, ContraseñaUsuario, 'p'], (err) => {
                    if(!err) {
                        con.query('SELECT * FROM MUsuarios WHERE correousuario = ?',[CorreoUsuario],(err, usr) => {
                            con.query('INSERT INTO MPacientes (IdUsuario, NombresPacientes, ApellidoPaternoPaciente, ApellidoMaternoPaciente, IdReligion, IdNacionalidad, IdSangre, SexoPaciente, DiaNacimientoPaciente, MesNacimientoPaciente, AnoNacimientoPaciente, TelefonoPaciente, LaterallidadPacciente, OcupacionPaciente) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[usr[0].IdUsuario, NombresPaciente, App, Apm, "0", "MX", "0","0","0","0","0","0","0","No especificada"],(err) => {
                                console.log(err);
                                if(err == null) {
                                    res.send({"return" : "0"});
                                }
                            });
                        });
                    }else {
                        res.send({"error" : "1"});
                        console.log(err);
                    }
                });
            }
        }
    });
};

usuariosCtrl.busqueda = (req, res) => {
    const { CorreoUsuario } = req.body;
    con.query('SELECT * FROM MUsuarios WHERE correousuario = ?',[CorreoUsuario], (err, usr) => {
        console.log(usr.length);
        if(usr.length != 0) {
            res.send({"found" : "1"});
        }else{
            res.send({"no": "1"});
        }
    });
}

module.exports = usuariosCtrl;