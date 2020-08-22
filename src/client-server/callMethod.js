/**
 * Calls method on a class instance
 * @param {String} name variable holding instance
 * @param {String} methodName name of the method
 * @param  {...*} args arguments to pass to method
 * @returns {*}
 */
const runMethod = (name, methodName, ...args) => {
    const instance = this[name];
    return instance[methodName](...args);
};

/**
 * Client-side code for calling utility function
 */
const callMethod = (className, methodName, ...args) => {
    google.script.run
        .runMethod(className, methodName, ...args);
};