import * as React from "react";
import * as classnames from "classnames";

import LineProgressBar, { Props as LineProps } from "./LineProgressBar";
import StepsProgressBar, { Props as StepsProps } from "./StepsProgressBar";
import { genClassNameWithLibraryDefaultBase } from "./util/classNames";

export enum ProgressBarType {
  LINE = "line",
  STEPS = "steps"
}

export interface BaseProps {
  progress: number;
  className?: string;
}

export type TopLevelLineProps = {
  type?: ProgressBarType.LINE;
} & LineProps;
export type TopLevelStepsProps = {
  type: ProgressBarType.STEPS;
} & StepsProps;
export type Props = TopLevelLineProps | TopLevelStepsProps;

const ProgressBar: React.StatelessComponent<Props> = props => {
  switch (props.type) {
    default:
      // @ts-ignore This is for non-typescript consumers
      throw new Error(`Invalid ProgressBar type: ${props.type}`); // fallthrough to LINE
    case undefined:
    case ProgressBarType.LINE:
      return (
        <LineProgressBar
          progress={props.progress}
          className={props.className}
        />
      );
    case ProgressBarType.STEPS:
      return (
        <StepsProgressBar
          progress={props.progress}
          className={props.className}
          numSteps={props.numSteps}
        />
      );
  }
};

export default ProgressBar;

export const genBaseClassName = (type: ProgressBarType, className?: string) =>
  classnames(genClassNameWithLibraryDefaultBase(`type-${type}`), className);
