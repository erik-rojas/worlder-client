import utils from "./utils";

const KEY_PERSIST_STORE = 'react-app-template-v16';
const API_URL = process.env.REACT_APP_API_URL;
const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;
const BASE_PATH =  process.env.REACT_APP_BASE_PATH;
const ROOT =  process.env.ROOT;
const UPLOAD_IMAGE_SERVER_URL = '//localhost:3001/uploads/'


export default {
    KEY_PERSIST_STORE,
    API_URL,
    MEDIA_URL,
    BASE_PATH,
    ROOT,
    UPLOAD_IMAGE_SERVER_URL,
    utils
}

export {
    KEY_PERSIST_STORE,
    API_URL,
    MEDIA_URL,
    BASE_PATH,
    ROOT,
    UPLOAD_IMAGE_SERVER_URL,
    utils
}