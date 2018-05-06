import * as React from "react";

import { storiesOf } from "@storybook/react";
import ProgressBar from "../";

storiesOf("ProgressBar", module)
  .add("empty", () => <ProgressBar progress={0} />)
  .add("half", () => <ProgressBar progress={50} />)
  .add("full", () => <ProgressBar progress={100} />);
