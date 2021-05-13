/**
 * The {@code LinearRegression} class performs a simple linear regression
 * on an set of <em>n</em> data points (<em>y<sub>i</sub></em>, <em>x<sub>i</sub></em>).
 * That is, it fits a straight line <em>y</em> = &alpha; + &beta; <em>x</em>,
 * (where <em>y</em> is the response variable, <em>x</em> is the predictor variable,
 * &alpha; is the <em>y-intercept</em>, and &beta; is the <em>slope</em>)
 * that minimizes the sum of squared residuals of the linear regression model.
 * It also computes associated statistics, including the coefficient of
 * determination <em>R</em><sup>2</sup> and the standard deviation of the
 * estimates for the slope and <em>y</em>-intercept.
 * @param x the values of the predictor variable
 * @param y the corresponding values of the response variable
 * @throws an Error if the lengths of the two arrays are not equal
 *
 * @author Elvin Kosova
 */
const LinearRegression = (x, y) => {
  let I;
  let S;
  let r2;
  let svar0;
  let svar1;

  /**
   * Performs a linear regression on the data
   * points {@code (y[i], x[i])}.
   *
   */
  const init = () => {
    if (x.length !== y.length) {
      throw new Error('Array lengths are not equal!');
    }
    const n = x.length;

    // first pass
    let sumx = 0.0;
    let sumy = 0.0;
    // let sumx2 = 0.0;
    for (let i = 0; i < n; i += 1) {
      sumx += x[i];
      // sumx2 += x[i] * x[i];
      sumy += y[i];
    }
    const xbar = sumx / n;
    const ybar = sumy / n;

    // second pass: compute summary statistics
    let xxbar = 0.0;
    let yybar = 0.0;
    let xybar = 0.0;
    for (let i = 0; i < n; i += 1) {
      xxbar += (x[i] - xbar) * (x[i] - xbar);
      yybar += (y[i] - ybar) * (y[i] - ybar);
      xybar += (x[i] - xbar) * (y[i] - ybar);
    }
    S = xybar / xxbar;
    I = ybar - S * xbar;

    // more statistical analysis
    let rss = 0.0; // residual sum of squares
    let ssr = 0.0; // regression sum of squares
    for (let i = 0; i < n; i += 1) {
      const fit = S * x[i] + I;
      rss += (fit - y[i]) * (fit - y[i]);
      ssr += (fit - ybar) * (fit - ybar);
    }

    const degreesOfFreedom = n - 2;
    r2 = ssr / yybar;
    const svar = rss / degreesOfFreedom;
    svar1 = svar / xxbar;
    svar0 = svar / n + xbar * xbar * svar1;
  };

  init();

  /**
   * Returns the <em>y</em>-intercept &alpha; of the best
   * of the best-fit line <em>y</em> = &alpha; + &beta; <em>x</em>.
   *
   * @return the <em>y</em>-intercept &alpha; of the
   * best-fit line <em>y = &alpha; + &beta; x</em>
   */
  const intercept = () => (I);

  /**
   * Returns the slope &beta; of the best of the best-fit line
   * <em>y</em> = &alpha; + &beta; <em>x</em>.
   *
   * @return the slope &beta; of the best-fit line
   * <em>y</em> = &alpha; + &beta; <em>x</em>
   */
  const slope = () => (S);

  /**
   * Returns the coefficient of determination <em>R</em><sup>2</sup>.
   *
   * @return the coefficient of determination <em>R</em><sup>2</sup>,
   * which is a real number between 0 and 1
   */
  const R2 = () => (r2);

  /**
   * Returns the standard error of the estimate for the intercept.
   *
   * @return the standard error of the estimate for the intercept
   */
  const interceptStdErr = () => (Math.sqrt(svar0));

  /**
   * Returns the standard error of the estimate for the slope.
   *
   * @return the standard error of the estimate for the slope
   */
  const slopeStdErr = () => (Math.sqrt(svar1));

  /**
   * Returns the expected response {@code y}
   * given the value of the predictor variable {@code x}.
   *
   * @param p the value of the predictor variable
   * @return the expected response {@code y}
   * given the value of the predictor variable {@code x}
   */
  const predict = (p) => (S * p + I);

  /**
   * Returns a string representation of the simple linear
   * regression model.
   *
   * @return a string representation of the simple linear
   * regression model, including the best-fit line and
   * the coefficient of determination
   * <em>R</em><sup>2</sup>
   */
  const toString = () => (
    `${slope()} n + ${intercept()} (R^2 = ${R2()})`
  );

  return Object.freeze({
    intercept,
    slope,
    R2,
    interceptStdErr,
    slopeStdErr,
    predict,
    toString,
  });
};

module.exports = LinearRegression;
