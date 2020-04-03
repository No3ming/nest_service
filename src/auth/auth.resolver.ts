import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthType } from './dto/auth.dto';
import { AuthService } from './auth.service'
import { AuthInput } from './inputs/auth.input'


@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) {

    }
    // "Authorization: Bearer "
    @Query(() => AuthType)
    async login(@Args('user') user: AuthInput) {
     
      return this.authService.login(user);
    }
}
