<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col" v-if="user">
                
                    <p><strong>ID: </strong> <input type="text" v-model="user.id" disabled></p>
                    <p><strong>Name: </strong>  <input type="text" v-model="user.name"></p>
                    <p><strong>Username: </strong>  <input type="text" v-model="user.username"></p>
                    <p><strong>Email: </strong>  <input type="text" v-model="user.email"></p>
                    <p><strong>City: </strong>  <input type="text" v-model="user.address.city"></p>
                    <p><strong>Street: </strong>  <input type="text" v-model="user.address.street"></p>
                    <p><strong>Suite: </strong>  <input type="text" v-model="user.address.suite"></p>
                    <p><strong>Zipcode: </strong>  <input type="text" v-model="user.address.zipcode"></p>

                    <button class="btn btn-outline-primary" @click="updateUser">Update</button> 
                </div>

                <div class="col" v-else>
                    <p>User not fount</p>
                </div>
                
            </div>
        </div>
    </div>    
</template>


<script>

import { mapGetters, mapActions } from 'vuex'

export default{
    
    props: ['id'],

    data() {
        return {
            user: {}
        }
    },

    beforeMount() {
        let users = this.getUsers
        let currentUser = users.find(user => user.id == this.id);
        this.user = currentUser
    },

    methods:{
        updateUser: function () {
            let userId = this.user.id
            let uptatedUser = {
                id: userId,
                name: this.user.name,
                username: this.user.username,
                email: this.user.email,
                address: {
                    city: this.user.address.city,
                    street: this.user.address.street,
                    suite: this.user.address.suite,
                    zipcode: this.user.address.zipcode
                },
            }

            this.updateUserVuex(uptatedUser)

        },

        ...mapActions(['updateUserVuex'])
    },

    computed: {
        ...mapGetters(['getUsers'])
    },
    
}
</script>

<style  scoped>
p{
    max-width: 300px;
}
p strong{
    min-width: 100px;
}
</style>