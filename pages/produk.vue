<template>
  <div>
    <p class="judul">
      daftar Produk
    </p>
    <p class="subjudul">
      Mengatur produk yang ada
    </p>
    <hr>
    <b-button type="is-primary" size="is-small" icon-left="lead-pencil" @click="modal=true">
      Tambah Baru
    </b-button>
    <b-table :data="produks" per-page="10">
      <template slot-scope="prop">
        <b-table-column field="no" label="No">
          {{ prop.index+1 }}
        </b-table-column>
        <b-table-column field="nama" label="Nama Produk">
          {{ prop.row.nama }}
        </b-table-column>
        <b-table-column field="kemasan" label="Kemasan">
          {{ prop.row.kemasan }}
        </b-table-column>
        <b-table-column field="isi" label="Isi">
          {{ prop.row.isi }} {{ prop.row.satuan }}
        </b-table-column>
        <b-table-column field="harga" label="Harga/pcs">
          Rp. {{ parseInt(prop.row.harga).toLocaleString('id-ID') }}
        </b-table-column>
        <b-table-column field="action" label="Action">
          <b-button type="is-danger" size="is-small" @click="hapusProduk(prop.row)">
            Hapus
          </b-button>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active.sync="modal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Tambah Produk Baru
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
          <b-field label="Harga" label-position="on-border">
            <b-input v-model="data.harga" />
          </b-field>
          <b-field label="Berat" label-position="on-border">
            <b-input v-model="data.berat" />
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" expanded @click="simpanProduk">
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
      produks: [],
      modal: false,
      data: {}

    }
  },
  beforeMount () {
    this.SET_LOADING(true)
  },
  mounted () {
    this.ambilProduk()
  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    async ambilProduk () {
      const get = await this.$axios.$post(this.$store.state.host + 'ambilProduk.php')

      if (get.hasil === 1) {
        this.produks = get.data
      } else {
        this.$buefy.snackbar.open('Gagal Mengambil Data')
      }
      this.SET_LOADING(false)
    },
    hapusProduk (x) {
      const formData = new FormData()
      formData.set('data', JSON.stringify(x))

      this.$buefy.dialog.confirm({
        title: 'Hapus ' + x.nama,
        message: '<p class="has-text-centered">Yakin Untuk Menghapus ' + x.nama + '?<br><b>*)Aksi Tidak bisa dibatalkan</b></p>',
        type: 'is-danger',
        hasIcon: true,
        confirmText: 'Hapus Item',
        onConfirm: async () => {
          this.SET_LOADING(true)
          try {
            const get = await this.$axios.$post(this.$store.state.host + 'hapusProduk.php', formData)
            if (get === 1) {
              this.$buefy.snackbar.open('Sukses Menghapus')
              this.ambilProduk()
            } else {
              this.$buefy.snackbar.open('Gagal Menghapus')
              this.SET_LOADING(true)
            }
          } catch (error) {
            this.$buefy.snackbar.open('Gagal Menyambungkan, Cek Konneksi')
          }
        }
      })
    },
    async simpanProduk () {
      this.SET_LOADING(true)
      const form = new FormData()
      form.set('data', JSON.stringify(this.data))
      try {
        const get = await this.$axios.$post(this.$store.state.host + 'tambahProduk.php', form)
        if (get === 1) {
          this.modal = false
          this.$buefy.snackbar.open('Sukses Input Data')
          this.ambilProduk()
        } else {
          this.$buefy.snackbar.open('Gagal Input Data')
        }
      } catch (error) {
        this.$buefy.snackbar.open('Gagal Menyambungkan, Cek koneksi')
      } finally {
        this.SET_LOADING(false)
      }
    }
  }

}
</script>

<style>

</style>
