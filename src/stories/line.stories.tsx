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
import ProgressBar from "../";
import "../index.css";
import "./stories.css";

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
        <h2>Basic Example</h2>
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
          {`import ProgressBar, { ProgressBarType } from "react-progress-pole";

<ProgressBar progress={${this.state.progress}} />
// or
<ProgressBar type={ProgressBarType.LINE} progress={${this.state.progress}} />`}
        </SyntaxHighlighter>

        <h2>Styled Example</h2>
        <h3>Output</h3>
        <ProgressBar progress={this.state.progress} className="fancyBar" />
        <h3>Code</h3>
        <h4>JSX</h4>
        <SyntaxHighlighter language="jsx" style={prism}>
          {`<ProgressBar progress={${
            this.state.progress
          }} className="fancyBar" />`}
        </SyntaxHighlighter>
        <h4>CSS</h4>
        <SyntaxHighlighter language="css" style={prism}>
          {`.fancyBar {
  border: 3px red solid;
  height: 15px;
}

.fancyBar--progressBar {
  background: purple;
}`}
        </SyntaxHighlighter>
      </article>
    );
  }
}

storiesOf("ProgressBar", module).add("Using ProgressBarType.LINE", () => (
  <BasicExample />
));
