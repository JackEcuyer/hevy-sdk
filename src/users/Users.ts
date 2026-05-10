import { HevyClient } from "../HevyClient.js";
import { UserInfo } from "./user.types.js";

/**
 * The Users class is used to interact with the users section of the Hevy API.
 * It provides methods for retrieving, creating, and managing users on the account.
 */
export class Users {
  // Store the instance of HevyClient to use for making API requests.
  private hevyClient: HevyClient;

  // Constructor accepts an instance of HevyClient for API interaction.
  constructor(client: HevyClient) {
    this.hevyClient = client;
  }

  /**
   *    Retrieves the current user's information from the Hevy API.
   * @returns A promise that resolves to a UserInfo object containing the user's metadata.
   * @throws Will throw an error if the API request fails or if the response is invalid.
   * @example
   * ```ts
   * import { HevyClient, HevyClientConfig, UserInfo } from 'hevy-sdk';
   *
   * const config: HevyClientConfig = { apiKey: 'your-api-key' };
   * const client: HevyClient = new HevyClient(config);
   * const userInfo: UserInfo = await client.users.getUserInfo();
   *
   * ```
   */
  public async getUserInfo(): Promise<UserInfo> {
    return this.hevyClient.sendRequest<UserInfo>(`/user/info`);
  }
}
