/**
 * The {@code Stopwatch} data type is for measuring
 * the time that elapses between the start and end of a
 * programming task (wall-clock time).
 *
 * See {@link StopwatchCPU} for a version that measures CPU time.
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
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
