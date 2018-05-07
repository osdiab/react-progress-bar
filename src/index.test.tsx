import * as React from "react";
import { shallow } from "enzyme";

import ProgressBar from "./";

describe("ProgressBar", () => {
  it("doesn't crash on render", () => {
    shallow(<ProgressBar progress={50} />);
  });
});
