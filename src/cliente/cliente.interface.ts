import { Cliente } from './cliente.model';

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
