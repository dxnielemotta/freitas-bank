import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { ClienteService } from 'src/cliente/cliente.service';

@Controller('gerentes')
export class GerenteController {
  constructor(
    private readonly gerenteService: GerenteService,
    private readonly clienteService: ClienteService,
  ) {}

  @Get()
  listarGerentes() {
    try {
      const gerentes = this.gerenteService.listarGerentes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerentes retornados com sucesso',
        data: gerentes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':gerenteID')
  obterGerente(@Param('gerenteID') gerenteID: string) {
    try {
      const gerente = this.gerenteService.obterGerente(gerenteID);
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerentes retornado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  criarGerente(@Body('nomeCompleto') nomeCompleto: string) {
    try {
      const gerente = this.gerenteService.criarGerente(nomeCompleto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Gerente criado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':gerenteID/cadastrar')
  adicionarClienteAoGerente(
    @Param('gerenteID') gerenteID: string,
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
  ) {
    try {
      const cliente = this.gerenteService.adicionarClienteAoGerente(
        gerenteID,
        nomeCompleto,
        endereco,
        telefone,
        rendaSalarial,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente criado e adicionado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':gerenteID/mudarconta/:clienteID')
  mudarTipoConta(
    @Param('gerenteID') gerenteID: string,
    @Param('clienteID') clienteID: string,
    @Body('contaID') contaID: string,
    @Body('novoTipo') novoTipo: TipoConta,
  ) {
    try {
      const gerente = this.gerenteService.obterGerente(gerenteID);
      if (!gerente) {
        throw new Error('Gerente não encontrado');
      }

      const cliente = this.clienteService.obterCliente(clienteID);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      this.gerenteService.mudarTipoConta(contaID, novoTipo);

      return {
        statusCode: HttpStatus.OK,
        message: 'Mudança de conta feita com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':gerenteID/excluir/:clienteID')
  fecharConta(
    @Param('gerenteID') gerenteID: string,
    @Param('clienteID') clienteID: string,
    @Body('contaID') contaID: string,
  ) {
    try {
      const gerente = this.gerenteService.obterGerente(gerenteID);
      if (!gerente) {
        throw new Error('Gerente não encontrado');
      }

      const cliente = this.clienteService.obterCliente(clienteID);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      this.gerenteService.fecharConta(contaID);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Conta fechada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
