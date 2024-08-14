import { Cliente } from '../entities/cliente.entity';

export interface IClienteRepository {
  listarClientes(): Promise<Cliente[]>;
  buscarPorId(id: string): Promise<Cliente | null>;
  cadastrarCliente(cliente: Cliente): Promise<Cliente>;
  removerContaDoCliente(contaId: string, clienteId: string): void;
  excluirCliente(id: string): Promise<boolean>;
}
