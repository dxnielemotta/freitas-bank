import { Cliente } from '../entities/cliente.entity';
import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta.enum';

export interface IContaRepository {
  listarContas(): Promise<Conta[]>;
  buscarPorId(id: string): Promise<Conta | null>;
  cadastrarConta(tipo: TipoConta, cliente: Cliente): Promise<Conta>;
  excluirConta(contaId: string): Promise<boolean>;
  mudarTipoConta(conta: Conta): Promise<Conta>;
}
