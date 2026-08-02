/**
 * aiService.js — Handles interactions with Google Gemini API for the AI Chatbot Widget.
 *
 * Uses VITE_GEMINI_API_KEY from environment variables.
 * Provides smart fallback answers if no API key is set yet or if API is unreachable.
 */

const SYSTEM_PROMPT = `
Kamu adalah "Bilal AI Assistant", asisten kecerdasan buatan resmi untuk situs web portofolio Bilal Alfa Guldi.
Tugas utama kamu adalah membantu pengunjung mengenal Bilal Alfa Guldi secara ramah, profesional, dan informatif.

FAKTA TENTANG BILAL ALFA GULDI:
1. PENDIDIKAN:
   - Mahasiswa Ilmu Komputer (Computer Science Student) di Bartin University, Turki (mulai 2023 - sekarang).
   - Aktif dalam kegiatan akademik dan non-akademik, kompetisi UI/UX Design, serta organisasi internasional.

2. PENGALAMAN ORGANISASI & KEPEMIMPINAN:
   - Chief of Organizing Committee (Ketua Pelaksana) Digination Festival 2026 (Maret 2026 - Juni 2026): Memimpin 65+ panitia di 7 divisi di bawah Direktorat Komunikasi dan Informasi PPI Dunia. Mengangkat tema IoT dan Teknologi, menyelenggarakan kompetisi dan webinar nasional/internasional.
   - Staff / Pengembang Divisi Inovasi Digital PPI Dunia (Oktober 2025 - sekarang): Mengelola platform digital PPI Dunia dan program kerja divisi.
   - UI/UX Designer PPI Bartin (Januari 2026 - Mei 2026): Merancang tampilan antarmuka dan pengalaman pengguna untuk website resmi PPI Bartin.

3. KEAHLIAN & SKILL:
   - UI/UX Design (Figma, Wireframing, Prototyping, Design System, User Research)
   - Web Development (React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Vite)
   - Tools & Workflow (Git, GitHub, VS Code)
   - Soft Skills (Leadership, Project Management, Team Coordination, Problem Solving)

4. KONTAK & MEDIA SOSIAL:
   - Gmail: bilalalfag35@gmail.com
   - LinkedIn: https://www.linkedin.com/in/bilalalfaguldi/
   - GitHub: https://github.com/Bilalalfa

ATURAN MERESPONS:
- Berikan jawaban dalam Bahasa Indonesia yang ramah, sopan, singkat, dan mudah dipahami.
- Gunakan format markdown sederhana (seperti bold atau bullet points) agar jawaban nyaman dibaca.
- Jika ada pertanyaan di luar topik portofolio/profil Bilal, arahkan kembali dengan sopan ke informasi seputar Bilal.
`;

/**
 * Smart fallback mechanism when API key is missing or network fails.
 */
function getFallbackResponse(userMessage) {
  const query = userMessage.toLowerCase();

  if (query.includes('siapa') || query.includes('tentang') || query.includes('bio') || query.includes('profile')) {
    return 'Halo! 👋 **Bilal Alfa Guldi** adalah mahasiswa **Computer Science di Bartin University, Turki**, yang memiliki minat mendalam pada **UI/UX Design** dan **Web Development**. Bilal juga aktif memimpin berbagai proyek digital dan organisasi internasional seperti **PPI Dunia** dan **PPI Bartin**.';
  }

  if (query.includes('skill') || query.includes('keahlian') || query.includes('kemampuan') || query.includes('bisa')) {
    return 'Berikut adalah keahlian utama Bilal:\n- **UI/UX Design:** Figma, Wireframing, Prototyping, User Research\n- **Web Development:** React.js, JavaScript (ES6+), HTML/CSS, Tailwind CSS\n- **Tools:** Git, GitHub, Vite\n- **Soft Skills:** Leadership, Team Management, Problem Solving';
  }

  if (query.includes('proyek') || query.includes('project') || query.includes('portofolio') || query.includes('karya')) {
    return 'Bilal telah merancang dan mengembangkan beberapa proyek menarik, di antaranya:\n- **Website Resmi PPI Bartin** (UI/UX Design)\n- **Platform Digination Festival 2026** (PPI Dunia)\n- Berbagai desain aplikasi mobile dan website portofolio interaktif.';
  }

  if (query.includes('pengalaman') || query.includes('organisasi') || query.includes('kegiatan') || query.includes('digination')) {
    return 'Pengalaman organisasi & kepemimpinan Bilal:\n- **Chief of Organizing Committee** Digination Festival 2026 (PPI Dunia) — Memimpin 65+ panitia di 7 divisi.\n- **UI/UX Designer** PPI Bartin (2026).\n- **Staf Divisi Inovasi Digital** PPI Dunia (2025 - Sekarang).';
  }

  if (query.includes('kontak') || query.includes('hubungi') || query.includes('email') || query.includes('linkedin') || query.includes('github')) {
    return 'Kamu bisa menghubungi Bilal melalui:\n- 📧 **Email:** bilalalfag35@gmail.com\n- 💼 **LinkedIn:** [linkedin.com/in/bilalalfaguldi](https://www.linkedin.com/in/bilalalfaguldi/)\n- 🐙 **GitHub:** [github.com/Bilalalfa](https://github.com/Bilalalfa)';
  }

  if (query.includes('pendidikan') || query.includes('kuliah') || query.includes('jurusan') || query.includes('kampus') || query.includes('bartin')) {
    return 'Bilal saat ini menempuh pendidikan S1 **Computer Science (Ilmu Komputer) di Bartin University, Turki** (sejak tahun 2023). Bilal aktif menggabungkan teori akademis dengan praktik industri UI/UX & Web Development.';
  }

  return 'Terima kasih atas pertanyaannya! 👋 Sebagai AI Assistant Bilal, saya bisa membantu menjelaskan mengenai **Skill, Proyek, Pengalaman Organisasi (PPI Dunia/PPI Bartin), Pendidikan, atau Kontak Bilal**. Ada yang ingin kamu ketahui lebih lanjut?';
}

/**
 * Sends messages to Google Gemini API (or returns fallback if API key is not configured).
 *
 * @param {Array<{role: 'user'|'model', parts: Array<{text: string}>}>} chatHistory
 * @returns {Promise<string>}
 */
export async function sendChatMessage(chatHistory) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const lastUserMessage = chatHistory[chatHistory.length - 1]?.parts[0]?.text || '';

  // If no API key configured, use intelligent local fallback
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    // Artificial delay to mimic API latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getFallbackResponse(lastUserMessage);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: chatHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini API request failed with status:', response.status);
      return getFallbackResponse(lastUserMessage);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      return reply;
    }

    return getFallbackResponse(lastUserMessage);
  } catch (err) {
    console.error('Error fetching Gemini AI response:', err);
    return getFallbackResponse(lastUserMessage);
  }
}
