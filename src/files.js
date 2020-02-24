/**
 * @typedef {Object} AsStringParams
 * @property {}
 */

/**
 * Gets file data as string
 * @param {String} id 
 * @param {AsStringParams} [params]
 * @returns {String}
 */
const asString = (id,params) => {

    try {
        const file = DriveApp.getFileById(id);
        
        const blob = file.getBlob();
        
        const string = blob.getDataAsString();

        return string;
    }

    catch(fileError) {
        console.warn(fileError);
        return '';
    }
};