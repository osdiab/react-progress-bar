import * as React from "react";

import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import jsx from "react-syntax-highlighter/languages/prism/jsx";
import css from "react-syntax-highlighter/languages/prism/css";
import prism from "react-syntax-highlighter/styles/prism/prism";
registerLanguage("jsx", jsx);
registerLanguage("css", css);

import { storiesOf } from "@storybook/react";
import ProgressBar, { ProgressBarType } from "../";
import "../index.css";
import "./stories.css";

interface BasicExampleState {
  progress: number;
  // whether or not the user has changed it, and we should therefore stop randomly
  // changing the number
  randomValueInterval?: number;
}

const NUM_STEPS = 5;

class BasicExample extends React.Component<{}, BasicExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progress: 2
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
      newValue = Math.floor(NUM_STEPS * Math.random());
    } while (this.state.progress === newValue);

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
          <code>ProgressBarType.STEPS</code>
        </h1>
        <p>A progress bar rendered as a finite number of steps.</p>
        <h2>Basic Example</h2>
        <label style={{ display: "flex", alignItems: "center" }}>
          Progress bar value
          <input
            type="range"
            onChange={this.handleProgressChange}
            value={this.state.progress}
            style={{ margin: "0 10px" }}
            max={NUM_STEPS - 1}
          />
          <span>{this.state.progress}</span>
        </label>
        <h3>Output</h3>
        <ProgressBar
          type={ProgressBarType.STEPS}
          progress={this.state.progress}
          numSteps={NUM_STEPS}
        />
        <h3>Code</h3>
        <SyntaxHighlighter language="jsx" style={prism}>
          {`import ProgressBar, { ProgressBarType } from "react-progress-pole";

<ProgressBar
  type={ProgressBarType.STEPS}
  progress={${this.state.progress}}
  numSteps={${NUM_STEPS}}
/>
`}
        </SyntaxHighlighter>
      </article>
    );
  }
}

storiesOf("ProgressBar", module).add("Using ProgressBarType.STEPS", () => (
  <BasicExample />
));
