<template>
  <div>
      <navbar></navbar>
      <h3>{{name}}</h3>
    <collectionitem v-for="item in items" :key="item" :itemId="item"></collectionitem>
    <button @click="edit()">Edit</button>
    <button @click="save()">Save</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import navbar from "../../components/navbar.vue"
import collectionitem from "~/components/collections/products.vue"
import { mapState, mapActions, mapMutations } from "vuex";
import { state, actions, mutations } from "@/store/collections";

export default Vue.extend({
    name: 'get-collection',
    data() {
        return {
            editing: false,
            name: "",
            id: "",
            user_id: "",
            items: null
        };
    },
    components: {
      collectionitem
    },
    methods: {
      async getCollection() {
        const c = await this.$store.dispatch('collections/getCollection', this.$route.params.collectionId);
        const collection = c[0]
        console.log(collection);
        this.name = collection.name
        this.id = collection.id
        this.user_id = collection.user_id
        this.items = collection.items;
        console.log('done');
      },
      updateCollection() {
          if (confirm("Are you sure you want to update a collection?")) {
          let body;
          body = {
              name: this.name,
              id: this.id,
              user_id: this.user_id,
              items: this.items,
          };
          console.log(body);
          this.$store.dispatch('collections/updateCollection', body);
          this.toggleEdit();
          }
      },
      toggleEdit() {
          this.editing = !this.editing
          this.vuexSetEditing(this.editing)
      },
      ...mapMutations({
          vuexSetEditing: "collections/setEditing"
      })
    },
    beforeMount() {
      this.getCollection();
    }
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
h4,
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
.save-content {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: right;
  width: inherit;
  height: inherit;
}
</style>