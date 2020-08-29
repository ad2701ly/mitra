<template>
  <b-menu>
    <b-menu-list>
      <b-menu-item label="Gudang" icon="package">
        <b-menu-item label="List Bahan Baku" tag="router-link" to="/bahanBaku" />
        <b-menu-item label="List Produk" tag="router-link" to="/produk" />
        <b-menu-item label="Stok" tag="router-link" to="/stok" />
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item label="Kas" icon="cash">
        <b-menu-item label="Kas Kantor" tag="router-link" to="/kas" />
        <b-menu-item label="Hutang Piutang" tag="router-link" to="" />
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_LOADING'])
  }
}
</script>

<style scoped>

</style>
