
let data = [];

/**
 * @typedef Chairs
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 */

 /**
 * @class Chairs
 * Stores all Chairs.
 */
class Chairs {
    /**
     * @prop {string} user - user
     * @prop {numbers[]} x - x
     * @prop {numbers[]} y - y
     * @return {Chair} - created Chair
     */
    static addOne(user, x, y) {
      const chair = {user, x, y};
      if (Chairs.findOne(user) != undefined) {
        return undefined;
      } 
      data.push(chair);
      return chair;
    }
  
    /**
     * Find a Chair by user
     * @param {string} user - user
     * @return {Freet | undefined} - found Chair
     */
    static findOne(user) {
      const chair =  data.filter(chair => chair.user === user)[0];
      return chair;
    }


    /**
    * Return an array of all of Chairs.
    * @return {Chair[]}
    */
    static findAll() {
      return data;
    }
  
    /**
     * Update a Chair.
     * @param {string} user - user
     * @prop {numbers[]]} x - x
     * @prop {numbers[]]} y - y
     * @return {Freet | undefined} - updated Chair
     */
    static updateOne(user, x, y) {
      const chair = Chairs.findOne(user);
      chair.x = x;
      chair.y = y;
      return chair;
    }
}

  module.exports = Chairs;
  