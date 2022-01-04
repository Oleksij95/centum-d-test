<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-9">

          <select class="form-select" multiple aria-label="multiple" v-model="selected">
            <option value="all" selected>ALL</option>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="city">City</option>
            <option value="street">Street</option>
            <option value="suite">Suite</option>
            <option value="zipcode">Zipcode</option>   
          </select>

          <table class="table">
            <thead>

              <tr>
                <th scope="col">id</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('name') > -1 || getSelectedFilter.indexOf('all') > -1">name</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('username') > -1 || getSelectedFilter.indexOf('all') > -1">username</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('email') > -1 || getSelectedFilter.indexOf('all') > -1">email</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('city') > -1 || getSelectedFilter.indexOf('all') > -1">city</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('street') > -1 || getSelectedFilter.indexOf('all') > -1">street</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('suite') > -1 || getSelectedFilter.indexOf('all') > -1">suite</th>
                <th scope="col" v-if="getSelectedFilter.indexOf('zipcode') > -1 || getSelectedFilter.indexOf('all') > -1">zipcode</th>
              </tr>

            </thead>
            
            <tbody>

              <tr v-for="(user, index) in getUsers" :key="user.id" v-show="index+1 == page*2 || index == page*2-2">
                <th scope="row">{{ user.id }}</th>
                <td v-if="getSelectedFilter.indexOf('name') > -1 || getSelectedFilter.indexOf('all') > -1">
                  <router-link :to="{name: 'User', params: {id: user.id}}">
                    {{ user.name }}
                  </router-link>
                </td>
                <td v-if="getSelectedFilter.indexOf('username') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.username }}</td>
                <td v-if="getSelectedFilter.indexOf('email') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.email }}</td>
                <td v-if="getSelectedFilter.indexOf('city') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.address.city }}</td>
                <td v-if="getSelectedFilter.indexOf('street') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.address.street }}</td>
                <td v-if="getSelectedFilter.indexOf('suite') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.address.suite }}</td>
                <td v-if="getSelectedFilter.indexOf('zipcode') > -1 || getSelectedFilter.indexOf('all') > -1">{{ user.address.zipcode }}</td>
              </tr>

            </tbody>
          </table>

        </div>
        <div class="col-lg-3">
          <form action="" @submit.prevent="createNewUser">
            <input type="text" name="name" placeholder="name" class="form-control" v-model="newUser.name">
            <input type="text" name="username" placeholder="username" class="form-control" v-model="newUser.username">
            <input type="text" name="email" placeholder="email" class="form-control" v-model="newUser.email">
            <input type="text" name="city" placeholder="city" class="form-control" v-model="newUser.address.city">
            <input type="text" name="street" placeholder="street" class="form-control" v-model="newUser.address.street">
            <input type="text" name="suite" placeholder="suite" class="form-control" v-model="newUser.address.suite">
            <input type="zipcode" name="street" placeholder="zipcode" class="form-control" v-model="newUser.address.zipcode">
            <button type="submit" class="btn btn-outline-primary">Create</button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <pagination v-model="page" :records="getUsers.length" :per-page="2" @paginate="paginateCallback"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import Pagination from 'vue-pagination-2';  
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Home',

  data() {
    return{ 
      page: 1,
      selected: [''],
      newUser: {
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
          city: "",
          street: "",
          suite: "",
          zipcode: ""
        },
      }
    }
  },

  created() {
    if(this.getUsers.length === 0) {
      this.FETCH_USERS_LIST()
    }
  },

  methods: {

    createNewUser: function () {
      this.newUser.id = Date.now();
      let newUserObj = this.newUser
      this.CREATE_USER(newUserObj)
      this.clearForm()
    },

    clearForm: function () {
      this.newUser = {
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
          city: "",
          street: "",
          suite: "",
          zipcode: ""
        },
      }
    },

    paginateCallback: function () {
      console.log("is paginate")
    },

    ...mapActions(['FETCH_USERS_LIST', 'FETCH_SELECTED_FILTER', 'CREATE_USER'])
    
  },

  computed: {
    ...mapGetters(['getUsers', 'getSelectedFilter'])
  },

  watch: {
    selected(){
      this.FETCH_SELECTED_FILTER(this.selected)
    }
  },

  components: {
    Pagination
  }
}
</script>


<style>
form{
  box-shadow: 1px 1px 20px #ccc;
  padding: 20px;
}
.form-select{
  margin-bottom: 20px;
}
.form-control{
  margin-bottom: 15px;
}
</style>