import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { TipoConta } from 'src/enums/tipo-conta.enum';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  criarGerente(@Body('nome') nome: string): void {
    this.gerenteService.criarGerente(nome);
  }

  @Post(':id/clientes')
  adicionarCliente(
    @Param('id') id: string,
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
  ): void {
    this.gerenteService.adicionarCliente(
      id,
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
  }

  @Put(':id/mudar/:clienteID')
  mudarTipoConta(
    @Param('id') id: string,
    @Param('clienteID') clienteID: string,
    @Body('contaID') contaID: string,
    @Body('novoTipo') novoTipo: TipoConta,
  ): void {
    const gerente = this.gerenteService.obterGerente(id);
    if (!gerente) {
      throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
    }

    const cliente = gerente.clientes.find((c) => c.id === clienteID);
    if (!cliente) {
      throw new HttpException(
        'Cliente não encontrado para o gerente',
        HttpStatus.NOT_FOUND,
      );
    }

    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new HttpException(
        'Conta não encontrada para o cliente',
        HttpStatus.NOT_FOUND,
      );
    }

    gerente.mudarTipoConta(cliente, conta, novoTipo);
  }

  @Delete(':id/excluir/:clienteID/:contaID')
  fecharConta(
    @Param('id') id: string,
    @Param('clienteID') clienteID: string,
    @Param('contaID') contaID: string,
  ): void {
    const gerente = this.gerenteService.obterGerente(id);
    if (!gerente) {
      throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
    }

    const cliente = gerente.clientes.find((c) => c.id === clienteID);
    if (!cliente) {
      throw new HttpException(
        'Cliente não encontrado para o gerente',
        HttpStatus.NOT_FOUND,
      );
    }

    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new HttpException(
        'Conta não encontrada para o cliente',
        HttpStatus.NOT_FOUND,
      );
    }

    gerente.fecharConta(cliente, conta);
  }
}
