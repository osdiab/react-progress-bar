import * as React from "react";
import * as classnames from "classnames";
import { genClassNameWithManyBases } from "./util/classNames";
import { BaseProps, ProgressBarType, genBaseClassName } from ".";
import range from "./util/range";

export interface Props extends BaseProps {
  numSteps: number;
}

const StepsProgressBar: React.StatelessComponent<Props> = ({
  progress,
  numSteps,
  className
}) => {
  const parentClassName = genBaseClassName(ProgressBarType.STEPS, className);

  // generate appropriate class names for internal methods
  const stepClassName = genClassNameWithManyBases(
    parentClassName.split(" "),
    "step"
  );
  const [completeClassName, incompleteClassName] = [
    "complete",
    "incomplete"
  ].map(v => genClassNameWithManyBases(stepClassName.split(" "), v));

  return (
    <div className={parentClassName}>
      {range(0, numSteps).map(stepNum => (
        <div
          className={classnames(
            stepClassName,
            progress - stepNum >= 0 ? completeClassName : incompleteClassName
          )}
        />
      ))}
    </div>
  );
};

export default StepsProgressBar;
