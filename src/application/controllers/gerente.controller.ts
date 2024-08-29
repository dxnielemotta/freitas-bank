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
import { GerenteService } from '../../domain/services/gerente.service';
import { TipoConta } from '../../domain/enums/tipo-conta.enum';
import { ClienteService } from '../../domain/services/cliente.service';
import { CriarGerenteDto } from '../dtos/gerente.dto';
import { MudarContaDto } from '../dtos/conta.dto';

@Controller('gerentes')
export class GerenteController {
  constructor(
    private readonly gerenteService: GerenteService,
    private readonly clienteService: ClienteService,
  ) {}

  @Post()
  async criarGerente(@Body() criarGerenteDto: CriarGerenteDto) {
    try {
      const gerente = await this.gerenteService.criarGerente(
        criarGerenteDto.nomeCompleto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Gerente criado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':gerenteId')
  async obterGerente(@Param('gerenteId') gerenteId: string) {
    try {
      const gerente = await this.gerenteService.obterGerente(gerenteId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerente retornado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async listarGerentes() {
    try {
      const gerentes = await this.gerenteService.listarGerentes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerentes retornados com sucesso',
        data: gerentes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':gerenteId/:clienteId/:tipo')
  async abrirConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Param('tipo') tipo: TipoConta,
  ) {
    try {
      await this.gerenteService.obterGerente(gerenteId);
      const cliente = await this.clienteService.obterCliente(clienteId);

      const conta = await this.clienteService.adicionarContaAoCliente(
        tipo,
        cliente,
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

  @Put(':gerenteId/mudarconta/:clienteId')
  async mudarTipoConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Body() mudarContaDto: MudarContaDto,
  ) {
    try {
      const gerente = await this.gerenteService.obterGerente(gerenteId);
      if (!gerente) {
        throw new Error('Gerente não encontrado');
      }

      const cliente = await this.clienteService.obterCliente(clienteId);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      await this.gerenteService.mudarTipoConta(
        mudarContaDto.contaId,
        mudarContaDto.novoTipo,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Mudança de conta feita com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':gerenteId/excluir/:clienteId')
  fecharConta(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Body('contaId') contaId: string,
  ) {
    try {
      const gerente = this.gerenteService.obterGerente(gerenteId);
      if (!gerente) {
        throw new Error('Gerente não encontrado');
      }

      const cliente = this.clienteService.obterCliente(clienteId);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      this.gerenteService.fecharConta(contaId);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Conta fechada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
