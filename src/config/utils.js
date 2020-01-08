import { BASE_PATH, MEDIA_URL, ROOT, UPLOAD_IMAGE_SERVER_URL } from "./index";

const _pathUpload = (url) => {
    return `${MEDIA_URL}/${url}`
}

const _url = (url) => {
    return `${BASE_PATH}/${url}`
}

const _root = (url) => {
    return `${ROOT}/${url}`
}

const _getImageURL = (imageName) => {
    return `${UPLOAD_IMAGE_SERVER_URL}${imageName}`
}

const _urlServer = (url) => {
    return `${MEDIA_URL}/${url}`
}

const _urlImage = (url) => {
    if (url) {
        if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
            return url;
        }
        return `${MEDIA_URL}/${url}`;
    }
    return '';
}

const _formatMoney = (num) => {
    let num1 = '';
    let num2 = '';
    num = num.toString();
    num1 = num.split('.')[0];
    if (num.indexOf('.') > -1) {
        num2 = num.split('.')[1];
    }
    let arr = num1.split("").reverse().join("").match(/.{1,3}/g).reverse();
    arr = arr.map(a => {
        return a.split('').reverse().join('');
    });
    const res = arr.join(',');
    if (num2.length > 0) {
        return res.concat('.', num2);
    }
    return res;
}

const _notificationOptions = () => {
    let isSmallScreen = window.screen.width < 700;
    let options = {
        placement: isSmallScreen ? 'bottomRight' : 'topRight',
        duration: 3,
    }
    if (isSmallScreen) {
        options = {
            ...options,
            bottom: window.screen.height * 0.1
        }
    }
    return options;
}


function _qsParse(variable, input) {
	var query = input.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

function _defaultZoom(miles = 0) {//correct with  heigh's map is 500px
    if (miles > 930) {
        return 3;
    }
    if (miles > 510) {
        return 4;
    }
    if (miles > 266) {
        return 5;
    }
    if (miles > 136) {
        return 6;
    }
    if (miles > 69) {
        return 7;
    }
    if (miles > 34) {
        return 8;
    }
    if (miles > 17) {
        return 9;
    }
    if (miles > 8) {
        return 10;
    }
    if (miles > 4) {
        return 11;
    }
    if (miles > 2) {
        return 12;
    }
    if (miles > 1) {
        return 13;
    }
    if (miles > -1) {
        return 14;
    }
}

export default {
    _url,
    _root,
    _urlServer,
    _urlImage,
    _getImageURL,
    _notificationOptions,
    _qsParse,
    _pathUpload,
    _formatMoney,
    _defaultZoom,
}

export {
    _url,
    _root,
    _urlServer,
    _urlImage,
    _getImageURL,
    _notificationOptions,
    _qsParse,
    _pathUpload,
    _formatMoney,
    _defaultZoom,
}