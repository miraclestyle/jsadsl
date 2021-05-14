/**
 * The {@code Stopwatch} data type is for measuring
 * the time that elapses between the start and end of a
 * programming task (wall-clock time).
 *
 *
 * @author Elvin Kosova
 */
const Stopwatch = () => {
  const start = Date.now();

  /**
   * Returns the elapsed CPU time (in seconds)
   * since the stopwatch was created.
   *
   * @return elapsed CPU time (in seconds) since
   * the stopwatch was created
   */
  const elapsedTime = () => {
    const now = Date.now();
    return (now - start) / 1000.0;
  };

  return Object.freeze({ elapsedTime });
};

module.exports = Stopwatch;
