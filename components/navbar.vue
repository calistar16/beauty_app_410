<template>
  <div class="container">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/"><font-awesome-icon icon="users"/> Beauty App</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-for="v in views" :key="v">
            <b-nav-item :href="v.link">{{v.name}} </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
export default {
  data() {
    return {
        views: [
        {
          name: "New Product",
          link: "/products/newProduct",
        },
        {
          name: "Create Collection",
          link: "/collections/createCollection",
        },
        {
          name: "View Collections",
          link: "/collections/collection",
        },
      ],
    };
  }
};
</script>

<style scoped>
:root {
  --primary-color: #251258;
  --secondary-color: #3c6e71;
  --light-color: #ffffff;
  --dark-color: #353535;
  --accent-color: #d9d9d9;
}
.navbar,
.bg-info {
  background-color: #342058 !important;
  color: #ffffff !important;
}
</style>