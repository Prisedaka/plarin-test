import config from './config'
import { User } from './types'

const BASE_URL = config.server.url!

const api = {
    getUsersList: (pageNum: number) => fetch(BASE_URL + `/users?page=${pageNum}`)
        .then((response) => response.json()),
    addUser: () => fetch(BASE_URL + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": "morpheus",
            "job": "leader"
        }),
    })
        .then((response) => response.json()),
    getUserInfo: (id: number) => fetch(BASE_URL + `/users/${id}`)
        .then((response) => response.json()),
    saveUserInfo: (id: number, data: User) => fetch(BASE_URL + `/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }),
    deleteUser: (id: number) => fetch(BASE_URL + `/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }),
}

export default api
