import { HevyClient } from "../HevyClient.js";
import { createRoutineSchema, updateRoutineSchema } from "./routine.schema.js";
import {
  CreateRoutineRequest,
  GetRoutinesResponse,
  Routine,
  UpdateRoutineRequest,
} from "./routine.types.js";

/**
 * The Routines class is used to interact with the routines section of the Hevy API.
 * It provides methods for retrieving, creating, and managing routines on the account.
 */
export class Routines {
  // Store the instance of HevyClient to use for making API requests.
  private hevyClient: HevyClient;

  // Constructor accepts an instance of HevyClient for API interaction.
  constructor(client: HevyClient) {
    this.hevyClient = client;
  }

  /**
   * Retrieves a list of routines from the API.
   * @param page - The page number for pagination. Must be a positive integer.
   * @param pageSize - The number of routines per page. Must be a positive integer and no greater than 10.
   * @returns A promise that resolves to a list of routines.
   * @throws Error if the page or pageSize is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, GetRoutinesResponse } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const routines: GetRoutinesResponse = await client.routines.listRoutines(1, 10);
   * ```
   */
  public async listRoutines(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<GetRoutinesResponse> {
    return this.hevyClient.sendRequest<GetRoutinesResponse>(
      `/routines?page=${page}&pageSize=${pageSize}`,
    );
  }

  /**
   * Retrieves a specific routine by routineID.
   * @param routineID - The unique ID of the routine to retrieve.
   * @returns A promise that resolves to the routine data for the specified routine ID.
   * @throws Error if the routineID is invalid or missing.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, Routine } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const routine: Routine = await client.routines.getRoutine("routine-id");
   * ```
   */
  public async getRoutine(routineID: string): Promise<Routine> {
    if (!routineID || routineID.trim() === "") {
      throw new Error("Routine ID is required");
    }
    return this.hevyClient.sendRequest<Routine>(`/routines/${routineID}`);
  }

  /**
   * Updates an existing routine.
   * @param routineID - The unique ID of the routine to update.
   * @param data - The updated routine data.
   * @returns A promise that resolves to the updated routine data.
   * @throws Error if the routineID is invalid or missing.
   * @throws {@link ValidationError} if the provided routine data is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, UpdateRoutineRequest, Routine } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * // Construct a valid update object
   * const validUpdateObject: UpdateRoutineRequest = { ... };
   * const updatedRoutine: Routine = await client.routines.updateRoutine("routine-id", validUpdateObject);
   * ```
   */
  public async updateRoutine(
    routineID: string,
    data: UpdateRoutineRequest,
  ): Promise<Routine> {
    if (!routineID || routineID.trim() === "") {
      throw new Error("Routine ID is required");
    }
    return this.hevyClient.sendRequest<Routine>(
      `/routines/${routineID}`,
      "PUT",
      data,
      updateRoutineSchema,
    );
  }

  /**
   * Creates a new routine.
   * @param data - The routine object to create.
   * @returns A promise that resolves to the newly created routine data.
   * @throws {@link ValidationError} if the provided routine data is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, CreateRoutineRequest, Routine } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * // Construct a valid routine object
   * const validRoutineObject: CreateRoutineRequest = { ... };
   * const newRoutine: Routine = await client.routines.createRoutine(validRoutineObject);
   * ```
   */
  public async createRoutine(data: CreateRoutineRequest): Promise<Routine> {
    return this.hevyClient.sendRequest<Routine>(
      `/routines`,
      "POST",
      data,
      createRoutineSchema,
    );
  }
}
