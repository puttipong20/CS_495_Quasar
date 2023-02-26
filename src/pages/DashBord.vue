<template>
  <div class="container">
    <div class="form" v-if="isOpen">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form class="q-gutter-md">
          <q-input filled v-model="resData.acc_id" label="Your ID *" hint="ID" disable />
          <q-input filled type="text" v-model="resData.acc_name" label="Your Name *" />
          <!-- <q-input filled type="email" v-model="resData.acc_email" label="Your Email *" /> -->
          <q-input
            v-model="resData.acc_email"
            autofocus
            square
            filled
            type="email"
            label="email"
            :rules="[val => !!val || 'Email is missing']"
          />
          <q-input filled type="text" v-model="resData.acc_password" label="Your password *" />
          <div>
            <q-btn label="Update" type="submit" color="primary" @click="updateData" />
            <q-btn label="Cancle" type="cancle" color="warning" @click="onCancle"/>
          </div>
        </q-form>
      </div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-right">Name</th>
          <th class="text-right">Email</th>
          <th class="text-right">Phone</th>
          <th class="text-right">Password</th>
          <th class="text-right">Edit</th>
          <th class="text-right">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allData" :key="user.id">
          <td class="text-left">{{ user.acc_id }}</td>
          <td class="text-right">{{user.acc_name}}</td>
          <td class="text-right">{{user.acc_email}}</td>
          <td class="text-right">{{user.acc_phone}}</td>
          <td class="text-right">{{user.acc_password}}</td>
          <td class="text-right">
            <q-btn color="deep-purple-8" label="Edit" @click="editData(user.acc_id)" />
          </td>
          <td class="text-right">
            <q-btn color="red-10" label="Delete" @click="deleteData(user.acc_id)" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashBord",
  data() {
    return {
      allData: "",
      url_api_plan: "http://localhost/my_account/api_account.php",
      resData: "",
      isOpen: false
    };
  },
  methods: {
    updateData() {
      const t = this;
      const check = confirm("Are you sure to update.");
      if (!check) {
        return;
      } else {
        axios
          .post(this.url_api_plan, {
            action: "update",
            id: this.resData.acc_id,
            name: this.resData.acc_name,
            email: this.resData.acc_email,
            password: this.resData.acc_password
          })
          .then(res => {
            console.log(res.data);
            t.getData();
          });
      }
      this.isOpen = false;
    },
    editData(id) {
      this.isOpen = true;
      var t = this;
      axios
        .post(this.url_api_plan, {
          action: "edit",
          id: id
        })
        .then(res => {
          t.resData = res.data;
        });
    },
    deleteData(id) {
      let c = confirm("Are you sure to delete ?.");
      if (c == true) {
        axios
          .post(this.url_api_plan, {
            action: "delete",
            // ลบ id ที่รับมา
            acc_id: id
          })
          .then(res => {
            console.log("delete", res.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      this.getData();
    },
    getData() {
      axios
        .post(this.url_api_plan, {
          action: "select"
        })
        .then(res => {
          //   console.log(res.data);
          this.allData = res.data;
          //   console.log(this.allData[1].acc_id);
        });
    },
    onCancle(){
      this.isOpen = false;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: aliceblue;
}
.root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.modal {
  border: 1px solid black;
  width: 50%;
}
</style>