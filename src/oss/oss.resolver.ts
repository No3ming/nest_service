import { Resolver, Query, Args } from '@nestjs/graphql';
import { OssService } from './oss.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { OssType } from './dto/oss.dto';

@Resolver('Oss')
export class OssResolver {
    constructor(private readonly ossService: OssService) {}

    @Query(() => OssType)
    @UseGuards(JwtGuard)
    async getPut (@Args('name') name: string, @Args('type') type: string) {
        return this.ossService.getPut(name, type)
    }

}
