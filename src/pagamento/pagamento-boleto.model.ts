import { PagamentoInterface } from './pagamento.interface';
import { Conta } from '../conta/conta.entity';

export class PagamentoBoleto implements PagamentoInterface {
  pagar(valor: number, conta: Conta): void {
    conta.sacar(valor);
  }
}
