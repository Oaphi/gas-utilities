
/**
 * Promise-friendly google.script.run call
 * @param {String} funcName
 * @param {...*} params
 * @returns {Promise}
 */
const asyncGAPI = (funcName, ...params) => {
    return new Promise((res, rej) => {
        google.script.run
            .withSuccessHandler(data => res(data))
            .withFailureHandler(error => {
                console.error(error);
                rej(error);
            })
        [funcName].apply(null, params);
    });
};