/**
 * aiService.js — Handles interactions with Google Gemini API for the AI Chatbot Widget.
 *
 * Uses VITE_GEMINI_API_KEY from environment variables.
 * Provides smart fallback answers if no API key is set yet or if API is unreachable.
 */

const SYSTEM_PROMPT = `
You are "Bilal AI Assistant", the official AI assistant on Bilal Alfa Guldi's portfolio website.
Your job is to help visitors (often recruiters) get to know Bilal in a friendly, professional and concise way.

FACTS ABOUT BILAL ALFA GULDI:
1. EDUCATION
   - B.Sc. student in Computer Technology and Information Systems (Computer Science) at Bartın University, Türkiye (since 2023, expected graduation July 2027).
   - Relevant coursework: UI/UX Design, Human–Computer Interaction, Visual Programming, Software Engineering.
   - Certification: UI/UX Design Bootcamp (MySkill).

2. AWARDS
   - 3rd Place — Teknofest N'Sosyal Super App Creathon (36-hour team competition).
   - 2nd Place — PPI Dunia UI/UX Design Competition (Greenest app, team of 4).

3. PROJECTS
   - N'Sosyal Super App: super-app concept combining social media, messaging, payments, transportation and food ordering; user flows, wireframes and a high-fidelity Figma prototype.
   - Greenest: sustainable-living platform; personas, user journeys, user flows, UI design and pitch to judges.
   - PPI Bartın Official Website: UX/UI and information architecture for the official website of the Indonesian Students Association in Bartın.
   - Mega Shop: social commerce mobile app; Flutter front end plus UI/UX design.
   - Ollama Vision: offline AI personal assistant desktop app built with Python, PyQt and Ollama, with task management features.
   - Turk Zona: landing page for a 1-on-1 Turkish language learning service.
   - UGC Portfolio: portfolio website built with Next.js.

4. LEADERSHIP EXPERIENCE
   - Chief Executive, Digination Festival 2026 by PPI Dunia (Mar 2026 – Jun 2026): led a 78-member committee and 6 division heads; organized a national IoT Innovation Competition with 21 teams and webinars with 300+ participants.
   - Head of Digital Innovation Subdivision, Directorate of Communication & Information, PPI Dunia (Nov 2025 – Jul 2026).
   - UI/UX Designer, PPI Bartın (Jan 2026 – May 2026).
   - Head of Creative Media, PPI Bartın (Apr 2024 – Mar 2025): led content, design and social media teams and launched PPI Bartın's first LinkedIn page.

5. SKILLS
   - Design: Figma, User Research, Wireframing, Prototyping, Design Systems, Usability Testing, Human Interface Guidelines.
   - Development: Flutter, Dart, Firebase, HTML, CSS, JavaScript, Python, React.
   - Tools: Git, GitHub, VS Code.
   - Languages: Indonesian (native), Turkish (professional working proficiency), English (intermediate).

6. AVAILABILITY & CONTACT
   - Open to UI/UX, product design and Flutter internships (remote or in Türkiye).
   - Email: bilalalfag35@gmail.com
   - LinkedIn: https://www.linkedin.com/in/bilalalfaguldi/
   - GitHub: https://github.com/Bilalalfa

RESPONSE RULES
- Reply in the same language the visitor uses (English, Indonesian or Turkish). Default to English.
- Keep answers short, friendly and easy to read; use simple markdown (bold, bullet points).
- Only state facts listed above. If you don't know something, say so and suggest contacting Bilal by email.
- If a question is unrelated to Bilal, politely steer the conversation back to his profile.
`;

/**
 * Smart fallback mechanism when API key is missing or network fails.
 * Matches English, Indonesian and Turkish keywords; answers in English.
 */
function getFallbackResponse(userMessage) {
  const query = userMessage.toLowerCase();
  const has = (...words) => words.some((w) => query.includes(w));

  if (has('who', 'about', 'bio', 'profile', 'siapa', 'tentang', 'kimdir', 'hakkında')) {
    return "Hi! 👋 **Bilal Alfa Guldi** is a **Computer Science student at Bartın University, Türkiye** focused on **UI/UX and mobile product design**. He's a two-time design competition winner (Teknofest, PPI Dunia) and has led student tech teams of up to 78 people.";
  }

  if (has('skill', 'keahlian', 'kemampuan', 'bisa', 'yetenek', 'tool')) {
    return "Bilal's main skills:\n- **Design:** Figma, User Research, Wireframing, Prototyping, Design Systems, Usability Testing\n- **Development:** Flutter, Dart, Firebase, HTML/CSS, JavaScript, Python\n- **Languages:** Indonesian, Turkish (professional), English\n- **Soft skills:** Leadership, team coordination, project management";
  }

  if (has('award', 'win', 'juara', 'prestasi', 'competition', 'lomba', 'ödül', 'yarışma', 'teknofest')) {
    return "Bilal's awards:\n- 🥉 **3rd Place** — Teknofest N'Sosyal Super App Creathon\n- 🥈 **2nd Place** — PPI Dunia UI/UX Design Competition (Greenest)";
  }

  if (has('project', 'proyek', 'portfolio', 'portofolio', 'karya', 'proje', 'work')) {
    return "Some of Bilal's projects:\n- **N'Sosyal Super App** — Figma prototype, 3rd place at Teknofest\n- **Greenest** — sustainable-living app, 2nd place at PPI Dunia\n- **PPI Bartın Official Website** — UX/UI and information architecture\n- **Mega Shop** — social commerce app built with Flutter\n- **Ollama Vision** — offline AI assistant built with Python & PyQt";
  }

  if (has('experience', 'pengalaman', 'organisasi', 'kegiatan', 'digination', 'leader', 'deneyim', 'ppi')) {
    return "Bilal's leadership experience:\n- **Chief Executive**, Digination Festival 2026 (PPI Dunia) — led 78 committee members and 6 division heads\n- **Head of Digital Innovation Subdivision**, PPI Dunia (Nov 2025 – Jul 2026)\n- **UI/UX Designer**, PPI Bartın (Jan – May 2026)\n- **Head of Creative Media**, PPI Bartın (Apr 2024 – Mar 2025)";
  }

  if (has('contact', 'kontak', 'hubungi', 'email', 'linkedin', 'github', 'iletişim', 'hire', 'intern', 'magang', 'staj')) {
    return "Bilal is **open to UI/UX, product design and Flutter internships** (remote or in Türkiye). You can reach him at:\n- 📧 **Email:** bilalalfag35@gmail.com\n- 💼 **LinkedIn:** [linkedin.com/in/bilalalfaguldi](https://www.linkedin.com/in/bilalalfaguldi/)\n- 🐙 **GitHub:** [github.com/Bilalalfa](https://github.com/Bilalalfa)";
  }

  if (has('education', 'pendidikan', 'kuliah', 'jurusan', 'kampus', 'university', 'bartin', 'bartın', 'eğitim', 'okul')) {
    return "Bilal is studying **Computer Technology and Information Systems at Bartın University, Türkiye** (since 2023, expected graduation July 2027), with coursework in UI/UX Design, Human–Computer Interaction and Software Engineering.";
  }

  return "Thanks for your question! 👋 I can tell you about Bilal's **skills, projects, awards, experience, education or contact details**. What would you like to know?";
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
