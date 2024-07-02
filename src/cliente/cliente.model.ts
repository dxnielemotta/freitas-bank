import { Conta, TipoConta } from 'src/conta/conta.model';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public contas: Conta[] = [];
  public id: string;

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
    public gerenteID: string,
  ) {
    this.id = uuidv4();
  }

  abrirConta(conta: Conta): void {
    if (conta.tipo === TipoConta.CORRENTE && this.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir conta corrente.',
      );
    }
    this.contas.push(conta);
  }

  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item.id !== conta.id);
  }

  mudarTipoConta(conta: Conta, novoTipo: TipoConta): void {
    let contaEncontrada = this.contas.find((item) => item.id === conta.id);

    if (!contaEncontrada) {
      throw new Error('Conta não encontrada');
    }

    contaEncontrada.tipo = novoTipo;
  }
}
