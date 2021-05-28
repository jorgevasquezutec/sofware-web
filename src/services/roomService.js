import api from './index'

const getRoom = async () => {
    const response = await api.get('/room');
    return response;
}

export default {
    getRoom
}
