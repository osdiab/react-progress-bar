import * as React from "react";

import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import prism from "react-syntax-highlighter/styles/prism/prism";
registerLanguage("jsx", jsx);

import { storiesOf } from "@storybook/react";
import ProgressBar from "../";
import "../index.css";
import "./stories.css";

interface BasicExampleState {
  progress: number;
  // whether or not the user has changed it, and we should therefore stop randomly
  // changing the number
  randomValueInterval?: number;
}

class LineExample extends React.Component<{}, BasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progress: 50
    };
  }

  public componentDidMount() {
    this.setState({
      randomValueInterval: window.setInterval(this.randomlyAdjustValue, 3000)
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
        <h1>
          <code>ProgressBarType.LINE</code>
        </h1>
        <p>A progress bar rendered as a line.</p>
        <h2>Example</h2>
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
        <h3>Output</h3>
        <ProgressBar progress={this.state.progress} />
        <h3>Code</h3>
        <SyntaxHighlighter language="jsx" style={prism}>
          {`import ProgressBar, { ProgressBarType } from "react-progress-bar";

<ProgressBar progress={${this.state.progress}} />
// or
<ProgressBar type={ProgressBarType.LINE} progress={${this.state.progress}} />`}
        </SyntaxHighlighter>
      </article>
    );
  }
}

storiesOf("ProgressBar", module).add("ProgressBarType.LINE", () => (
  <LineExample />
));
