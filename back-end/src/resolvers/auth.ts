import { ContextType } from "src/types";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class AuthResolver {
  @Query(() => String)
  @UseMiddleware()
  async Me(@Ctx() ctx: ContextType) {}
}
