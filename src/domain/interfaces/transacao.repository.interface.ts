import { Transacao } from '../entities/transacao.entity';

export interface ITransacaoRepository {
  cadastrarTransacao(transacao: Transacao): Promise<Transacao>;
  obterExtrato(contaId: string): Promise<Transacao[]>;
}
