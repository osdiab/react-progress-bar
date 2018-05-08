import * as React from "react";
import * as classnames from "classnames";
import {
  genClassNameWithLibraryDefaultBase,
  genClassNameWithManyBases
} from "./util/classNames";
import { BaseProps, ProgressBarType, baseClassName } from ".";

export interface Props extends BaseProps {}
const LineProgressBar: React.StatelessComponent<Props> = ({
  progress,
  className
}) => {
  const parentClassName = baseClassName(ProgressBarType.LINE, className);
  // generate appropriate class names for internal methods
  const progressClassName = classnames(
    genClassNameWithLibraryDefaultBase("progressBar"),
    className && genClassNameWithManyBases(className.split(" "), "progressBar")
  );
  return (
    <div className={parentClassName}>
      <div className={progressClassName} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default LineProgressBar;
