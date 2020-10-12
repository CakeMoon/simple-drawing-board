
let data = [];

/**
 * @typedef Homes
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 */

 /**
 * @class Homes
 * Stores all Homes.
 */
class Homes {
    /**
     * @prop {string} user - user
     * @prop {numbers[]} x - x
     * @prop {numbers[]} y - y
     * @return {Home} - created Home
     */
    static addOne(user, x, y) {
      const home = {user, x, y};
      if (Homes.findOne(user) != undefined) {
        return undefined;
      } 
      data.push(home);
      return home;
    }
  
    /**
     * Find a Home by user
     * @param {string} user - user
     * @return {Freet | undefined} - found Home
     */
    static findOne(user) {
      const home =  data.filter(home => home.user === user)[0];
      return home;
    }


    /**
    * Return an array of all of Homes.
    * @return {Home[]}
    */
    static findAll() {
      return data;
    }
  
    /**
     * Update a Home.
     * @param {string} user - user
     * @prop {numbers[]]} x - x
     * @prop {numbers[]]} y - y
     * @return {Freet | undefined} - updated Home
     */
    static updateOne(user, x, y) {
      const home = Homes.findOne(user);
      home.x = x;
      home.y = y;
      return home;
    }
}

  module.exports = Homes;
  