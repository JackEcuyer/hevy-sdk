/**
 * The request body for updating a workout.
 */
export interface UpdateWorkoutRequest {
  /** The workout title. */
  title: string;
  /** The workout description. */
  description?: string;
  /** ISO 8601 timestamp of when the workout was recorded to have started. */
  start_time: string;
  /** ISO 8601 timestamp of when the workout was recorded to have ended. */
  end_time: string;
  /** Whether the workout is private. */
  is_private: boolean;
  /** The exercises performed in the workout. */
  exercises: UpdateWorkoutExercise[];
}

/**
 * Represents an exercise in an update workout request.
 */
export interface UpdateWorkoutExercise {
  /** Title of the exercise. */
  title?: string;
  /** Notes on the exercise. */
  notes?: string;
  /** The id of the exercise template. */
  exercise_template_id: string;
  /** The id of the superset that the exercise belongs to. */
  supersets_id?: number | null;
  /** The sets performed in this exercise. */
  sets?: UpdateWorkoutSet[];
}

/**
 * Represents a set in an update workout request.
 */
export interface UpdateWorkoutSet {
  /** The type of set. This can be one of 'normal', 'warmup', 'dropset', 'failure'. */
  type: string;
  /** Weight lifted in kilograms. */
  weight_kg?: number | null;
  /** Number of reps logged for the set. */
  reps?: number | null;
  /** Number of meters logged for the set. */
  distance_meters?: number | null;
  /** Number of seconds logged for the set. */
  duration_seconds?: number | null;
  /** RPE (Relative perceived exertion) value logged for the set. */
  rpe?: number | null;
  /** Custom metric logged for the set. */
  custom_metric?: number | null;
}

/**
 * The response type for the getWorkouts API endpoint.
 */
export interface GetWorkoutsResponse {
  /** The current page number. @example 1 */
  page: number;
  /** The total number of pages. @example 5 */
  page_count: number;
  /** The list of workouts for this page. */
  workouts: Workout[];
}

/**
 * Represents a workout with exercises and sets.
 */
export interface Workout {
  /** The workout ID. @example "b459cba5-cd6d-463c-abd6-54f8eafcadcb" */
  id: string;
  /** The workout title. @example "Morning Workout 💪" */
  title: string;
  /** The ID of the routine that this workout belongs to. @example "b459cba5-cd6d-463c-abd6-54f8eafcadcb" */
  routine_id: string;
  /** The workout description. @example "Pushed myself to the limit today!" */
  description: string;
  /** ISO 8601 timestamp of when the workout was recorded to have started. @example "2021-09-14T12:00:00Z" */
  start_time: string;
  /** ISO 8601 timestamp of when the workout was recorded to have ended. @example "2021-09-14T12:00:00Z" */
  end_time: string;
  /** ISO 8601 timestamp of when the workout was last updated. @example "2021-09-14T12:00:00Z" */
  updated_at: string;
  /** ISO 8601 timestamp of when the workout was created. @example "2021-09-14T12:00:00Z" */
  created_at: string;
  /** The exercises performed in the workout. */
  exercises: WorkoutExercise[];
}

/**
 * Represents an exercise within a workout.
 */
export interface WorkoutExercise {
  /** Index indicating the order of the exercise in the workout. @example 0 */
  index: number;
  /** Title of the exercise. @example "Bench Press (Barbell)" */
  title: string;
  /** Notes on the exercise. @example "Paid closer attention to form today. Felt great!" */
  notes: string;
  /** The id of the exercise template. This can be used to fetch the exercise template. @example "05293BCA" */
  exercise_template_id: string;
  /** The id of the superset that the exercise belongs to. A value of null indicates the exercise is not part of a superset. @example 0 */
  supersets_id: number | null;
  /** The sets performed in this exercise. */
  sets: WorkoutSet[];
}

/**
 * Represents a set within an exercise.
 */
export interface WorkoutSet {
  /** Index indicating the order of the set in the workout. @example 0 */
  index: number;
  /** The type of set. This can be one of 'normal', 'warmup', 'dropset', 'failure'. @example "normal" */
  type: string;
  /** Weight lifted in kilograms. @example 100 */
  weight_kg: number | null;
  /** Number of reps logged for the set. @example 10 */
  reps: number | null;
  /** Number of meters logged for the set. @example null */
  distance_meters: number | null;
  /** Number of seconds logged for the set. @example null */
  duration_seconds: number | null;
  /** RPE (Relative perceived exertion) value logged for the set. @example 9.5 */
  rpe: number | null;
  /** Custom metric logged for the set (Currently only used to log floors or steps for stair machine exercises). @example 50 */
  custom_metric: number | null;
}

/**
 * The request body for creating a workout.
 */
export interface CreateWorkoutRequest {
  /** The workout title. */
  title: string;
  /** The workout description. */
  description?: string;
  /** ISO 8601 timestamp of when the workout was recorded to have started. */
  start_time: string;
  /** ISO 8601 timestamp of when the workout was recorded to have ended. */
  end_time: string;
  /** Whether the workout is private. */
  is_private: boolean;
  /** The exercises performed in the workout. */
  exercises: CreateWorkoutExercise[];
}

/**
 * Represents an exercise in a create workout request.
 */
export interface CreateWorkoutExercise {
  /** Title of the exercise. */
  title?: string;
  /** Notes on the exercise. */
  notes?: string;
  /** The id of the exercise template. */
  exercise_template_id: string;
  /** The id of the superset that the exercise belongs to. */
  supersets_id?: number | null;
  /** The sets performed in this exercise. */
  sets?: CreateWorkoutSet[];
}

/**
 * Represents a set in a create workout request.
 */
export interface CreateWorkoutSet {
  /** The type of set. This can be one of 'normal', 'warmup', 'dropset', 'failure'. */
  type: string;
  /** Weight lifted in kilograms. */
  weight_kg?: number | null;
  /** Number of reps logged for the set. */
  reps?: number | null;
  /** Number of meters logged for the set. */
  distance_meters?: number | null;
  /** Number of seconds logged for the set. */
  duration_seconds?: number | null;
  /** RPE (Relative perceived exertion) value logged for the set. */
  rpe?: number | null;
  /** Custom metric logged for the set. */
  custom_metric?: number | null;
}
