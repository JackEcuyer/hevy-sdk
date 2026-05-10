import { Users } from "../src/users/Users.js";
import { HevyClient } from "../src/HevyClient.js";
import { UserInfo } from "../src/users/user.types.js";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";

describe("Users", () => {
  let client: HevyClient;
  let users: Users;
  let sendRequestSpy: jest.SpiedFunction<HevyClient["sendRequest"]>;

  beforeEach(() => {
    client = new HevyClient({ apiKey: "test" });
    users = new Users(client);
    sendRequestSpy = jest.spyOn(client, "sendRequest");
  });

  it("should call sendRequest with the correct endpoint and return user info", async () => {
    const mockUserInfo: UserInfo = {
      id: "9c465af3-de7d-42bc-9c7c-f0170396358b",
      name: "John doe",
      url: "https://hevy.com/user/jhon",
    };
    sendRequestSpy.mockResolvedValueOnce(mockUserInfo);

    const result = await users.getUserInfo();
    expect(sendRequestSpy).toHaveBeenCalledWith("/user/info");
    expect(result).toEqual(mockUserInfo);
  });
});
