export const state = () => ({
    editing: false,
    prod_name: "",
    price: null,
    category: "",
    prod_type: null,
    shades: null,
    description: null,
    brand: null,
    ingredeints: null
})

export const getters = {
    productEditingState () {
        return state.editing
    },
    productNameState() {
        return state.prod_name
    }
}

export const mutations = {
    setEditing(state, edit){
        state.editing = edit
    },
    setProduct(state, json) {
        console.log("SET ME");
        console.log(state);
        state.prod_name = json.name
        state.price = json.price
        state.category = json.category
        state.prod_type = json.prod_type
        state.shades = json.shades
        state.description = json.description
        state.brand = json.brand
        state.ingredeints = json.ingredeints
    },
    clearProduct(state) {
        state.prod_name = ""
        state.price = null
        state.category = ""
        state.prod_type = null
        state.shades = null
        state.description = null
        state.brand = null
        state.ingredeints = null
    }
}

export const actions = {
    createProduct(state, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/products", {
            method: "POST",
            body: JSON.stringify({
                name: new_body.name,
                category: new_body.category,
                price: new_body.price, 
                prod_type: new_body.prod_type, 
                shades: new_body.shades, 
                description: new_body.description,
                brand: new_body.brand,
                ingredeints: new_body.ingredeints
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
                mutations.setProduct(this, json)
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
    getProduct(state, product_id) {
        console.log(product_id);
        const product = fetch('http://127.0.0.1:3001/products/' + product_id, {
            method: "GET",
        })
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                return json
            })
            .catch((err) => {
                console.error(err)
            })
        return product
    },
    updateProduct(state, product_id, new_body) {
        console.log(new_body)
        const result = fetch("http://127.0.0.1:3001/products/" + product_id, {
            method: "PUT",
            body: JSON.stringify({
                name: new_body.name,
                category: new_body.category,
                price: new_body.price, 
                prod_type: new_body.prod_type, 
                shades: new_body.shades, 
                description: new_body.description,
                brand: new_body.brand,
                ingredeints: new_body.ingredeints
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
                mutations.setProduct(this, {name: json.name, category: json.category, price: json.price, prod_type: json.prod_type, shades: json.shades, description: json.description, brand: json.brand, ingredients: json.ingredeints })
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
        mutations.clearProduct(this)
    }
}