import axios from "axios";
import type { CheckinItem, CheckinResponseBody } from "~/types/foursquare";

export class FoursquareClient {
  constructor(private readonly token: string) {}

  async getSelfCheckins(): Promise<CheckinItem[]> {
    const ENDPOINT = "https://api.foursquare.com/v2/users/self/checkins";
    const params = {
      oauth_token: this.token,
      limit: 200,
      v: "20221016",
      lang: "ja",
    };

    const response = await axios.get<CheckinResponseBody>(ENDPOINT, { params });
    if (response.status !== 200) {
      throw new Error(`API Call Error : Response Status is not 200, respond status ${response.status}`);
    }

    return response.data.response.checkins.items;
  }
}
