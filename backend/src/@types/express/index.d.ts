declare namespace Express {
    export interface Request {
        usuario_id: string;
        paciente_id: string;
        bebida_id: string;
        orientacao_id: string;
        tipo_usuario: string;
    }
}