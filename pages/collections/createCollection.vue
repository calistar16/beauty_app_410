<template>
  <div class="container">
      <navbar></navbar>
    <input class="save-content" type="button" value="Save Collection" @click="saveCollection()" />
    <div class="flex-column">
    <h2>All Items</h2>
    <div v-for="i in items" :key="i"> 
        {{i.name}}
    </div>
    <h2>Add New Item </h2>
    <form>
      <p> New Item Name: <input v-model="newItem" type="text" /></p>
      <input type="button" value="Add Item" @click="addNewItem(newItem)" />
    </form>
    </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import navbar from "@/components/navbar.vue"

export default Vue.extend({
  data() {
      return {
        newItem: "",
        items: [
            {name: "Azelaic Acid"},
            {name: "Curology"},
            {name: "SkinFix Lotion"},
            {name: "Niacinamide Serum"},
        ],
      }
  },
  components: {navbar},
  methods: {
      addNewItem(item_name: any) {
          this.items.push({name: item_name});
      },
      saveCollection() {
        // Eventually add code to save the product ids to a collection
      }
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