// @flow
export default class Hue {
  static async discover (): Promise<[?string, ?string]> {
    const resp = await fetch('https://discovery.meethue.com');

    let [address, username] = [null, null];
    const addresses = await resp.json();

    if (addresses.length > 0) {
      address = addresses[0].internalipaddress;
      const hueUser = localStorage.getItem(this.getUserKey(address));
      if (hueUser != null) {
        username = hueUser;
      }
    }

    return [address, username];
  }

  static async link (address: string): Promise<string> {
    const resp = await fetch(
      `http://${address}/api`,
      {
        method: 'POST',
        body: JSON.stringify({'devicetype':'hue_sync#web_client'}),
      });

    const data = await resp.json();

    if(data.length === 0) {
      return 'NO_RESPONSE';
    }

    if(data[0].error && data[0].error.type === 101) {
      return 'PRESS_LINK';
    }

    const {username} = data[0].success;
    localStorage.setItem('last_bridge_ip', address);
    localStorage.setItem(this.getUserKey(address), username);
    return username;
  }

  static async getNumLights (
    address: string,
    user: string,
  ): Promise<number> {
    const lights = await this.makeApiCall(address, user,'lights');
    return Object.keys(lights).length;
  }

  static async setLight(
    address: string,
    user: string,
    n: number,
    data: Object,
  ): Promise<void> {
    const resp = await this.makeApiCall(address, user, `lights/${n}/state`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    console.log(resp);
  }

  static async setAllLights(
    address: string,
    user: string,
    data: Object,
  ): Promise<void> {
    const resp = await this.makeApiCall(address, user, `groups/0/action`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    console.log(resp);
  }

  static async getCapabilities(address: string, user: string): Promise<Object> {
    return await this.makeApiCall(address, user, 'capabilities');
  }

  static getUserKey(address: string): string {
    return `hueBridge${address}`;
  }

  static async makeApiCall(
    address: string,
    username: string,
    endpoint: string,
    options: Object = {},
  ): Promise<Object> {
    const resp = await fetch(this.getUri(address, username, endpoint), options);
    return await resp.json();
  }

  static getUri(
    address: string,
    username: string,
    endpoint: string,
  ): string {
    return `http://${address}/api/${username}/${endpoint}`;
  }
}
