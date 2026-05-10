/**
 * Represents the structure of user information returned by the Hevy API.
 */
export type UserInfo = {
  /** The user ID. Example: 9c465af3-de7d-42bc-9c7c-f0170396358b */
  id: string;
  /** The user's display name. Example: John doe */
  name: string;
  /** The user's public profile URL. Example: https://hevy.com/user/jhon */
  url: string;
};
