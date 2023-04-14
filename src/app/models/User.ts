export class User {
    [key: string]: any; 
    _id: string | undefined;
    nm_usuario: string = '';
    nm_usuariosobrenome: string | undefined;
    tp_usuario: number | undefined;
    bithday: Date | undefined;
    password:  string | undefined;
    cpassword:  string | undefined;
    email: string  | undefined;
    create_at: Date | undefined;
    update_at: Date | undefined;
    loggin: boolean | undefined;
    last_login: Date | undefined;
    sector: string | undefined;
}