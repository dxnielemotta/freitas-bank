import { PagamentoInterface } from '../interfaces/pagamento.interface';
import { Conta } from '../entities/conta.entity';

export class PagamentoPIX implements PagamentoInterface {
  pagar(valor: number, conta: Conta): void {
    conta.sacar(valor);
  }
}
