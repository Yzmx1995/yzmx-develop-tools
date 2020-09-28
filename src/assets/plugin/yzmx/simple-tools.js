/**
 * @desc 深层函数取值
 */
function get(target, key_str, default_value) {
    if(!target || !key_str) {
        return default_value;
    }
    const keys = key_str.split('.');
    let result = target;
    for(let i = 0; i < keys.length; i++) {
        if(!result) {
            return default_value;
        }
        result = result[keys[i]];
    }
    return result;
}

function deepCopy(target) {
    if(typeof target !== 'object') {
        return target;
    }
    if(Array.isArray(target)) {
        return deepCopyArray(target);
    }
    return deepCopyObject(target);
}

function deepCopyObject(target) {
    let result = {};
    Object.entries(target).forEach(item => {
        const key = item[0];
        const value = item[1];
        result[key] = deepCopy(value);
    });
    return result;
}

function deepCopyArray(target) {
    let result = [];
    target.forEach(value => {
        result.push(deepCopy(value));
    })
    return result;
}

function isEmptyObject(value) {
    return JSON.stringify(value) === '{}';
}

function replaceLineFeed(html_str) {
    return (html_str || '').replace(/\n/g, '<br>');
}

function addZeroBeforeNumberLessThanTen(value) {
    return !+value || +value >= 10 ? value : `0${value}`;
}

function isInvalidDate(date) {
    return Number.isNaN(new Date(date).getTime());
}

function elapsedTime(start_date, end_date = new Date()) {
    if(isInvalidDate(start_date) || isInvalidDate(end_date)) {
        return;
    }
    return new Date(end_date).getTime() - new Date(start_date).getTime();
}

function formatElapsedTime(date) {
    if(isInvalidDate(date)) {
        return;
    }
    const elapsed_time_for_now = elapsedTime(date) / 1000;
    if(elapsed_time_for_now < 60) {
        return `${elapsed_time_for_now}秒`;
    } else if(elapsed_time_for_now < 3600) {
        return `${Math.floor(elapsed_time_for_now / 60)}分钟`;
    } else if(elapsed_time_for_now < 86400) {
        return `${Math.floor(elapsed_time_for_now / 3600)}小时`;
    } else if(elapsed_time_for_now < 604800) {
        return `${Math.floor(elapsed_time_for_now / 86400)}天`;
    } else if(elapsed_time_for_now < 2592000) {
        return `${Math.floor(elapsed_time_for_now / 604800)}周`;
    } else if(elapsed_time_for_now < 31536000) {
        return `${Math.floor(elapsed_time_for_now / 2592000)}月`;
    } else {
        return `${Math.floor(elapsed_time_for_now / 31536000)}年`;
    }
}

function getUrlQuery(key) {
    const querys = window.location.search.substring(1);
    if(querys) {
        const key_value_paires = querys.split('&');
        for(let i = 0; i < key_value_paires.length; i++) {
            const key_value_pair = key_value_paires[i].split('=');
            if(key_value_pair && key_value_pair[0] === key) {
                return key_value_pair[1];
            }
        }
    }
    return undefined;
}

export default {
    get,
    deepCopy,
    isEmptyObject,
    replaceLineFeed,
    addZeroBeforeNumberLessThanTen,
    formatElapsedTime,
    getUrlQuery,
    isInvalidDate,
    elapsedTime,
};