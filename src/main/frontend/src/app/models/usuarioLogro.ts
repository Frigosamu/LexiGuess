import { Logro } from "./logro";

export interface UsuarioLogro {
    id: {
        usuarioId: number;
        logroId: number;
    };
    fechaObtencion: Date;
    logro: Logro;
}