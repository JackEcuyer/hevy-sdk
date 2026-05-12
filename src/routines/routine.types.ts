/**
 * Represents a set within a routine exercise.
 */
export interface RoutineSet {
  /** Index indicating the order of the set in the routine. Example: 0 */
  index: number;
  /** The type of set. E.g., 'normal', 'warmup', 'dropset', 'failure'. Example: 'normal' */
  type: string;
  /** Weight lifted in kilograms. Example: 100. Nullable. */
  weight_kg: number | null;
  /** Number of reps logged for the set. Example: 10. Nullable. */
  reps: number | null;
  /** Range of reps for the set, if applicable. Nullable. */
  rep_range?: {
    /** Starting rep count for the range. Example: 8. Nullable. */
    start: number | null;
    /** Ending rep count for the range. Example: 12. Nullable. */
    end: number | null;
  } | null;
  /** Number of meters logged for the set. Nullable. */
  distance_meters: number | null;
  /** Number of seconds logged for the set. Nullable. */
  duration_seconds: number | null;
  /** RPE (Relative perceived exertion) value logged for the set. Example: 9.5. Nullable. */
  rpe: number | null;
  /** Custom metric logged for the set (e.g., floors or steps for stair machine). Nullable. */
  custom_metric: number | null;
}

/**
 * Represents an exercise within a routine.
 */
export interface RoutineExercise {
  /** Index indicating the order of the exercise in the routine. Example: 0 */
  index: number;
  /** Title of the exercise. Example: 'Bench Press (Barbell)' */
  title: string;
  /** The rest time in seconds between sets of the exercise. Example: '60' */
  rest_seconds: string;
  /** Routine notes on the exercise. Example: 'Focus on form. Go down to 90 degrees.' */
  notes: string;
  /** The id of the exercise template. Example: '05293BCA' */
  exercise_template_id: string;
  /** The id of the superset that the exercise belongs to. Nullable. */
  supersets_id: number | null;
  /** The sets performed in this exercise. */
  sets: RoutineSet[];
}

/**
 * Represents a workout routine.
 */
export interface Routine {
  /** The routine ID. Example: 'b459cba5-cd6d-463c-abd6-54f8eafcadcb' */
  id: string;
  /** The routine title. Example: 'Upper Body 💪' */
  title: string;
  /** The routine folder ID. Nullable. Example: 42 */
  folder_id: number | null;
  /** ISO 8601 timestamp of when the routine was last updated. Example: '2021-09-14T12:00:00Z' */
  updated_at: string;
  /** ISO 8601 timestamp of when the routine was created. Example: '2021-09-14T12:00:00Z' */
  created_at: string;
  /** The exercises in the routine. */
  exercises: RoutineExercise[];
}

/**
 * The response type for the getRoutines API endpoint.
 */
export interface GetRoutinesResponse {
  /** The current page number. @example 1 */
  page: number;
  /** The total number of pages. @example 5 */
  page_count: number;
  /** The list of routines for this page. */
  routines: Routine[];
}

/**
 * Set data for creating a routine exercise set.
 */
export interface CreateRoutineSet {
  /** The type of the set. Example: 'normal'. */
  type: string;
  /** The weight in kilograms. Nullable and optional. Example: 100. */
  weight_kg?: number | null;
  /** The number of repetitions. Nullable and optional. Example: 10. */
  reps?: number | null;
  /** The distance in meters. Nullable and optional. */
  distance_meters?: number | null;
  /** The duration in seconds. Nullable and optional. */
  duration_seconds?: number | null;
  /** A custom metric for the set. Nullable and optional. */
  custom_metric?: number | null;
  /** Range of reps for the set, if applicable. Nullable and optional. */
  rep_range?: {
    /** Starting rep count for the range. Example: 8 */
    start: number;
    /** Ending rep count for the range. Example: 12 */
    end: number;
  } | null;
}

/**
 * Exercise data for creating a routine.
 */
export interface CreateRoutineExercise {
  /** The ID of the exercise template. Example: 'D04AC939'. */
  exercise_template_id: string;
  /** The ID of the superset. Nullable and optional. */
  superset_id?: number | null;
  /** The rest time in seconds. Nullable and optional. Example: 90. */
  rest_seconds?: number | null;
  /** Additional notes for the exercise. Nullable and optional. */
  notes?: string | null;
  /** The sets for the exercise. */
  sets: CreateRoutineSet[];
}

/**
 * Data for creating a routine.
 */
export interface CreateRoutineRequest {
  /** The title of the routine. Example: 'April Leg Day 🔥'. */
  title: string;
  /** The folder id the routine should be added to. Nullable and optional. Example: null. */
  folder_id?: number | null;
  /** Additional notes for the routine. Example: 'Focus on form over weight. Remember to stretch.' */
  notes: string;
  /** The exercises in the routine. */
  exercises: CreateRoutineExercise[];
}

/**
 * Set data for updating a routine exercise set.
 */
export interface UpdateRoutineSet {
  /** The type of the set. Example: 'normal'. */
  type: string;
  /** The weight in kilograms. Nullable and optional. Example: 100. */
  weight_kg?: number | null;
  /** The number of repetitions. Nullable and optional. Example: 10. */
  reps?: number | null;
  /** The distance in meters. Nullable and optional. */
  distance_meters?: number | null;
  /** The duration in seconds. Nullable and optional. */
  duration_seconds?: number | null;
  /** A custom metric for the set. Nullable and optional. */
  custom_metric?: number | null;
  /** Range of reps for the set, if applicable. Nullable and optional. */
  rep_range?: {
    /** Starting rep count for the range. Example: 8 */
    start: number;
    /** Ending rep count for the range. Example: 12 */
    end: number;
  } | null;
}

/**
 * Exercise data for updating a routine.
 */
export interface UpdateRoutineExercise {
  /** The ID of the exercise template. Example: 'D04AC939'. */
  exercise_template_id: string;
  /** The ID of the superset. Nullable and optional. */
  superset_id?: number | null;
  /** The rest time in seconds. Nullable and optional. Example: 90. */
  rest_seconds?: number | null;
  /** Additional notes for the exercise. Nullable and optional. */
  notes?: string | null;
  /** The sets for the exercise. */
  sets: UpdateRoutineSet[];
}

/**
 * Data for updating a routine.
 */
export interface UpdateRoutineRequest {
  /** The title of the routine. Example: 'April Leg Day 🔥'. */
  title: string;
  /** The folder id the routine should be added to. Nullable and optional. Example: null. */
  folder_id?: number | null;
  /** Additional notes for the routine. Example: 'Focus on form over weight. Remember to stretch.' */
  notes: string;
  /** The exercises in the routine. */
  exercises: UpdateRoutineExercise[];
}
