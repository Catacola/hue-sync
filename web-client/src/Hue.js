// @flow

class Hue {
  address: string;
  username: string;

  constructor(address: string = '', username: string = '') {
    this.address = address;
    this.username = username;
  }

  async discover() {
    const resp = await fetch('https://discovery.meethue.com');

    const addresses = await resp.json();

    if (addresses.length > 0) {
      this.address = addresses[0].internalipaddress;
      const hueUser = localStorage.getItem(this.getUserKey());
      if (hueUser != null) {
        this.username = hueUser;
      }

    }
  }

  async link(): Promise<string> {
    if (this.address === '') {
      return 'NO_BRIDGE';
    }

    const resp = await fetch(
      `https://${this.address}/api`,
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
    localStorage.setItem('last_bridge_ip', this.address);
    localStorage.setItem(this.getUserKey(), username);
    return 'SUCCESS';
  }

  getUserKey(): string {
    return `hueBridge${this.address}`;
  }

  clone(): Hue {
    return new Hue(this.address, this.username);
  }
}

export default Hue;
