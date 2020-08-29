<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" to="/">
        <img src="logo.png" alt="">
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="a" to="">
        Login
      </b-navbar-item>
      <b-navbar-item tag="a" to="">
        Logout
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
