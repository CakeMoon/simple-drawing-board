
let data = [];

/**
 * @typedef Cameras
 * @prop {string} user - user
 * @prop {numbers[]]} x - x
 * @prop {numbers[]]} y - y
 */

 /**
 * @class Cameras
 * Stores all Cameras.
 */
class Cameras {
    /**
     * @prop {string} user - user
     * @prop {numbers[]} x - x
     * @prop {numbers[]} y - y
     * @return {Camera} - created Camera
     */
    static addOne(user, x, y) {
      const camera = {user, x, y};
      if (Cameras.findOne(user) != undefined) {
        return undefined;
      } 
      data.push(camera);
      return camera;
    }
  
    /**
     * Find a Camera by user
     * @param {string} user - user
     * @return {Freet | undefined} - found Camera
     */
    static findOne(user) {
      const camera =  data.filter(camera => camera.user === user)[0];
      return camera;
    }


    /**
    * Return an array of all of Cameras.
    * @return {Camera[]}
    */
    static findAll() {
      return data;
    }
  
    /**
     * Update a Camera.
     * @param {string} user - user
     * @prop {numbers[]]} x - x
     * @prop {numbers[]]} y - y
     * @return {Freet | undefined} - updated Camera
     */
    static updateOne(user, x, y) {
      const camera = Cameras.findOne(user);
      camera.x = x;
      camera.y = y;
      return camera;
    }
}

  module.exports = Cameras;
  