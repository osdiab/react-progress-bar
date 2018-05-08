import * as React from "react";
import { genClassNameWithManyBases } from "./util/classNames";
import { BaseProps, ProgressBarType, genBaseClassName } from ".";

export interface Props extends BaseProps {}
const LineProgressBar: React.StatelessComponent<Props> = ({
  progress,
  className
}) => {
  const parentClassName = genBaseClassName(ProgressBarType.LINE, className);
  // generate appropriate class names for internal methods
  const progressClassName = genClassNameWithManyBases(
    parentClassName.split(" "),
    "progressBar"
  );

  return (
    <div className={parentClassName}>
      <div className={progressClassName} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default LineProgressBar;
