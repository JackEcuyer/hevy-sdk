import { z } from "zod";
import {
  UpdateWorkoutRequest,
  UpdateWorkoutExercise,
  UpdateWorkoutSet,
  CreateWorkoutRequest,
  CreateWorkoutExercise,
  CreateWorkoutSet,
} from "./workout.types.js";

// Update schemas
export const updateWorkoutSetSchema: z.ZodType<UpdateWorkoutSet> = z.object({
  type: z.string(),
  weight_kg: z.number().nullable().optional(),
  reps: z.number().nullable().optional(),
  distance_meters: z.number().nullable().optional(),
  duration_seconds: z.number().nullable().optional(),
  rpe: z.number().nullable().optional(),
  custom_metric: z.number().nullable().optional(),
});

export const updateWorkoutExerciseSchema: z.ZodType<UpdateWorkoutExercise> =
  z.object({
    title: z.string().optional(),
    notes: z.string().optional(),
    exercise_template_id: z.string(),
    supersets_id: z.number().nullable().optional(),
    sets: z.array(updateWorkoutSetSchema).optional(),
  });

export const updateWorkoutSchema: z.ZodType<UpdateWorkoutRequest> = z.object({
  title: z.string(),
  description: z.string().optional(),
  start_time: z.string(),
  end_time: z.string(),
  is_private: z.boolean(),
  exercises: z.array(updateWorkoutExerciseSchema),
});

// Create schemas
export const createWorkoutSetSchema: z.ZodType<CreateWorkoutSet> = z.object({
  type: z.string(),
  weight_kg: z.number().nullable().optional(),
  reps: z.number().nullable().optional(),
  distance_meters: z.number().nullable().optional(),
  duration_seconds: z.number().nullable().optional(),
  custom_metric: z.number().nullable().optional(),
  rpe: z.number().nullable().optional(),
});

// Schema for validating individual exercises
export const createWorkoutExerciseSchema: z.ZodType<CreateWorkoutExercise> =
  z.object({
    exercise_template_id: z.string(),
    supersets_id: z.number().nullable().optional(),
    title: z.string().optional(),
    notes: z.string().optional(),
    sets: z.array(createWorkoutSetSchema).optional(),
  });

// Main schema for creating a workout
export const createWorkoutSchema: z.ZodType<CreateWorkoutRequest> = z.object({
  title: z.string(),
  description: z.string().optional(),
  start_time: z.string(),
  end_time: z.string(),
  is_private: z.boolean(),
  exercises: z.array(createWorkoutExerciseSchema),
});
