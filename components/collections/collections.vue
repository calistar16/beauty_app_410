<template>
  <div>
    <div id="rcorners1">
      <h4>{{name}}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState, mapActions } from "vuex";
import {state, actions} from '@/store/collections'

export default Vue.extend({
  name: 'collectionitem',
  props: {collectionId: String},
  data() {
    return {
      name: "",
      collection_id: "",
    }
  },
  methods: {
    async getCollection() {
      const c = await this.$store.dispatch('collections/getOneCollection', this.collection_id)
      console.log(c)
      this.name = c.prod_name
      this.collection_id = c.id
      return c
    }
  },
  beforeMount(){
    this.getCollection();
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