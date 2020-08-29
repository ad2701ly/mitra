<template>
  <div>
    <p class="judul">
      Daftar Bahan Baku
    </p>
    <p class="subjudul">
      Mengatur Bahan Baku Yang ada maupun dipakai
    </p>
    <hr>
    <b-button icon-left="lead-pencil" type="is-primary" size="is-small" @click="modal=true">
      Tambah Baru
    </b-button>

    <b-table :data="bahanBaku" :paginated="true" per-page="10">
      <template slot-scope="bahan">
        <b-table-column field="no" label="No">
          {{ bahan.index +1 }}
        </b-table-column>
        <b-table-column field="nama" label="Nama Bahan">
          {{ bahan.row.nama }}
        </b-table-column>
        <b-table-column field="kemasan" label="Kemasan">
          {{ bahan.row.kemasan }}
        </b-table-column>
        <b-table-column field="isi" label="Isi">
          {{ bahan.row.isi }} {{ bahan.row.satuan }}
        </b-table-column>
        <b-table-column field="action" label="Action">
          <!--  <b-button size="is-small" type="is-primary" @click="tampilan(bahan.row)">Edit</b-button>     -->
          <b-button size="is-small" type="is-danger" @click="konfirmasiHapus(bahan.row)">
            Hapus
          </b-button>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="modal" has-modal-card>
      <div class="modal-card is-centered is-clearfix">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered is-capitalized">
            Tambah bahan Baku
          </p>
        </header>
        <section class="modal-card-body">
          <b-field label="Nama" label-position="on-border">
            <b-input v-model="data.nama" />
          </b-field>
          <b-field label="Kemasan" label-position="on-border">
            <b-input v-model="data.kemasan" />
          </b-field>
          <b-field label="Isi" label-position="on-border">
            <b-input v-model="data.isi" />
          </b-field>
          <b-field label="Satuan" label-position="on-border">
            <b-input v-model="data.satuan" />
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" expanded @click="simpan">
            Simpan
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      bahanBaku: [],
      data: {},
      modal: false
    }
  },
  beforeMount () {
    this.SET_LOADING(true)
  },
  mounted () {
    this.getBahanBaku()
  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    async getBahanBaku () {
      const get = await this.$axios.$post(this.$store.state.host + 'ambilBahanBaku.php')
      if (get.hasil === 1) {
        this.bahanBaku = get.data
      } else {
        this.$buefy.snackbar.open('Gagal Mengambil Data')
      }
      this.SET_LOADING(false)
    },
    async simpan () {
      const dat = new FormData()
      dat.append('data', JSON.stringify(this.data))

      const get = await this.$axios.$post(this.$store.state.host + 'tambahBahanBaku.php', dat)

      if (get === 1) {
        this.modal = false
        this.$buefy.snackbar.open('Data Tersimpan')
        this.getBahanBaku()
      } else {
        this.$buefy.snackbar.open('Gagal Simpan Data')
      }
    },
    konfirmasiHapus (x) {
      const formData = new FormData()
      formData.set('data', JSON.stringify(x))

      this.$buefy.dialog.confirm({
        title: 'Menghapus ' + x.nama,
        message: '<p class="has-text-centered">Yakin Untuk Menghapus ' + x.nama + '?<br><b>*)Aksi Tidak bisa dibatalkan</b></p>',
        type: 'is-danger',
        hasIcon: true,
        confirmText: 'Hapus Item',
        onConfirm: async (x) => {
          this.SET_LOADING(true)
          const hasil = await this.$axios.$post(this.$store.state.host + 'hapusBahanBaku.php', formData)
          if (hasil === 1) {
            this.$buefy.snackbar.open('Sukses Hapus Data')
            this.getBahanBaku()
            this.SET_LOADING(false)
          } else {
            this.$buefy.snackbar.open('Gagal Hapus Data')
            this.SET_LOADING(false)
          }
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
