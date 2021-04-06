<template>
  <div>
    <div class="user-box">
      <h4>{{username}}</h4>
      <a v-bind:href="link">Logout</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState, mapActions } from "vuex";
import {state, actions} from '@/store/accounts'

export default Vue.extend({
  name: 'accountblock',
  props: {user_id: String},
  data() {
    return {
      username: "",
      link: "/account/logout"
    }
  },
  methods: {
    async getCollection() {
      const account = await this.$store.dispatch('accounts/getAccount', this.user_id)
      console.log(account)
      this.username = account.username
      return account
    }
  },
  beforeMount(){
    this.getCollection();
  }
})
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
.user-box {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: 100px; 
    text-align:right; 
    margin: 15px;
}
</style>