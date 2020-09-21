/**
 * @summary Base64 url encodes input (useful for RS256 alg)
 * @param {string|number[]} input 
 * @returns {string}
 */
const base64urlEncode = (input) => {
    const encoded = Utilities.base64Encode(input);

    const withoutEquals = encoded.replace(/\=/g, '');
    const withoutPluses = withoutEquals.replace(/\+/g, '-');
    const withoutSlashes = withoutPluses.replace(/\//g, '_');

    return withoutSlashes;
};

/**
 * @summary Base64 url decodes input
 * @param {string} encoded
 * @param {GoogleAppsScript.Utilities.Charset} [charset]
 * @returns {number[]}
 */
const base64urlDecode = (encoded, charset) => {
    const withPluses = encoded.replace(/\-/g, '+');
    const withSlashes = withPluses.replace(/_/g, '/');

    return charset ?
        Utilities.base64Decode(withSlashes, charset) :
        Utilities.base64Decode(withSlashes);
};

/**
 * @summary gets a base64 decoded data as string
 * @param {string} encoded
 * @param {GoogleAppsScript.Utilities.Charset} [charset]
 * @returns {string}
 */
const getBase64UrlDecodedStr = (encoded, charset) => {
    const decoded = base64urlDecode(encoded, charset);
    return Utilities.newBlob(decoded).getDataAsString();
};