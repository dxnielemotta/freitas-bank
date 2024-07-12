import { PagamentoInterface } from './pagamento.interface';
import { Conta } from '../conta/conta.model';

export class PagamentoBoleto implements PagamentoInterface {
  pagar(valor: number, conta: Conta): void {
    conta.sacar(valor);
  }
}
