<template>
    <div>
    <div v-if="!registration" class="login">
        <h1>Login</h1>
        <p><input required="required"  type="text" name="username" v-model="login.username" placeholder="Username" /></p>
        <p><input required="required"  type="password" name="password" v-model="login.password" placeholder="Password" /></p>
        <p><button required="required" type="button" @click="login_account()">Login</button></p>
        <p><button class="faded" type="button" @click="changeRegister()">Register for an Account</button></p>
    </div>
    <div v-else class="login">
        <h1>Register</h1>
        <p><input required="required" type="text" name="username" v-model="register.username" placeholder="Username" /></p>
        <p><input required="required" type="password" name="password" v-model="register.password" placeholder="Password" /></p>
        <p><input required="required" type="text" name="email" v-model="register.email" placeholder="Email" /></p>
        <p><button type="button" @click="register_account()">Register</button></p>
        <p><button class="faded" type="button" @click="changeRegister()">Log me in</button></p>
    </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { state, actions, mutations } from "@/store/accounts";

export default Vue.extend({
    name: 'login-register',
    data() {
        return {
            registration: false,
            login: {
                username: "",
                password: "",
            },
            register: {
                email: "",
                username: "",
                password: "",
            }
        }
    },
    methods: {
        async login_account() {
            let body = {
                username: this.login.username,
                password: this.login.password
            }
            const result = await this.$store.dispatch('accounts/authenticate', body);
            console.log(result)
        },
        changeRegister() {
            this.registration = !this.registration
        },
        async register_account(){
            let register_body = {
                username: this.register.username,
                password: this.register.password,
                email: this.register.email
            }
            let login_body = {
                username: this.register.username,
                password: this.register.password
            }
            const result = await this.$store.dispatch('accounts/register', register_body);
            const reg_login = await this.$store.dispatch('accounts/authenticate', login_body);
            console.log('register')

        }
    }
})
</script>

<style scoped>
    .login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    p {
        margin: 5px;
    }
    .faded {
        color:darkgray
    }
</style>