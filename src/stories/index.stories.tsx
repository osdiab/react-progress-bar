import * as React from "react";

import { storiesOf } from "@storybook/react";
import ProgressBar from "../";

interface BasicExampleState {
  progress: number;
  // whether or not the user has changed it, and we should therefore stop randomly
  // changing the number
  randomValueInterval?: number;
}

class BasicExample extends React.Component<{}, BasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progress: 50
    };
  }

  public componentDidMount() {
    this.setState({
      randomValueInterval: setInterval(this.randomlyAdjustValue, 3000)
    });
  }

  private readonly randomlyAdjustValue = () => {
    let newValue: number;
    do {
      newValue = Math.floor(100 * Math.random());
    } while (Math.abs(this.state.progress - newValue) < 20);

    this.setState({ progress: newValue });
  };

  private readonly handleProgressChange: React.EventHandler<
    React.ChangeEvent<HTMLInputElement>
  > = e => {
    if (this.state.randomValueInterval) {
      clearInterval(this.state.randomValueInterval);
      this.setState({ randomValueInterval: undefined });
    }

    this.setState({ progress: e.currentTarget.valueAsNumber });
  };

  public render() {
    return (
      <article>
        <label style={{ display: "flex", alignItems: "center" }}>
          Progress bar value
          <input
            type="range"
            onChange={this.handleProgressChange}
            value={this.state.progress}
            style={{ margin: "0 10px" }}
          />
          <span>{this.state.progress}</span>
        </label>

        <h2>Output</h2>
        <ProgressBar progress={this.state.progress} />

        <h2>Code</h2>
        <pre>
          <code>{`<ProgressBar progress={${this.state.progress}} />`}</code>
        </pre>
      </article>
    );
  }
}

storiesOf("ProgressBar", module).add("basic", () => <BasicExample />);
