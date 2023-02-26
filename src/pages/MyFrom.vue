<template>
  <q-page class="column items-center justify-center">
    <q-card class="create-account-card">
      <q-form autofocus @submit="submitForm">
        <q-card-section>
          <div class="text-h6">Create New Account</div>
          <div class="text-subtitle1">Fill out the following form to create your new account.</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="column q-gutter-md">
          <q-input
            label="Name *"
            v-model="FormState.name"
            :rules="[
            (val) => (val && val.length > 0) || 'Name must be filled in.',
          ]"
          ></q-input>
          <q-input
            label="Email *"
            v-model="FormState.email"
            :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
          ></q-input>
          <q-input
            label="Phone"
            v-model="FormState.phone"
            mask="(###) ### - ####"
            hint="(###) ### - ####"
          ></q-input>
          <q-input
            label="Password *"
            v-model="FormState.password.value"
            type="password"
            :rules="[
            (val) =>
              validatePassword(val) || 'Password must meet all criteria.',
          ]"
          ></q-input>
          <div class="password-criteria q-pa-sm">
            <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
            <div>
              <q-icon
                :name="ValidPassword.length ? 'check_circle' : 'cancel'"
                :color="ValidPassword.length ? 'positive' : 'negative'"
              ></q-icon>Must be at least 12 characters long.
            </div>
            <div>
              <q-icon
                :name="ValidPassword.capital ? 'check_circle' : 'cancel'"
                :color="ValidPassword.capital ? 'positive' : 'negative'"
              ></q-icon>Must contain at least one capital letter.
            </div>
            <div>
              <q-icon
                :name="ValidPassword.number ? 'check_circle' : 'cancel'"
                :color="ValidPassword.number ? 'positive' : 'negative'"
              ></q-icon>Must contain at least one number.
            </div>
            <div>
              <q-icon
                :name="ValidPassword.symbol ? 'check_circle' : 'cancel'"
                :color="ValidPassword.symbol ? 'positive' : 'negative'"
              ></q-icon>Must contain at least one special character: !@#$%^&*()-_+=
            </div>
          </div>
          <q-input
            label="Confirm Password *"
            v-model="FormState.password.confirm"
            :disable="!validatePassword(FormState.password.value)"
            type="password"
            :rules="[
              (val) =>
                (val && val === FormState.password.value) ||
                'Must match password.',
            ]"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="indigo-6" type="submit">Create Account</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.create-account-card {
  width: 512px;
}

.password-criteria {
  background-color: #efefef;
  border-radius: 0.5rem;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      url_api_plan: "http://localhost/my_account/api_account.php",
      FormState: {
        name: "",
        email: "",
        phone: "",
        password: {
          value: "",
          confirm: ""
        }
      },
      ValidPassword: {
        length: false,
        capital: false,
        number: false,
        symbol: false
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Create Sucessful.", this.FormState.email);
      axios
        .post(this.url_api_plan, {
          action: "insert",
          acc_name: this.FormState.name,
          acc_email: this.FormState.email,
          acc_phone: this.FormState.phone,
          acc_password: this.FormState.password.confirm
        })
        .then(res => {
          console.log("insert", res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.FormState.name="";
      this.FormState.email = "";
      this.FormState.phone = "";
      this.FormState.password.value = "";
      this.FormState.password.confirm = "";
      alert("Insert complete.");
      this.$router.push({path:'/DashBord'});
    },
    validateEmail(email) {
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    },
    validatePassword(password) {
      // Test length
      this.ValidPassword.length = this.FormState.password.value.length >= 8;

      // Test capital
      this.ValidPassword.capital = /^(?=.*[A-Z]).*$/.test(password);

      // Test number
      this.ValidPassword.number = /^(?=.*[0-9]).*$/.test(password);

      // Test symbol
      this.ValidPassword.symbol = /^(?=.*[!@#$%^&*-_+=]).*$/.test(password);

      return (
        this.ValidPassword.length &&
        this.ValidPassword.capital &&
        this.ValidPassword.number &&
        this.ValidPassword.symbol
      );
    }
  },
};
</script>
