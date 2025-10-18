import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  comments: router({
    list: publicProcedure.query(async () => {
      return await db.getAllComments();
    }),
    create: protectedProcedure
      .input(
        z.object({
          content: z.string().min(1),
          rating: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const comment = {
          id: nanoid(),
          userId: ctx.user.id,
          userName: ctx.user.name || "مستخدم",
          content: input.content,
          rating: input.rating,
        };
        await db.createComment(comment);
        return comment;
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.deleteComment(input.id);
        return { success: true };
      }),
  }),

  ratings: router({
    list: publicProcedure.query(async () => {
      return await db.getAllRatings();
    }),
    byFeature: publicProcedure
      .input(z.object({ featureType: z.string() }))
      .query(async ({ input }) => {
        return await db.getRatingsByFeature(input.featureType);
      }),
    create: protectedProcedure
      .input(
        z.object({
          featureType: z.string(),
          featureName: z.string(),
          rating: z.string(),
          comment: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const rating = {
          id: nanoid(),
          userId: ctx.user.id,
          ...input,
        };
        await db.createRating(rating);
        return rating;
      }),
  }),
});

export type AppRouter = typeof appRouter;
