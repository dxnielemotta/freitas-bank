import { Cliente } from '../entities/cliente.entity';
import { Conta } from '../entities/conta.entity';

export interface IClienteRepository {
  listarClientes(): Promise<Cliente[]>;
  buscarPorId(id: string): Promise<Cliente | null>;
  cadastrarCliente(cliente: Cliente): Promise<Cliente>;
  // listarContasDoCliente(id: string): Promise<Conta[]>;
  removerContaDoCliente(contaId: string, clienteId: string): void;
  excluirCliente(id: string): Promise<boolean>;
}
