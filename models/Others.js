
let data = [];

/**
 * @typedef Others
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 */

 /**
 * @class Others
 * Stores all Others.
 */
class Others {
    /**
     * @prop {string} user - user
     * @prop {numbers[]} x - x
     * @prop {numbers[]} y - y
     * @return {Other} - created Other
     */
    static addOne(user, x, y) {
      const other = {user, x, y};
      if (Others.findOne(user) != undefined) {
        return undefined;
      } 
      data.push(other);
      return other;
    }
  
    /**
     * Find a Other by user
     * @param {string} user - user
     * @return {Freet | undefined} - found Other
     */
    static findOne(user) {
      const other =  data.filter(other => other.user === user)[0];
      return other;
    }


    /**
    * Return an array of all of Others.
    * @return {Other[]}
    */
    static findAll() {
      return data;
    }
  
    /**
     * Update a Other.
     * @param {string} user - user
     * @prop {numbers[]]} x - x
     * @prop {numbers[]]} y - y
     * @return {Freet | undefined} - updated Other
     */
    static updateOne(user, x, y) {
      const other = Others.findOne(user);
      other.x = x;
      other.y = y;
      return other;
    }
}

  module.exports = Others;
  