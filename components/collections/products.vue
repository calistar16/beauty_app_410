<template>
  <div>
    <div id="rcorners1">
      <h4>{{name}}</h4>
      <h5>{{brand}}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState, mapActions } from "vuex";
import {state, actions} from '@/store/products'

export default Vue.extend({
  name: 'collectionitem',
  props: {itemId: String},
  data() {
    return {
      name: "",
      price: "",
      category: "",
      prod_type: "",
      shades: "",
      description: "",
      brand: "",
      ingredients: "",
    }
  },
  methods: {
    async getItem() {
      const p = await this.$store.dispatch('products/getProduct', this.itemId)
      console.log(p)
      this.name = p.prod_name
      this.price = p.price
      this.category = p.category
      this.prod_type = p.prod_type
      this.brand = p.brand
      this.shades = p.shades
      this.ingredients = p.ingredients
      this.description = p.description
      return p
    }
  },
  beforeMount(){
    this.getItem();
  }
})
</script>

<style scoped>
#rcorners1 {
  border-radius: 25px;
  background: #A07BB6;
  padding: 20px;
  width: 200px;
  height: 150px;
  text-align: center;
}

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