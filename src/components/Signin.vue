<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-card class="pa-4 ml-4 mr-4">
          <v-layout row justify-center>
            <v-flex xl2 lg3 md4 sm4 class="hidden-xs-only">
              <v-card class="elevation-0 pa-2 mr-2">
                <v-card-media >
                <img class="aws-logo" src="../../static/aws_cognito.png">
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex xl4 lg5 md6 sm6>
              <transition appear name="fadeout">
              <v-card class="elevation-0 pa-2 ml-1 mr-1">
                <v-alert outline type="error" dismissible class="ml-3 mr-3" v-model="showerr">
                  {{ errmsg }}
                </v-alert>
                <v-card-title primary-title>
                  <div>
                    <h4 class="headline mb-0">Sign In to AWS Cognito</h4>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      :rules="[emailrules.required, emailrules.email]"
                      required>
                    </v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      :rules="passRules"
                      hint="At least 8 characters"
                      :append-icon="hidepw ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (hidepw = !hidepw)"
                      :type="hidepw ? 'password' : 'text'"
                      required>
                    </v-text-field>
                  </v-form>
                  <v-btn
                    block
                    :loading="loading"
                    @click.native="onSubmit()"
                    :disabled="!valid"
                    class="mt-3 mb-3"
                    light
                    color="secondary">
                    Sign In
                    <span slot="loader">Connecting...</span>
                  </v-btn>
                  <div >
                    <router-link :to="'/forgot'">Forgot password?</router-link>
                  </div>
                </v-card-text>
              </v-card>
              </transition>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../routes'
import * as config from '../config'

export default {
  data: function () {
    return {
      callback: false,
      showerr: false,
      errmsg: '',
      username: '',
      valid: false,
      email: '',
      emailrules: {
        required: (value) => !!value || 'E-mail is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail must be valid'
        }
      },
      password: '',
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters'
      ],
      hidepw: true,
      loader: false,
      loading: false
    }
  },
  computed: {
    errcode: function () {
      return this.$store.state.errcode
    }
  },
  methods: {
    onSubmit () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      config.log('sign in with: ' + this.email + ' ' + this.password)
      var authData = {
        Username: this.email,
        Password: this.password
      }
      this.$store.dispatch('signIn', authData)
    },
    navRreset: function () {
      router.push('/forgot')
    },
    getMessage: function () {
      return this.message
    }
  },
  watch: {
    errcode () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      config.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'Incorrect username or password'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'User not found'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.errmsg = 'User registration not confirmed'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      } else {
        this.showerr = false
      }
      this[l] = false
      this.loader = null
    }
  }
}
</script>

<style scoped>
.aws-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>
