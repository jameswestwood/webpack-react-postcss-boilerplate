/* @flow */

/** Utility classes. */

class Utilities{

  /**
   * Get the current browser width.
   */

  static getWidth():number
  {
    let result:number = -1;

    if(document != null
      && document.body != null
      && document.documentElement != null)
      {
        result = Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
      else
      {
        throw new Error("document was not defined.");
      }

      return result;
    }
}

export default Utilities;
