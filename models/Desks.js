
let data = [];

/**
 * @typedef Desks
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 */

 /**
 * @class Desks
 * Stores all Desks.
 */
class Desks {
    /**
     * @prop {string} user - user
     * @prop {numbers[]} x - x
     * @prop {numbers[]} y - y
     * @return {Desk} - created Desk
     */
    static addOne(user, x, y) {
      const desk = {user, x, y};
      if (Desks.findOne(user) != undefined) {
        return undefined;
      } 
      data.push(desk);
      return desk;
    }
  
    /**
     * Find a Desk by user
     * @param {string} user - user
     * @return {Freet | undefined} - found Desk
     */
    static findOne(user) {
      const desk =  data.filter(desk => desk.user === user)[0];
      return desk;
    }


    /**
    * Return an array of all of Desks.
    * @return {Desk[]}
    */
    static findAll() {
      return data;
    }
  
    /**
     * Update a Desk.
     * @param {string} user - user
     * @prop {numbers[]]} x - x
     * @prop {numbers[]]} y - y
     * @return {Freet | undefined} - updated Desk
     */
    static updateOne(user, x, y) {
      const desk = Desks.findOne(user);
      desk.x = x;
      desk.y = y;
      return desk;
    }
}

  module.exports = Desks;
  