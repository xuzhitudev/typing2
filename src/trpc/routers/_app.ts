import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  getDemos: baseProcedure.query(async () => await db.query.tDemo.findMany()),
});
// export type definition of API
export type AppRouter = typeof appRouter;
