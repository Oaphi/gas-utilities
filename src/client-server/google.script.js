
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

/**
 * @typedef {{
 *  funcName : string,
 *  onFailure : function,
 *  onSuccess : function,
 *  params : array
 * }} AsyncOptions
 * 
 * @summary v2 of async-friendly google.script.run
 * @param {AsyncOptions}
 * @returns {Promise}
 */
const asyncGAPIv2 = ({
    funcName,
    onFailure = console.error,
    onSuccess,
    params = []
}) => {
    return new Promise((res, rej) => {
        google.script.run
            .withSuccessHandler(data => {
                typeof onSuccess === "function" && onSuccess(data);
                res(data);
            })
            .withFailureHandler(error => {
                typeof onFailure === "function" && onFailure(error);
                rej(error);
            })
        [funcName].apply(null, params);
    });
};

/**
 * @typedef {{
 *  hash : string,
 *  parameter : Object.<string, string>,
 *  parameters : Object.<string, string[]>
 * }} UrlLocationObject
 * 
 * @typedef {{
 *  callback : function (UrlLocationObject, ...any) : any,
 *  params : any[]
 * }} AsyncUrlOptions
 * 
 * @summary Promise-friendly google.script.url
 * @param {AsyncUrlOptions}
 * @returns {Promise}
 */
const asyncLocation = ({
    callback,
    params = [],
}) => {
    return new Promise((res, rej) => {
        google.script.url.getLocation((loc) => {
            try {
                const result = callback(loc, ...params);
                res(result);
            }
            catch(error) {
                rej(error);
            }
        });
    });
};