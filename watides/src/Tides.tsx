import { Component } from "react";
import { TidesInstance } from "./models/TidesInstance";
import { TidesResult } from "./models/TidesResult";

export class Tides extends Component<{}, { tides?: TidesResult }> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getTideResult();
  }

  render() {
    let tide: TidesInstance = this.getNextTide(this.state.tides);

    return <div>OK! Next tide: {new Date(tide?.t).toLocaleString()}</div>;
  }

  getNextTide(result: TidesResult | undefined): TidesInstance {
    if (result !== undefined) {
      return result.predictions[0];
    }
    return { t: new Date(), v: 0, type: "" };
  }

  getCurrentDateString()
  {
  }

  async getTideResult() {
    const route = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20210423&end_date=20210429&datum=MLLW&station=9445326&time_zone=lst_ldt&units=english&interval=hilo&format=json`;

    await fetch(route)
      .then((response) => {
        return response.json();
      })
      .then((data: TidesResult) => {
        this.setState({ tides: data });
      })
      .catch((error: Error) => {
        console.log("Error: ", error.message);
      });
  }
}
