import api from './index'

const sendMessage = async (body) => {
    const response = await api.post('/message',body);
    return response;
}

export default {
    sendMessage
}
