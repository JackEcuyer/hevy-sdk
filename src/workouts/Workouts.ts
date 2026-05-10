import { HevyClient } from "../HevyClient.js";
import { createWorkoutSchema, updateWorkoutSchema } from "./workout.schema.js";
import { Workout, GetWorkoutsResponse } from "./workout.types.js";
import { CreateWorkoutRequest, UpdateWorkoutRequest } from "./workout.types.js";

/**
 * The Workouts class is used to interact with the workouts section of the Hevy API.
 * It provides methods for retrieving, creating, and managing workouts on the account.
 */
export class Workouts {
  // Store the instance of HevyClient to use for making API requests.
  private hevyClient: HevyClient;

  // Constructor accepts an instance of HevyClient for API interaction.
  constructor(client: HevyClient) {
    this.hevyClient = client;
  }

  /**
   * Retrieves a list of workouts from the API.
   * @param page - The page number for pagination. Must be a positive integer.
   * @param pageSize - The number of workouts per page. Must be a positive integer and no greater than 10.
   * @returns A promise that resolves to a list of workouts.
   * @throws Error if the page or pageSize is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, GetWorkoutsResponse } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const workouts: GetWorkoutsResponse = await client.workouts.listWorkouts(1, 10);
   * ```
   */
  public async listWorkouts(
    page: number,
    pageSize: number,
  ): Promise<GetWorkoutsResponse> {
    return this.hevyClient.sendRequest<GetWorkoutsResponse>(
      `/workouts?page=${page}&pageSize=${pageSize}`,
    );
  }

  /**
   * Retrieves the total number of workouts on the account.
   * @returns A promise that resolves to the total workout count.
   * @throws Error if the API request fails.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const count: number = await client.workouts.getWorkoutCount();
   * ```
   */
  public async getWorkoutCount(): Promise<number> {
    // Use APIRequest helper to send GET request
    const response = await this.hevyClient.sendRequest<{
      workoutCount: number;
    }>(`/workouts/count`);
    return response.workoutCount;
  }

  /**
   * Retrieves a specific workout by workoutID.
   * @param workoutID - The unique ID of the workout to retrieve.
   * @returns A promise that resolves to the workout data for the specified workout ID.
   * @throws Error if the workoutID is invalid or missing.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, Workout } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const workout: Workout = await client.workouts.getWorkout("workout-id");
   * ```
   */
  public async getWorkout(workoutID: string): Promise<Workout> {
    // Remove whitespace from start & end of ID
    workoutID = workoutID.trim();
    // Ensure an ID has been provided
    if (!workoutID) {
      throw new Error("Workout ID is required");
    }
    // Use APIRequest helper to send GET request
    return this.hevyClient.sendRequest<Workout>(`/workouts/${workoutID}`);
  }

  /**
   * Creates a new workout.
   * @param data - The workout object to create.
   * @returns A promise that resolves to the newly created workout data.
   * @throws {@link ValidationError} if the provided workout data is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, CreateWorkoutRequest, Workout } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * // Construct a valid workout object
   * const validWorkoutObject: CreateWorkoutRequest = { ... };
   * const newWorkout: Workout = await client.workouts.createWorkout(validWorkoutObject);
   * ```
   */
  public async createWorkout(data: CreateWorkoutRequest): Promise<Workout> {
    return this.hevyClient.sendRequest<Workout>(
      `/workouts`,
      "POST",
      data,
      createWorkoutSchema,
    );
  }

  /**
   * Updates an existing workout.
   * @param workoutID - The unique ID of the workout to update.
   * @param data - The updated workout data.
   * @returns A promise that resolves to the updated workout data.
   * @throws Error if the workoutID is invalid or missing.
   * @throws {@link ValidationError} if the provided workout data is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, UpdateWorkoutRequest, Workout } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * // Construct a valid update object
   * const validUpdateObject: UpdateWorkoutRequest = { ... };
   * const updatedWorkout: Workout = await client.workouts.updateWorkout("workout-id", validUpdateObject);
   * ```
   */
  public async updateWorkout(
    workoutID: string,
    data: UpdateWorkoutRequest,
  ): Promise<Workout> {
    // Remove whitespace from start & end of ID
    workoutID = workoutID.trim();
    // Ensure an ID has been provided
    if (!workoutID) {
      throw new Error("Workout ID is required");
    }
    return this.hevyClient.sendRequest<Workout>(
      `/workouts/${workoutID}`,
      "PUT",
      data,
      updateWorkoutSchema,
    );
  }
}
