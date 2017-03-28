export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function verify(key, permission, t, f) {
  if (!permission.includes(key)) {
    return t ? t : true
  } else {
    return f ? f : false
  }
}

export function magnitude(num) {
  if (!num) {
    return "";
  }
  if (!/^\d+(\.\d+)?$/.test(num)) {
    return num;
  }
  let str = (Math.round(num.toString().replace(/，|,/g, "")).toString()/10000).toFixed(1);
  return str.replace('.0', '')
}


export function title(str) {
  return str.replace(/\[image\].*?\[\/image\]/g, '');
}

export function thousands(num, typeStr) {
  if (num == 0) {
    return 0;
  }
  if (!num || isNaN(num)) {
    return typeStr ? typeStr : "-";
  }
  return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

export function gender(str) {
  if (!str) {
    return "";
  }
  if (str == 'M') {
    return "男";
  } else if (str == 'F') {
    return "女";
  } else {
    return "";
  }
}

export function priceTag(price) {
  if (price == 0) {
    return 0;
  }
  if (!price || isNaN(price)) {
    return "-";
  }
  return thousands((price * 0.9).toFixed(0)) + ' ~ ' + thousands((price * 1.1).toFixed(0))
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
