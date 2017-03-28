import trim  from './trim'
import typeJs  from './type'
import libSha1  from './sha-1'
// https://github.com/linkgod/SHA-1
import blueimpMd5  from './md5'
// https://github.com/blueimp/JavaScript-MD5

function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

function purify(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

function purifyText(text) {
	return text.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

const Utils = {
	trim,
	clone,
	purify,
	purifyText,
	type:typeJs,
	sha1:libSha1,
	md5: blueimpMd5,
}

export default Utils
export const type = typeJs
export const md5 = blueimpMd5
export const sha1 = libSha1