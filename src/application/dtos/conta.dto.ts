import { TipoConta } from 'src/domain/enums/tipo-conta.enum';

//depois fazer validação de formato aqui (se não está vazio, se é string, etc (class-validator))
export class CriarContaDto {
  clienteId: string;
  tipo: TipoConta;
}

export class MudarContaDto {
  contaId?: string;
  novoTipo: TipoConta;
}
