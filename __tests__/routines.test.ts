import { HevyClient } from "../src/HevyClient.js";
import { Routines } from "../src/routines/Routines.js";
import { ValidationError } from "../src/errors.js";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import type {
  GetRoutinesResponse,
  Routine,
  CreateRoutineRequest,
  UpdateRoutineRequest,
} from "../src/routines/routine.types.js";
import { ZodError } from "zod";

describe("Routines", () => {
  let client: HevyClient;
  let routines: Routines;
  let sendRequestSpy: jest.SpiedFunction<HevyClient["sendRequest"]>;
  beforeEach(() => {
    client = new HevyClient({ apiKey: "fake-api-key" });
    sendRequestSpy = jest.spyOn(client, "sendRequest");
    routines = new Routines(client);
  });

  describe("listRoutines", () => {
    it("returns a list of routines", async () => {
      const mockResponse: GetRoutinesResponse = {
        page: 1,
        page_count: 1,
        routines: [
          {
            id: "1",
            title: "Routine 1",
            folder_id: null,
            updated_at: "",
            created_at: "",
            exercises: [],
          },
        ],
      };
      sendRequestSpy.mockResolvedValueOnce(mockResponse);
      const result = await routines.listRoutines(1, 10);
      expect(result).toEqual(mockResponse);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/routines?page=1&pageSize=10",
      );
    });
  });

  describe("getRoutine", () => {
    it("throws if routineID is empty or whitespace", async () => {
      await expect(routines.getRoutine("")).rejects.toThrow(
        "Routine ID is required",
      );
      await expect(routines.getRoutine("   ")).rejects.toThrow(
        "Routine ID is required",
      );
    });
    it("returns routine data for valid ID", async () => {
      const routine: Routine = {
        id: "1",
        title: "Routine 1",
        folder_id: null,
        updated_at: "",
        created_at: "",
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce(routine);
      const result = await routines.getRoutine("1");
      expect(result).toEqual(routine);
      expect(sendRequestSpy).toHaveBeenCalledWith("/routines/1");
    });
  });

  describe("createRoutine", () => {
    it("calls sendRequest with correct params", async () => {
      const data: CreateRoutineRequest = {
        title: "New Routine",
        notes: "notes",
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce({ id: "2" });
      await routines.createRoutine(data);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/routines",
        "POST",
        data,
        expect.anything(),
      );
    });
  });

  describe("updateRoutine", () => {
    it("throws if routineID is empty or whitespace", async () => {
      await expect(
        routines.updateRoutine("", {} as UpdateRoutineRequest),
      ).rejects.toThrow("Routine ID is required");
      await expect(
        routines.updateRoutine("   ", {} as UpdateRoutineRequest),
      ).rejects.toThrow("Routine ID is required");
    });
    it("calls sendRequest with correct params", async () => {
      const data: UpdateRoutineRequest = {
        title: "Updated Routine",
        notes: "notes",
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce({ id: "3" });
      await routines.updateRoutine("3", data);
      expect(sendRequestSpy).toHaveBeenCalledWith(
        "/routines/3",
        "PUT",
        data,
        expect.anything(),
      );
    });
  });

  describe("integration edge cases", () => {
    it("throws ValidationError when createRoutine fails validation", async () => {
      sendRequestSpy.mockRejectedValueOnce(
        new ValidationError(new ZodError([])),
      );
      await expect(
        routines.createRoutine({} as CreateRoutineRequest),
      ).rejects.toThrow(ValidationError);
    });
    it("returns the newly created routine data", async () => {
      const routineData: Routine = {
        id: "4",
        title: "Test SDK Routine",
        folder_id: null,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        exercises: [],
      };
      sendRequestSpy.mockResolvedValueOnce(routineData);
      const newRoutine = await routines.createRoutine(
        routineData as unknown as CreateRoutineRequest,
      );
      expect(newRoutine).toEqual(routineData);
    });
  });
});
