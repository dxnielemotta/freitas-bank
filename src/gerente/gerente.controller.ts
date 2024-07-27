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
        message: 'Gerente retornado com sucesso',
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

  @Post(':gerenteID/:clienteID/:tipo')
  abrirConta(
    @Param('gerenteID') gerenteID: string,
    @Param('clienteID') clienteID: string,
    @Param('tipo') tipo: TipoConta,
  ) {
    try {
      console.log(`Tipo de conta recebido: ${tipo}`);
      this.gerenteService.obterGerente(gerenteID);
      this.clienteService.obterCliente(clienteID);

      const conta = this.clienteService.adicionarContaAoCliente(
        tipo,
        clienteID,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta foi aberta com sucesso',
        data: conta,
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
