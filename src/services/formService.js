/**
 * Form Service
 *
 * Adapter untuk mengirim data form kontak ke third-party form submission service
 * (Formspree, EmailJS, atau layanan serupa) via HTTP POST.
 *
 * Berbeda dengan cmsClient, fungsi ini akan THROW jika submission gagal,
 * karena caller (ContactSection) perlu menangani kegagalan dan menampilkan
 * pesan error kepada visitor serta mempertahankan data form (Requirements: 9.4).
 */

/**
 * Kirim data form kontak ke endpoint yang dikonfigurasi via VITE_FORM_ENDPOINT.
 *
 * @param {{ name: string, email: string, message: string }} formData
 * @returns {Promise<object>} Parsed JSON response dari submission service
 * @throws {Error} Jika response tidak ok (status >= 400) atau terjadi network error
 *
 * Requirements: 9.2
 */
export async function submitContactForm({ name, email, message }) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  return response.json();
}
