import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public nomeCompleto: string;
  public id: string;
  public endereco: string;
  public telefone: string;
  public rendaSalarial: number;
  public contas: Conta[];
  public gerente: Gerente;

  abrirConta(conta: Conta): void {
    this.contas.push(conta);
  }
  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item.id !== conta.id);
  }

  mudarTipoConta(conta: Conta, novoTipo: string): void {
    let contaEncontrada = this.contas.find((item) => item.id === conta.id);

    if (!contaEncontrada) {
      console.log('Conta não encontrada');
      return;
    }

    contaEncontrada.tipo = novoTipo;
  }
}
