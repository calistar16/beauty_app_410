 <template>
  <div class="container">
    <navbar></navbar>
    <div class="flex-column content-container">
      <div class="flex-column" v-if="!editing">
        <h4>Product Name:</h4>
        <p>{{ name }}</p>
        <h4>Price:</h4>
        <p>{{ price }}</p>
        <h4>Category:</h4>
        <p>{{ category }}</p>
        <h4>Product Type:</h4>
        <p>{{ prod_type }}</p>
        <h4>Shades:</h4>
        <p>{{ shades }}</p>
        <h4>Description:</h4>
        <p>{{ description }}</p>
        <h4>Brand:</h4>
        <p>{{ brand }}</p>
        <h4>Ingredients:</h4>
        <p>{{ ingredients }}</p>
        <input type="button" value="Edit" @click="toggleEdit()" />
      </div>
      <div class="flex-column" v-else>
        <h2>Product Name:</h2>
        <p><input v-model="name" type="text" /></p>
        <h2>Price:</h2>
        <p><input v-model="price" type="text" /></p>
        <h2>Category:</h2>
        <p><input v-model="category" type="text" /></p>
        <h2>Product Type:</h2>
        <p><input v-model="prod_type" type="text" /></p>
        <h2>Shades:</h2>
        <p><input v-model="shades" type="text" /></p>
        <h2>Description:</h2>
        <p><input v-model="description" type="text" /></p>
        <h2>Brand:</h2>
        <p><input v-model="brand" type="text" /></p>
        <h2>Ingredients:</h2>
        <p><input v-model="ingredients" type="text" /></p>
        <input type="button" value="Edit" @click="toggleEdit()" />
        <input type="button" value="Save" @click="updateProduct()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { state, actions, mutations } from "@/store/products";

export default Vue.extend({
    name: 'get-product',
    data() {
        return {
            editing: false,
            name: "",
            price: "",
            category: "",
            prod_type: "",
            shades: "",
            description: "",
            brand: "",
            ingredients: "",
        };
    },
    methods: {
      async getProduct() {
        const product = await this.$store.dispatch('products/getProduct', this.$route.params.productId);
        console.log(product);
        this.name = product.prod_name
        this.price = product.price
        this.category = product.category
        this.prod_type = product.prod_type
        this.brand = product.brand
        this.shades = product.shades
        this.ingredients = product.ingredients
        this.description = product.description
        console.log('done');
      },
      async updateProduct() {
          if (confirm("Are you sure you want to create a product?")) {
          let body;
          body = {
              product_id: this.$route.params.productId,
              name: this.name,
              price: this.price,
              category: this.category,
              prod_type: this.prod_type,
              shades: this.shades,
              description: this.description,
              brand: this.brand,
              ingredients: this.ingredients
          };
          console.log(body);
          const result = await this.$store.dispatch('products/updateProduct', body);
          this.toggleEdit();
          }
      },
      toggleEdit() {
          this.editing = !this.editing
          this.vuexSetEditing(this.editing)
      },
      ...mapMutations({
          vuexSetEditing: "products/setEditing"
      })
    },
    beforeMount() {
      this.getProduct();
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
      