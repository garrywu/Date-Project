import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './vuetable.json',
        method: 'get',
        params: query
    });
};
