<template>
  <div>
    <p class="judul">
      Stok Gudang
    </p>
    <p class="subjudul">
      pengaturan dan pengawasan stok gudang
    </p>
    <hr>
    <div class="columns">
      <div class="column">
        <b-button
          type="is-primary"
          expanded
          tag="nuxt-link"
          to="/stok/gudang"
          icon-left=""
        >
          Bahan Baku
        </b-button>
      </div>
      <div class="column">
        <b-button
          type="is-primary"
          expanded
          tag="nuxt-link"
          to="/stok/mixing"
          icon-left=""
        >
          Mixing
        </b-button>
      </div>
      <div class="column">
        <b-button
          type="is-primary"
          expanded
          tag="nuxt-link"
          to="/stok/"
          icon-left=""
        >
          Pengemasan
        </b-button>
      </div>
      <div class="column">
        <b-button
          type="is-primary"
          expanded
          tag="nuxt-link"
          to="/stok/"
          icon-left=""
        >
          Gudang
        </b-button>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
