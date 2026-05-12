import { z } from "zod";

export const createRoutineSetSchema = z.object({
  type: z.string(),
  weight_kg: z.number().nullable().optional(),
  reps: z.number().nullable().optional(),
  distance_meters: z.number().nullable().optional(),
  duration_seconds: z.number().nullable().optional(),
  custom_metric: z.number().nullable().optional(),
  rep_range: z
    .object({
      start: z.number(),
      end: z.number(),
    })
    .nullable()
    .optional(),
});

export const createRoutineExerciseSchema = z.object({
  exercise_template_id: z.string(),
  superset_id: z.number().nullable().optional(),
  rest_seconds: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  sets: z.array(createRoutineSetSchema),
});

export const createRoutineSchema = z.object({
  title: z.string(),
  folder_id: z.number().nullable().optional(),
  notes: z.string(),
  exercises: z.array(createRoutineExerciseSchema),
});

export const updateRoutineSetSchema = z.object({
  type: z.string(),
  weight_kg: z.number().nullable().optional(),
  reps: z.number().nullable().optional(),
  distance_meters: z.number().nullable().optional(),
  duration_seconds: z.number().nullable().optional(),
  custom_metric: z.number().nullable().optional(),
  rep_range: z
    .object({
      start: z.number(),
      end: z.number(),
    })
    .nullable()
    .optional(),
});

export const updateRoutineExerciseSchema = z.object({
  exercise_template_id: z.string(),
  superset_id: z.number().nullable().optional(),
  rest_seconds: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  sets: z.array(updateRoutineSetSchema),
});

export const updateRoutineSchema = z.object({
  title: z.string(),
  folder_id: z.number().nullable().optional(),
  notes: z.string(),
  exercises: z.array(updateRoutineExerciseSchema),
});
