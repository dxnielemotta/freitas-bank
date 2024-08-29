import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Transacao } from 'src/domain/entities/transacao.entity';

@Injectable()
export class TransacaoRepository {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
  ) {}

  async cadastrarTransacao(transacao: Transacao): Promise<Transacao> {
    return await this.transacaoRepository.save(transacao);
  }
  async obterExtrato(contaId: string): Promise<Transacao[]> {
    return await this.transacaoRepository.find({
      where: { conta: { id: contaId } },
      relations: ['conta'],
    });
  }
}
