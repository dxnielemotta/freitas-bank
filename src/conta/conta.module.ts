import { ClienteModule } from 'src/cliente/cliente.module';
import { ContaService } from './conta.service';
import { Module, forwardRef } from '@nestjs/common';
import { ContaController } from './conta.controller';

@Module({
  imports: [forwardRef(() => ClienteModule)],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
