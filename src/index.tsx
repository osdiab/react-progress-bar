import * as React from "react";
import * as classnames from "classnames";

export enum ProgressBarType {
  LINE = "line"
}

export interface Props {
  progress: number;
  className?: string;
  type?: ProgressBarType.LINE;
}

const CLASSNAME_DELIMITER = "--";

function concatClassNames(delimiter: string, ...names: string[]): string {
  return names.join(delimiter);
}

// IMPORTANT: Ensure this matches the classname in index.css.
const BASE_CLASSNAME = concatClassNames(
  CLASSNAME_DELIMITER,
  "osdiab",
  "react-progress-bar"
);

function genClassName(...names: string[]): string {
  return concatClassNames(CLASSNAME_DELIMITER, BASE_CLASSNAME, ...names);
}

const ProgressBar: React.StatelessComponent<Props> = ({
  progress,
  className,
  type = ProgressBarType.LINE
}) => {
  const fullClassName = classnames([
    BASE_CLASSNAME,
    genClassName(`type-${type}`),
    className
  ]);
  const progressClassName = classnames([genClassName("progressBar")]);
  return (
    <div className={fullClassName}>
      <div className={progressClassName} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
