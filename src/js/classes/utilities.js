/* @flow */

/** Utility classes. */

class Utilities{

  /**
   * Get the current browser width.
   */

  static getWidth(target:Document):number
  {
    let result:number = -1;

    if(target != null
      && target.body != null
      && target.documentElement != null)
      {
        result = Math.max(
          target.body.scrollWidth,
          target.documentElement.scrollWidth,
          target.body.offsetWidth,
          target.documentElement.offsetWidth,
          target.documentElement.clientWidth
        );
      }
      else
      {
        throw new Error("document || document.body || document.documentElement was not defined.");
      }

      return result;
    }
}

export default Utilities;
