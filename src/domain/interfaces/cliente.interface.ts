import { Cliente } from '../entities/cliente.entity';

export interface ClienteInterface {
  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerenteId: string,
  ): Cliente;
  obterCliente(id: string): Cliente;
  listarClientes(): Cliente[];
}
