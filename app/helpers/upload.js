/** 
 * Upload file to folder
*/
const fileUpload = async (files, location) => {
    let filename = '';
    if (files || Object.keys(files).length >= 0) {
        let sampleFile = files.file;
        filename = location + '/' + Date.now() + sampleFile.md5 + '.' + getExtension(sampleFile.name);
        return await sampleFile.mv(`${filename}`).then(response => {
            return filename;
        }).catch(err => {
            return '';
        });
    }
}

/** 
 * Get the extension of the file
*/
const getExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

module.exports = {
    fileUpload,
    getExtension
}