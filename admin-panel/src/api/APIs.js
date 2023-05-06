import axios from 'axios';

async function postData(url = '', data = {}) {
    const response = await axios.post(url, data);
    return response.data;
}