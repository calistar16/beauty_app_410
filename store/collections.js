export const state = () => ({
    editing: false,
    collection_id: "",
    collection_name: "",
    user_id: null,
    items: null
})

export const getters = {
    collectionEditingState () {
        return state.editing
    },
    collectionNameState() {
        return state.prod_name
    }
}

export const mutations = {
    setEditing(state, edit){
        state.editing = edit
    },
    setCollection(state, json) {
        console.log("SET ME");
        console.log(state);
        state.collection_id = json.id
        state.collection_name = json.name
        state.user_id = json.user_id
        state.items = json.items
    },
    clearCollection(state) {
        state.collection_id = ""
        state.collection_name = ""
        state.user_id = ""
        state.items = null
    }
}

export const actions = {
    createCollection(state, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/collections", {
            method: "POST",
            body: JSON.stringify({
                name: new_body.name,
                user_id: new_body.username
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
                mutations.setCollection(this, json)
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
    getCollection(state, collection_id) {
        console.log(collection_id);
        const collection = fetch('http://127.0.0.1:3001/collections/' + collection_id, {
            method: "GET",
        })
            .then((res) => {
                console.log(collection)
                return res.json()
            })
            .then((json) => {
                return json
            })
            .catch((err) => {
                console.error(err)
            })
        return collection
    },
    updateCollection(state, collection_id, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/collections/" + collection_id, {
            method: "PUT",
            body: JSON.stringify({
                name: new_body.name,
                user_id: new_body.price, 
                items: new_body.prod_type
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
    changeEditing(edit) {
        mutations.setEditing(this, edit)
        mutations.clearCollection(this)
    }
}