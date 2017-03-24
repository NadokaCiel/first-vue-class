import Translator from '../store/Translator.js'
import Role from '../store/Role.js'

export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function translator(key, lang) {
  if (!Translator[lang] || !Translator[lang][key]) {
    return '{translate error}'
  }
  return Translator[lang][key]
}

export function verify(key, role, t, f) {
  if (!Role[role] || !Role[role].includes(key)) {
    return t ? t : true
  } else {
    return f ? f : false
  }
}

export function mapLang(lang) {
  if (lang == 'en') {
    return 'en'
  } else if (lang == 'cn') {
    return 'zh_cn'
  } else {
    return 'zh_en'
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}