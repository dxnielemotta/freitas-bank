import { Conta } from '../entities/conta.entity';

export interface PagamentoInterface {
  pagar(valor: number, conta: Conta): void;
}
