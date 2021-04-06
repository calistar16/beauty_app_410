import { json } from 'express'

export const state = () => ({
    username = "",
    user_id = "",
    token = "",
    email = "",
    admin = false
})

export const getters = {
    active_token () {
        return state.token
    },
    active_username() {
        return state.username
    },
    active_userid() {
        return state.user_id
    }
}

export const mutations = {
    setToken(state, t) {
        state.token = t
    },
    setLogin(state, json) {
        console.log("SET ME");
        console.log(state);
        state.user_id = json.user_id
        state.username = json.username
        state.token = json.token
        state.email = json.email
        state.admin = json.admin
    },
    clearLogin(state) {
        state.user_id = ""
        state.username = ""
        state.token = ""
        state.email = ""
        state.admin = false
    }
}

export const actions = {
    authenticate(state, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/auth", {
            method: "PUT",
            body: JSON.stringify({
                username: new_body.username,
                password: new_body.password, 
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                if (res.json.token !== undefined) {
                    mutations.setLogin(this, json)
                    return res.json()
                }
                else {
                    return "Authentication undefined"
                }
            })
            .then((json) => {
                console.log(json);
                return {
                    errorExists: false,
                    errorText: '',
                }
            })
            .catch((err) => {
                return {
                    errorExists: true,
                    errorText: err.message
                }
            });
        return result      
    },
    getAccountInfo(state, uid) {
        console.log(uid);
        const user = fetch('http://127.0.0.1:3001/accounts/' + uid, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": state.token,
            },
        })
            .then((res) => {
                console.log(user)
                return res.json()
            })
            .then((json) => {
                return json
            })
            .catch((err) => {
                console.error(err)
            })
        return user
    },
    updateAccountInfo(state, new_body, uid) {
        console.log(uid);
        const user = fetch('http://127.0.0.1:3001/accounts/' + uid, {
            method: "PUT",
            body: JSON.stringify({
                username: new_body.username,
                password: new_body.password, 
                email: new_body.email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": state.token,
            },
        })
            .then((res) => {
                console.log(user)
                return res.json()
            })
            .then((json) => {
                return json
            })
            .catch((err) => {
                console.error(err)
            })
        return user
    },
    deleteAccountInfo(state, uid) {
        console.log(uid);
        const user = fetch('http://127.0.0.1:3001/accounts/' + uid, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": state.token,
            },
        })
            .then((res) => {
                console.log(user)
                return res.json()
            })
            .then((json) => {
                return json
            })
            .catch((err) => {
                console.error(err)
            })
        return user
    },
    register(state, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/accounts/", {
            method: "POST",
            body: JSON.stringify({
                username: new_body.username,
                password: new_body.password, 
                email: new_body.email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (!json.success) {
                    return {
                        errorExists: true,
                        errorText: json.message
                    }
                }
                mutations.setCollection(this, {name: json.name, category: json.category, price: json.price, prod_type: json.prod_type, shades: json.shades, description: json.description, brand: json.brand, ingredients: json.ingredeints })
                //window.location.reload(true);
                return {
                    errorExists: false,
                    errorText: '',
                }
            })
            .catch((err) => {
                return {
                    errorExists: true,
                    errorText: err.message
                }
            });
        return result      
    },
    logout() {
        mutations.clearLogin(this)
    }
}