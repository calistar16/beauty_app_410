<template>
  <div class="container">
    <navbar></navbar>
    <div class="flex-column content-container">
      <div class="flex-column" v-if="!editing">
        <h4>Collection Name:</h4>
        <p>{{ name }}</p>
        <h4>Username:</h4>
        <p>{{ username }}</p>
        <input type="button" value="Edit" @click="toggleEdit()" />
      </div>
      <div class="flex-column" v-else>
        <h4>Collection Name:</h4>
        <p><input v-model="name" type="text" /></p>
        <h4>Username:</h4>
         <p><input v-model="username" type="text" /></p>
        <input type="button" value="Edit" @click="toggleEdit()" />
        <input type="button" value="Submit" @click="createNewCollection()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { state, actions, mutations } from "@/store/collections";

export default Vue.extend({
    name: 'new-product',
    data() {
        return {
            editing: false,
            name: "",
            username: "",
            items: null
        };
    },
    methods: {
        createNewCollection() {
            if (confirm("Are you sure you want to create a collection?")) {
            let body;
            body = {
                name: this.name,
                username: this.username,
            };
            console.log(body);
            this.$store.dispatch('collections/createCollection', body);
            this.toggleEdit();
            }
        },
        toggleEdit() {
            this.editing = !this.editing
            this.vuexSetEditing(this.editing)
        },
        ...mapActions({
            vuexCreateProduct: "products/createProduct"
        }),
        ...mapMutations({
            vuexSetEditing: "products/setEditing"
        })
    },
});
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
}
.content-container {
  height: inherit;
  width: inherit;
  margin-top: 50px;
}
h2,
p,
input {
  margin: 5px;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
</style>