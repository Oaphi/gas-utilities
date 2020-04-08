/**
 * Gets file data as string
 * @param {String} id 
 * @returns {String}
 */
const asString = (id) => {

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