export interface Solicitacoes {
    id: number;
    status_solicitacao: number;
    data_solicitacao: string;
    horario_entrada: string;
    quantidade: number;
    data_inicio: string;
    data_termino: string;
    hora_inicio: string;
    hora_termino: string;
    descricao: string;
    id_espaco: number;
    espaco_nome: string;
    usuario_nome: string;
    usuario_cargo: string;
    id_usuario: number;
}