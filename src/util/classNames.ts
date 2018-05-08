import * as classnames from "classnames";

export const CLASSNAME_DELIMITER = "--";

// IMPORTANT: Ensure this matches the classname in index.css.
export const BASE_CLASSNAME = concatClassNames(
  CLASSNAME_DELIMITER,
  "osdiab",
  "react-progress-bar"
);

export function concatClassNames(
  delimiter: string,
  ...names: string[]
): string {
  return names.join(delimiter);
}

/**
 *
 * @param base fir
 * @param names
 */
export function genClassNameWithBase(base: string, ...names: string[]): string {
  return concatClassNames(CLASSNAME_DELIMITER, base, ...names);
}

/**
 * @param bases names to prefix classnames off of
 * @param names names to be appended to each base class name, separated by standardized delimiters
 */
export function genClassNameWithManyBases(
  bases: string[],
  ...names: string[]
): string {
  return classnames(bases.map(b => genClassNameWithBase(b, ...names)));
}

export function genClassNameWithLibraryDefaultBase(...names: string[]): string {
  return genClassNameWithBase(BASE_CLASSNAME, ...names);
}
