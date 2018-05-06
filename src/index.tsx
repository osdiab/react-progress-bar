import * as React from "react";
import * as classnames from "classnames";

export interface Props {
  progress: number;
  className?: string;
}

// IMPORTANT: Ensure this matches the classname in index.css.
const PROGRESS_BAR_CLASSNAME = "osdiab--react-progress-bar";

const ProgressBar: React.StatelessComponent<Props> = ({
  progress,
  className
}) => {
  return (
    <div className={classnames(PROGRESS_BAR_CLASSNAME, className)}>
      <span>{progress}</span>
    </div>
  );
};

export default ProgressBar;
