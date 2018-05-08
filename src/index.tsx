import * as React from "react";
import * as classnames from "classnames";

import LineProgressBar from "./LineProgressBar";
import {
  BASE_CLASSNAME,
  genClassNameWithLibraryDefaultBase
} from "./util/classNames";

export enum ProgressBarType {
  LINE = "line"
}

export interface BaseProps {
  progress: number;
  className?: string;
}

export interface Props extends BaseProps {
  type?: ProgressBarType;
}

export const baseClassName = (type: ProgressBarType, className?: string) =>
  classnames(
    BASE_CLASSNAME,
    genClassNameWithLibraryDefaultBase(`type-${type}`),
    className
  );

const ProgressBar: React.StatelessComponent<Props> = ({
  progress,
  className,
  type = ProgressBarType.LINE
}) => {
  switch (type) {
    default:
      throw new Error("Invalid ProgressBar Type"); // fallthrough to LINE
    case ProgressBarType.LINE:
      return <LineProgressBar progress={progress} className={className} />;
  }
};

export default ProgressBar;
