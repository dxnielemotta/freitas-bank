import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ContaService } from '../../domain/services/conta.service';
import { TipoPagamento } from '../../domain/enums/tipo-pagamento.enum';

@Controller('contas')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Get('/')
  async listarContas() {
    try {
      const contas = await this.contaService.listarContas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Contas retornadas com sucesso',
        data: contas,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':contaId')
  async obterContaPorId(@Param('contaId') contaId: string) {
    try {
      const conta = await this.contaService.obterConta(contaId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta retornada com sucesso',
        data: conta,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaId/pagar')
  async fazerPagamento(
    @Param('contaId') contaId: string,
    //criar um dto
    @Body('valor') valor: number,
    @Body('tipoPagamento') tipoPagamento: TipoPagamento,
  ) {
    try {
      const pagamento = await this.contaService.fazerPagamento(
        contaId,
        valor,
        tipoPagamento,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: `Pagamento via ${tipoPagamento} realizado com sucesso!`,
        data: pagamento,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaId/depositar')
  async depositar(
    @Param('contaId') contaId: string,
    @Body('valor') valor: number,
  ) {
    try {
      const deposito = await this.contaService.depositar(contaId, valor);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Depósito no valor de ${valor} realizado com sucesso!`,
        data: deposito,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaId/sacar')
  async sacar(@Param('contaId') contaId: string, @Body('valor') valor: number) {
    try {
      const saque = await this.contaService.sacar(contaId, valor);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Saque no valor de ${valor} realizado com sucesso!`,
        data: saque,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaId/transferir/:destinoId')
  async transferir(
    @Param('contaId') contaId: string,
    @Body('valor') valor: number,
    @Param('destinoId') destinoId: string,
  ) {
    try {
      const transferencia = await this.contaService.transferir(
        contaId,
        valor,
        destinoId,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: `Transferência no valor de ${valor} realizado com sucesso para a conta de id ${destinoId}!`,
        data: transferencia,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':contaId/extrato')
  async obterExtrato(@Param('contaId') contaId: string) {
    try {
      const extrato = await this.contaService.obterExtrato(contaId);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Extrato:`,
        data: extrato,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
