import { Cliente } from './cliente.entity';

export interface ClienteInterface {
  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerenteID: string,
  ): Cliente;
  obterCliente(id: string): Cliente;
  listarClientes(): Cliente[];
}
