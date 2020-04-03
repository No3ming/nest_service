import { Module } from '@nestjs/common';
import { OssResolver } from './oss.resolver';
import { OssService } from './oss.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [OssResolver, OssService]
})
export class OssModule {}
