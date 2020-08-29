<template>
  <div>
    <p class="judul">
      kas kantor
    </p>
    <p class="subjudul">
      atur keuangan perusahaan
    </p>
    <hr>
    <p class="subjudul is-uppercase">{{new Date().toLocaleString('id-ID',{month:'long',year:'numeric'})}}</p>
    <b-button type="is-primary" icon-left="lead-pencil" size="is-small" @click="modal=true">
      Tambah Baru
    </b-button>

    <b-table :data="dataTransaksi">
      <template slot-scope="prop">
        <b-table-column label="Tanggal" field="">
          {{new Date(prop.row.timestamp).toLocaleString('id-ID',{day:'2-digit',month:'short'})}}
        </b-table-column>
        <b-table-column label="Keterangan" field="">
          {{prop.row.keterangan}}
        </b-table-column>
        <b-table-column label="Jenis" class="is-capitalized" field="">
          {{prop.row.jenis}}
        </b-table-column>
        <b-table-column label="Sumber" class="is-capitalized" field="">
          {{prop.row.sumber}}
        </b-table-column>
        <b-table-column label="Harga" field="">
          {{parseInt(prop.row.harga).toLocaleString('id-ID',{currency:'IDR', currencyDisplay:'symbol', style:'currency'})}}
        </b-table-column>
      </template>
      <template slot="empty">
        <p class="has-text-centered">Belum Ada Data</p>
      </template>
      <template slot="footer">
        <th>Total :</th>
        <th></th>
        <th></th>
  
        <th>{{parseInt(total).toLocaleString('id-ID',{currency:'IDR',style:'currency'})}}</th>
      </template>
    </b-table>

    <b-modal :active.sync="modal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            Tambah Transaksi
          </p>
        </header>
        <section class="modal-card-body">
          <div class="block">
            <p class="text-field">
              Kategori Transaksi
            </p>
            <b-field>
              <b-radio-button v-model="radio" size="is-small" name="pilihan" native-value="umum">
                Umum
              </b-radio-button>
              <b-radio-button v-model="radio" size="is-small" name="pilihan" native-value="bahanbaku">
                Bahan Baku
              </b-radio-button>
              <b-radio-button v-model="radio" size="is-small" name="pilihan" native-value="produk">
                Produk
              </b-radio-button>
            </b-field>
          </div>
          <b-field v-show="radio=='umum'" label="Keterangan" label-position="on-border">
            <b-input v-model="data.keterangan" />
          </b-field>
          <b-field v-show="radio=='bahanbaku'" label="Keterangan" label-position="on-border">
            <b-autocomplete v-model="cariBahan" expanded :open-on-focus="true" field="bahanBaku.nama" :data="filterBahan" />
          </b-field>
          <b-field v-show="radio=='produk'" label-position="on-border" label="Keterangan">
            <b-autocomplete />
          </b-field>

          <b-field label="Kategori" label-position="on-border">
            <b-autocomplete
              ref="autocomplete"
              v-model="cariKategori"
              field="kategori"
              :data="filterKategori"
              :open-on-focus="true"
              @select="option=> data.kategori = option"
            >
              <template slot="footer">
                <a @click="tambahInput">
                  <span>Tambah Kategori Baru</span>
                </a>
              </template>
              <template slot="empty">
                Tidak Ditemukan {{ cariKategori }}
              </template>
            </b-autocomplete>
          </b-field>

          <b-field :label="'Harga = Rp. '+nominal" label-position="on-border" :message="baca">
            <b-input v-model="data.harga" />
          </b-field>
          <b-field label="Jenis Transaksi" label-position="on-border">
            <b-select v-model="data.jenis" expanded>
              <option value="pemasukan">
                Pemasukan
              </option>
              <option value="pengeluaran">
                Pengeluaran
              </option>
            </b-select>
          </b-field>
            <b-field label="Sumber Dana" label-position="on-border">
            <b-select v-model="data.sumber" expanded>
              <option value="kas">
                Kas
              </option>
              <option value="non">
                P. Aryo
              </option>
            </b-select>
          </b-field>

          <!-- <b-field class="file" expanded>
            <b-upload v-model="file">
              <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Unggah File</span>
              </a>
              <span class="file-name" v-if="file">
                {{file.name}}
              </span>
            </b-upload>
          </b-field> -->
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" @click="simpanTransaksi">
            Simpan Transaksi
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import terbilang from '@develoka/angka-terbilang-js'
export default {
  data () {
    return {
      modal: false,
      bahanBaku: [],
      produk: [],
      data: {},
      cariBahan: '',
      radio: 'umum',
      file: {},
      cariKategori: '',
      kategori: [],
      dataTransaksi:[],
      total:''

    }
  },
  computed: {
    filterKategori () {
      return this.kategori.filter((x) => {
        return x.kategori.toLowerCase().includes(this.cariKategori.toLowerCase())
      })
    },
    baca () {
      if (this.data.harga === undefined || this.data.harga === 0) {
        const x = 'Mohon masukkan angka'
        return x
      } else {
        const x = terbilang(this.data.harga.toString()) + ' rupiah'
        return x
      }
    },
    nominal () {
      if (this.data.harga === undefined) {
        const x = 0
        return x
      } else {
        const x = Number(this.data.harga).toLocaleString('id-ID')
        return x
      }
    },
    filterBahan () {
      return this.bahanBaku.filter((x) => {
        return x.nama
      })
    }
  },
  beforeMount(){
    this.SET_LOADING(true)
  },
  mounted () {
    this.ambilKategori()
    this.ambilBahanBaku()
    this.ambilTransaksi()
  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    tambahInput () {
      this.$buefy.dialog.prompt({
        message: 'Kategori',
        inputAttr: {
          maxlength: 20,
          value: this.name
        },
        confirmText: 'Tambah',
        onConfirm: (value) => {
          this.kategori.push({kategori: value})
          this.$refs.autocomplete.setSelected(value)
        }
      })
    },
    async ambilBahanBaku () {
      const get = await this.$axios.$post(this.$store.state.host + 'ambilBahanBaku.php')
      if (get.hasil === 1) {
        this.bahanBaku = get.data
      } else {
        this.$buefy.snackbar.open('Mohon Cek Konneksi. Gagal Mengambil Data')
      }
    },
    async simpanTransaksi () {
      this.SET_LOADING(true)
      const fd = new FormData()
      fd.set('tanggal', new Date().getTime())
      fd.set('data', JSON.stringify(this.data))
      // fd.set('gambar',this.file)
      const simpan = await this.$axios.$post(this.$store.state.host + 'transaksi' + this.radio + '.php', fd)
      if (simpan === 1) {
        this.modal = false
        this.$buefy.snackbar.open('Berhasil Disimpan')
        this.ambilTransaksi()
        this.ambilKategori()
        this.data={}
      }
    },
    async ambilKategori () {
      const get = await this.$axios.$post(this.$store.state.host + 'ambilKategoriTransaksi.php')
      if (get.hasil === 1) {
        this.kategori = get.data
      } else {
        this.kategori = []
      }
    },
    async ambilTransaksi(){
      const get = await this.$axios.$post(this.$store.state.host+'ambilTransaksi.php')
      if (get.hasil===1) {
        this.dataTransaksi=get.data
        this.total=get.total
      }else{
        this.dataTransaksi=[]
        this.$buefy.snackbar.open('Gagal Mengambil Data')
      }
      this.SET_LOADING(false)
    }
  }

}
</script>

<style scoped>
.text-field{
  font-size: small;
  font-weight: bold;
  margin-left: 1em;
}
</style>
