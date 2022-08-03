export class Usuario{
    usrCorreo: string
    usrTipo: string
    usrContrasena: string

    constructor(usrCorreo: string, usrTipo: string, usrContrasena: string){
        this.usrCorreo = usrCorreo;
        this.usrTipo = usrTipo;
        this.usrContrasena = usrContrasena;
    }
}