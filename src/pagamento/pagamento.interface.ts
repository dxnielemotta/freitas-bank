import { Conta } from '../conta/conta.entity';

export interface PagamentoInterface {
  pagar(valor: number, conta: Conta): void;
}
