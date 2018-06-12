/* @flow */

/** Utility classes. */

class Utilities{

  /**
   * Get the current browser width.
   */

  static getWidth():number
  {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
}

export default Utilities;
