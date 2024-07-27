import { Conta } from '../conta/conta.model';

export interface PagamentoInterface {
  pagar(valor: number, conta: Conta): void;
}
