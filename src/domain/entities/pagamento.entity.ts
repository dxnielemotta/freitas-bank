import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { Conta } from './conta.entity';

@Entity('Pagamentos')
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoPagamento: TipoPagamento;

  @Column()
  valor: number;

  @Column()
  data: Date;

  @ManyToOne(() => Conta, (conta) => conta.pagamentos)
  conta: Conta;

  constructor(
    tipoPagamento: TipoPagamento,
    valor: number,
    data: Date,
    conta: Conta,
  ) {
    this.tipoPagamento = tipoPagamento;
    this.valor = valor;
    this.data = data;
    this.conta = conta;
  }

  pagar(valor: number, conta: Conta): void {
    conta.sacar(valor);
  }
}
