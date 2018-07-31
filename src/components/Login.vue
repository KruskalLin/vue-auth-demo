<template>
  <el-container>
    <el-row :gutter="20">
      <el-col :span="10" :offset="6">
        <el-form>
          <el-form-item>
            <el-input type="text" placeholder="username" id="user" v-model="username" @blur="inputBlur('username',username)"></el-input>
            <p>{{usernameError}}</p>
          </el-form-item>
          <el-form-item>
            <el-input type="password"  placeholder="password" id="password" v-model="password" @blur="inputBlur('password',password)"></el-input>
            <p>{{passwordError}}</p>
          </el-form-item>
          <el-button type="primary" @click="login(username, password)" v-bind:disabled="disabled">登入</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { login } from '../@core/user'
import store from '../vuex/store'
import * as types from '../vuex/types'
import router from '../router'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      disabled: true
    }
  },
  methods: {
    inputBlur (errorItem, inputContent) {
      if (errorItem === 'username') {
        if (inputContent === '') {
          this.usernameError = '用户名不能为空'
        } else {
          this.usernameError = ''
        }
      } else if (errorItem === 'password') {
        if (inputContent === '') {
          this.passwordError = '密码不能为空'
        } else {
          this.passwordError = ''
        }
      }
      // 对于按钮的状态进行修改
      if (this.username !== '' && this.password !== '') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    async login (username, password) {
      login(username, password).then(function (response) {
        store.commit(types.LOGIN, response.data['accessToken'])
        console.log(response)
        router.replace({
          path: 'hello',
          query: { redirect: router.currentRoute.path }})
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
</style>
