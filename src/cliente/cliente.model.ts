import { Conta } from 'src/conta/conta.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public id: string;
  public contas: Conta[] = [];

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
    public gerente: Gerente,
  ) {
    this.id = uuidv4();
  }

  abrirConta(conta: Conta): void {
    this.contas.push(conta);
  }

  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item.id !== conta.id);
  }

  mudarTipoConta(conta: Conta, novoTipo: TipoConta): void {
    let contaEncontrada = this.contas.find((item) => item.id === conta.id);

    if (!contaEncontrada) {
      console.log('Conta não encontrada');
      return;
    }

    contaEncontrada.tipo = novoTipo;
  }
}
