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

declare interface GetFolderOptions {
  id?: string;
  onError?: (err: Error) => void;
  onSuccess?: (file: GoogleAppsScript.Drive.Folder) => any;
}

declare interface FolderGetter {
  (options: GetFolderOptions): GoogleAppsScript.Drive.Folder;
}

const getFolder: FolderGetter = ({
  id,
  onSuccess,
  onError = (err) => console.warn(err),
}) => {
  try {
    const folder = DriveApp.getFolderById(id);

    typeof onSuccess === "function" && onSuccess(folder);

    return folder;
  } catch (error) {
    onError(error);
    return DriveApp.getRootFolder();
  }
};