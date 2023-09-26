// Fungsi untuk mengambil data buku dari localStorage
function ambilDataBuku() {
  const dataBuku = JSON.parse(localStorage.getItem("dataBuku")) || [];
  return dataBuku;
}

// Fungsi untuk menyimpan data buku ke localStorage
function simpanDataBuku(dataBuku) {
  localStorage.setItem("dataBuku", JSON.stringify(dataBuku));
}

// Fungsi untuk menampilkan buku ke rak yang sesuai
function tampilkanBuku() {
  const belumSelesaiDibaca = document.getElementById("belumSelesaiDibaca");
  const selesaiDibaca = document.getElementById("selesaiDibaca");
  const filterBelumSelesai = document
    .getElementById("filterBelumSelesai")
    .value.toLowerCase();
  const filterSelesai = document
    .getElementById("filterSelesai")
    .value.toLowerCase();

  // Bersihkan rak buku sebelum menampilkan data baru
  belumSelesaiDibaca.innerHTML = "";
  selesaiDibaca.innerHTML = "";

  const dataBuku = ambilDataBuku();

  // Tampilkan buku ke rak yang sesuai
  dataBuku.forEach((buku) => {
    const judulBuku = buku.title.toLowerCase();
    const listItem = document.createElement("div");
    listItem.innerHTML = `
         <article class="buku">
          <div class="deskrispsi-buku">
            <h3>${buku.title}</h3>
            <p>Penulis: ${buku.author}</p>
            <p>Tahun: ${buku.year}</p>
            <div class="button">
            <button class="btn btn-pindah" onclick="pindahkanBuku(${buku.id})">Pindahkan</button>
            <button class="btn btn-hapus" onclick="hapusBuku(${buku.id})">Hapus</button>
            </div>
          </div>
         </article>
       `;

    if (buku.isComplete) {
      if (filterSelesai === "" || judulBuku.includes(filterSelesai)) {
        selesaiDibaca.appendChild(listItem);
      }
    } else {
      if (filterBelumSelesai === "" || judulBuku.includes(filterBelumSelesai)) {
        belumSelesaiDibaca.appendChild(listItem);
      }
    }
  });
}

// Event listener untuk input pencarian buku belum selesai dibaca
const filterBelumSelesaiInput = document.getElementById("filterBelumSelesai");
filterBelumSelesaiInput.addEventListener("input", tampilkanBuku);

// Event listener untuk input pencarian buku selesai dibaca
const filterSelesaiInput = document.getElementById("filterSelesai");
filterSelesaiInput.addEventListener("input", tampilkanBuku);

// Fungsi untuk menambahkan buku baru
function tambahBuku() {
  const formTambahBuku = document.getElementById("formTambahBuku");
  formTambahBuku.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = +new Date(); // Menggunakan timestamp sebagai ID unik
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const year = parseInt(document.getElementById("yearInput").value, 10);
    const isComplete = document.getElementById("isComplete").checked;

    if (title && author && year) {
      const dataBuku = ambilDataBuku();
      dataBuku.push({ id, title, author, year, isComplete });
      simpanDataBuku(dataBuku);

      document.getElementById("titleInput").value = "";
      document.getElementById("authorInput").value = "";
      document.getElementById("yearInput").value = "";
      document.getElementById("isComplete").checked = false;

      tampilkanBuku();
    }
  });
}

// Fungsi untuk memindahkan buku antar rak
function pindahkanBuku(idBuku) {
  const dataBuku = ambilDataBuku();
  const buku = dataBuku.find((b) => b.id === idBuku);

  if (buku) {
    buku.isComplete = !buku.isComplete;
    simpanDataBuku(dataBuku);
    tampilkanBuku();
  }
}

// Fungsi untuk menghapus buku
function hapusBuku(idBuku) {
  const dataBuku = ambilDataBuku();
  const index = dataBuku.findIndex((b) => b.id === idBuku);

  if (index !== -1) {
    dataBuku.splice(index, 1);
    simpanDataBuku(dataBuku);
    tampilkanBuku();
  }
}

// Panggil fungsi untuk menampilkan buku pertama kali
tampilkanBuku();
tambahBuku();
