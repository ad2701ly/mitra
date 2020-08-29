<template>
  <div>
    <navigasi />
    <div class="columns">
      <div class="column is-2">
        <sideBar class="normal" />
      </div>

      <div class="column is-10">
        <nuxt class="normal" />
      </div>
    </div>
    <b-loading :active.sync="$store.state.loading" />
  </div>
</template>

<script>
import navigasi from '@/components/navigasi'
import sideBar from '@/components/menu'

export default {
  components: {
    navigasi,
    sideBar
  }
}
</script>

<style>

.judul{
    font-family: 'Source Serif Pro', serif;
    font-size: 25px;
    text-transform: uppercase;
    text-align: center;
}
.subjudul{
    font-family: 'Lato', sans-serif;
    text-align: center;
    text-transform: capitalize;

}
.normal{
    font-family: 'PT Sans', sans-serif;

}

</style>
