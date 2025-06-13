import type { z } from 'zod';

type InferFieldErrors<T extends z.ZodType> = {
    [K in keyof z.infer<T>]?: string[] | undefined;
};

export type ActionState<T extends z.ZodType> =
    | {
          errors?: InferFieldErrors<T>;
          payload?: Record<string, FormDataEntryValue>;
          message?: string;
      }
    | undefined;
