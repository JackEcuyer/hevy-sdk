import { ZodSchema } from "zod";
import { Workouts } from "./workouts/Workouts.js";
import { Users } from "./users/Users.js";
import { Routines } from "./routines/Routines.js";
import { APIRequest } from "./api-request.js";
import { ValidationError } from "./errors.js";

type HevyApiHTTPMethod = "GET" | "POST" | "PUT";
const apiBaseURL = "https://api.hevy.com/v1";

/**
 * Configuration options for initializing a HevyClient instance.
 *
 * @property apiKey - The API key used for authenticating requests to the Hevy API.
 */
export interface HevyClientConfig {
  /**
   * The API key used for authenticating requests to the Hevy API.
   */
  apiKey: string;
}

/**
 * Entry point for the Hevy SDK.
 * It provides access to various sections of the API, such as workouts, by exposing them as properties.
 *
 * To use the SDK, import the `HevyClient` class and initialize it with your API key.
 *
 * @example
 * ```ts
 * import { HevyClient, HevyClientConfig } from 'hevy-sdk';
 *
 * const config: HevyClientConfig = { apiKey: 'your-api-key' };
 * const client: HevyClient = new HevyClient(config);
 * ```
 */
export class HevyClient {
  /**
   * The configuration object used for authentication and other settings with the Hevy API.
   * This object is required for accessing the API sections.
   */
  private config: HevyClientConfig;
  /** Exposes the `Workouts` section, which allows users to interact with workout-related functionality in the API. @see {@link Workouts} */
  public readonly workouts: Workouts;
  /** Exposes the `Users` section, which allows users to interact with user-related functionality in the API. @see {@link Users} */
  public readonly users: Users;
  /** Exposes the `Routines` section, which allows users to interact with routine-related functionality in the API. @see {@link Routines} */
  public readonly routines: Routines;
  /**
   * Creates an instance of the HevyClient.
   * Initializes the client with the provided API key and exposes various API sections (e.g. `workouts`).
   * @param config - The configuration object for the HevyClient.
   * @throws Will throw an error if the API key is missing from the configuration.
   */
  constructor(config: HevyClientConfig) {
    // Validate API key is present
    if (!config.apiKey) {
      throw new Error("API Key is required to initialize HevyClient");
    }

    this.config = config;
    // Instantiate API section classes, allowing the user to interact with each section through `client.{SectionName}.`
    this.workouts = new Workouts(this);
    this.users = new Users(this);
    this.routines = new Routines(this);
  }

  /* 
    All API requests made through the client will utilize this method, which serves as a centralized point for 
    handling request logic, including error handling and optional request data validation using Zod schemas.
  */
  public async sendRequest<T>(
    endpoint: string,
    method: HevyApiHTTPMethod = "GET",
    data: unknown | null = null,
    schema?: ZodSchema,
  ): Promise<T> {
    if (schema) {
      // Validate request data against provided Zod schema before sending the request
      const validationResult = schema.safeParse(data);
      if (!validationResult.success) {
        // If validation fails, throw an error with details of the validation issues
        throw new ValidationError(validationResult.error);
      }
    }
    return APIRequest<T>(
      `${apiBaseURL}${endpoint}`,
      method,
      data,
      this.config.apiKey,
    );
  }
}
