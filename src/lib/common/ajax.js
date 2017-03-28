import 'whatwg-fetch'

export function ajax(url, param, successFunc, failureFunc) {
	if(url.indexOf(".json")>=0){
		return fetchData(getLocalUrl(url), {}, successFunc, failureFunc);
	}
	let request = {
		credentials: 'include',
		body: getForm(param),
		method: "POST",
		// mode: "no-cors",
		headers: {
			// 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	};
	return fetchData(getAbsoluteUrl(url), request, successFunc, failureFunc);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function getForm(param) {
	let formData = "";
	for (let key in param) {
		if (param[key] != null && typeof(param[key]) == 'object') {
			let obj = param[key]
			if (isArray(obj)) {
				formData += obj.reduce((str, now) => {
					if(typeof(now) == 'object'){return str}
					return str + `${key}=${encodeURIComponent(now)}&`
				}, '')
			}
			continue;
		} else {
			formData += `${key}=${encodeURIComponent(param[key])}&`
		}
	}
	if (formData == "") {
		return formData;
	} else {
		return formData.substr(0, formData.length - 1);
	}
}
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
function getAbsoluteUrl(url) {
	if (url.indexOf("http://")==0 || url.indexOf("https://")==0) {
		return url;
	} else {
		return ROOT_PATH + url;
	}
}
function getLocalUrl(url) {
	return LOCAL_PATH + url;
}
function fetchData(url, request, successFunc, failureFunc) {
	return new Promise((resolve, reject) => {
		fetch(url, request)
			.then(checkStatus)
			.then(parseJSON)
			.then(function(data) {
				ajaxSuccess(data, successFunc, failureFunc);
				resolve(data)
					// console.log('request succeeded with JSON response', data)
			}).catch(function(error) {
				console.log('request failed', error)
				failureFunc && failureFunc({
					responseMsg: error.message ? error.message : '服务器挂啦QAQ'
				})
				resolve(error)
			})
	})
}

let STATUS_SUCCESS = 0;
let STATUS_FAILURE = 1;
let STATUS_REDIRECT = 2;
let STATUS_CERTIFICATE = 3;

function isEmpty(v) {
	if (typeof v === "undefined") {
		return true;
	}
	var value = typeof v === "string" ? v.trim() : v;
	return value === "" || value === 0 || value === "0" || value === null;
}

function ajaxSuccess(data, successFunc, failureFunc) {
	if (data) {
		// defenceXSS(data);
		if (data.responseCode === undefined) {
			successFunc && successFunc(data);
		} else if (data.responseCode === STATUS_SUCCESS) {
			successFunc && successFunc(data.responseData, data.responseCode, data.responseMsg);
		} else if (data.responseCode === STATUS_FAILURE) {
			console.error(data.responseMsg);
			failureFunc && failureFunc(data, data.responseMsg);
		} else if (data.responseCode === STATUS_REDIRECT) {
			location.href = data.responseData;
		}
		//  else if (data.responseCode === STATUS_CERTIFICATE) {
		// 	location.href = getAbsoluteUrl(Config.path.page.login, "redirect=" + encodeURIComponent(location.href));
		// } 
		else {
			failureFunc && failureFunc(data, data.responseMsg);
		}
	}
}