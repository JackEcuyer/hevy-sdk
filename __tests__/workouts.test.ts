import { HevyClient } from "../src/HevyClient.js";
import { Workouts } from "../src/workouts/Workouts.js";
import { ValidationError } from "../src/errors.js";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import type {
  GetWorkoutsResponse,
  Workout,
  CreateWorkoutRequest,
  UpdateWorkoutRequest,
} from "../src/workouts/workout.types.js";
import { ZodError } from "zod";

describe("Workouts", () => {
  let client: HevyClient;
  let workouts: Workouts;
  let sendRequestSpy: jest.SpiedFunction<HevyClient["sendRequest"]>;
  beforeEach(() => {
    client = new HevyClient({ apiKey: "fake-api-key" });
    sendRequestSpy = jest.spyOn(client, "sendRequest");
    workouts = new Workouts(client);
  });

  describe("listWorkouts", () => {
    it("returns a list of workouts", async () => {
      const mockResponse: GetWorkoutsResponse = {
        page: 1,
        page_count: 1,
        workouts: [
          {
            id: "1",
            title: "Test",
            routine_id: "r1",
            description: "desc",
            start_time: "",
            end_time: "",
            updated_at: "",
            created_at: "",
            exercises: [],
          },
        ],
      };
      sendRequestSpy.mockResolvedValueOnce(mockResponse);
      const result = await workouts.listWorkouts(1, 10);
      expect(result).toEqual(mockResponse);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/workouts?page=1&pageSize=10",
      );
    });
  });

  describe("getWorkoutCount", () => {
    it("returns the total number of workouts", async () => {
      sendRequestSpy.mockResolvedValueOnce({ workoutCount: 7 });
      const count = await workouts.getWorkoutCount();
      expect(count).toBe(7);
      expect(sendRequestSpy).toHaveBeenCalledWith("/workouts/count");
    });
  });

  describe("getWorkout", () => {
    it("throws if workoutID is empty or whitespace", async () => {
      await expect(workouts.getWorkout("")).rejects.toThrow(
        "Workout ID is required",
      );
      await expect(workouts.getWorkout("   ")).rejects.toThrow(
        "Workout ID is required",
      );
    });
    it("returns workout data for valid ID", async () => {
      const workout: Workout = {
        id: "1",
        title: "Test",
        routine_id: "r1",
        description: "desc",
        start_time: "",
        end_time: "",
        updated_at: "",
        created_at: "",
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce(workout);
      const result = await workouts.getWorkout("1");
      expect(result).toEqual(workout);
      expect(sendRequestSpy).toHaveBeenCalledWith("/workouts/1");
    });
  });

  describe("createWorkout", () => {
    it("calls sendRequest with correct params", async () => {
      const data: CreateWorkoutRequest = {
        title: "New",
        start_time: "2021-01-01",
        end_time: "2021-01-01",
        is_private: false,
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce({ id: "2" });
      await workouts.createWorkout(data);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/workouts",
        "POST",
        data,
        expect.anything(),
      );
    });
  });

  describe("updateWorkout", () => {
    it("throws if workoutID is empty or whitespace", async () => {
      await expect(
        workouts.updateWorkout("", {} as UpdateWorkoutRequest),
      ).rejects.toThrow("Workout ID is required");
      await expect(
        workouts.updateWorkout("   ", {} as UpdateWorkoutRequest),
      ).rejects.toThrow("Workout ID is required");
    });
    it("calls sendRequest with correct params", async () => {
      const data: UpdateWorkoutRequest = {
        title: "Updated",
        start_time: "2021-01-01",
        end_time: "2021-01-01",
        is_private: false,
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce({ id: "3" });
      await workouts.updateWorkout("3", data);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/workouts/3",
        "PUT",
        data,
        expect.anything(),
      );
    });
  });

  describe("integration edge cases", () => {
    it("throws ValidationError when createWorkout fails validation", async () => {
      sendRequestSpy.mockRejectedValueOnce(
        new ValidationError(new ZodError([])),
      );
      await expect(
        workouts.createWorkout({} as CreateWorkoutRequest),
      ).rejects.toThrow(ValidationError);
    });
    it("returns the newly created workout data", async () => {
      const workoutData: Workout = {
        id: "4",
        title: "Test SDK Workout",
        routine_id: "routine-id",
        description: "desc",
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        exercises: [
          {
            index: 0,
            title: "Exercise Title",
            notes: "",
            exercise_template_id: "D04AC939",
            supersets_id: null,
            sets: [],
          },
        ],
      };
      sendRequestSpy.mockResolvedValueOnce(workoutData);
      const newWorkout = await workouts.createWorkout(
        workoutData as unknown as CreateWorkoutRequest,
      );
      expect(newWorkout).toEqual(workoutData);
    });
  });
});
