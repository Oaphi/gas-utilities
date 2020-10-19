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

declare interface GetFileOptions {
  id?: string;
  onError?: (err: Error) => void;
  onSuccess?: (file: GoogleAppsScript.Drive.File) => any;
}

declare interface FileGetter {
  (options: GetFileOptions): GoogleAppsScript.Drive.File | null;
}

const getFile: FileGetter = ({
  id,
  onSuccess,
  onError = (err) => console.warn(err),
}) => {
  try {
    const file = DriveApp.getFileById(id);

    typeof onSuccess === "function" && onSuccess(file);

    return file;
  } catch (error) {
    onError(error);
    return null;
  }
};