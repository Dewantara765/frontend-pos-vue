export function isAuthenticated() {
  // Cek keberadaan token
  const token = localStorage.getItem('token');

  // Anda mungkin juga ingin memvalidasi token lebih lanjut (misalnya, cek masa kadaluarsa),
  // tetapi untuk Sanctum, keberadaan token plain-text sudah cukup sebagai indikator dasar.
  return !!token;
}
