import { TipoPagamento } from 'src/enums/tipo-pagamento.enum';
import { PagamentoBoleto } from './pagamento-boleto.model';
import { PagamentoPIX } from './pagamento-pix.model';
import { PagamentoInterface } from './pagamento.interface';

export class PagamentoFactory {
  static criarPagamento(tipo: TipoPagamento): PagamentoInterface {
    const tiposPagamento = {
      [TipoPagamento.PIX]: new PagamentoPIX(),
      [TipoPagamento.BOLETO]: new PagamentoBoleto(),
    };
    const pagamento = tiposPagamento[tipo];

    if (!pagamento) {
      throw new Error('Tipo de pagamento inválido');
    }

    return pagamento;
  }
}
