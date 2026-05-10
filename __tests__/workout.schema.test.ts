import { createWorkoutSchema } from "../src/workouts/workout.schema.js";
import { describe, it, expect } from "@jest/globals";

describe("createWorkoutSchema", () => {
  it("should validate a correct workout", () => {
    const valid = {
      title: "Test",
      start_time: "2021-01-01T00:00:00Z",
      end_time: "2021-01-01T01:00:00Z",
      is_private: false,
      exercises: [
        {
          exercise_template_id: "abc",
          sets: [{ type: "normal", weight_kg: 100, reps: 10 }],
        },
      ],
    };
    expect(() => createWorkoutSchema.parse(valid)).not.toThrow();
  });

  it("should fail if title is missing", () => {
    const invalid = {
      start_time: "2021-01-01T00:00:00Z",
      end_time: "2021-01-01T01:00:00Z",
      is_private: false,
      exercises: [],
    };
    expect(() => createWorkoutSchema.parse(invalid)).toThrow();
  });
});
