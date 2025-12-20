import { db } from "@/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getDemos: baseProcedure.query(async () => await db.query.tDemo.findMany()),
  getUsers: protectedProcedure.query(
    async ({ ctx }) =>
      await db.query.user.findMany({
        where: (user, { eq }) => eq(user.id, ctx.auth.user.id),
      })
  ),
});
// export type definition of API
export type AppRouter = typeof appRouter;
