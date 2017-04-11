import 'whatwg-fetch'

export function ajax(url, param, successFunc, failureFunc) {
	if(url.indexOf(".json")>=0){
		return fetchData(getLocalUrl(url), {}, successFunc, failureFunc);
	}
	let request = {
		body: getForm(param),
		method: "POST",
		headers: {
			// 'mode': "cors",
			// 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	};
	return fetchData(getAbsoluteUrl(url), request, successFunc, failureFunc);
}

function getForm(param) {
	let formData = "";
	for (let key in param) {
		if (param[key] != null && typeof(param[key]) == 'object') {
			continue;
		} else {
			formData += `${key}=${param[key]}&`
		}
	}
	if (formData == "") {
		return formData;
	} else {
		return formData.substr(0, formData.length - 1);
	}
}
function getAbsoluteUrl(url) {
	return ROOT_PATH + url;
}
function getLocalUrl(url) {
	return LOCAL_PATH + url;
}
function fetchData(url, request, successFunc, failureFunc) {
	fetch(url, request)
		.then(function(response) {
			// console.log(response)
			return response.json()
		}).then(function(json) {
			// console.log('parsed json', json)
			ajaxSuccess(json, successFunc, failureFunc);
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		});
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