import api from './index'

const sendMail = async (body) => {
    const response = await api.post('/gmail',body);
    return response;
}

export default {
    sendMail
}
