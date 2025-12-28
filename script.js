document.addEventListener("DOMContentLoaded", () => {

  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const typingIndicator = document.getElementById("typing-indicator");
  const clearBtn = document.getElementById("clear-btn");
  const closeBtn = document.getElementById("close-btn");

  /* ================= DATA ================= */

  const faqData = {
    start: {
      keywords: ["hi", "hello", "hey"],
      response: "Hi! I’m Study Bot. Choose what you want help with.",
      replies: [
        { text: "📚 Course Roadmaps", key: "course_roadmaps" },
        { text: "🏆 Placement Guidance", key: "placement_guidance" },
        { text: "🎯 Career Confusion", key: "career_guidance" }
      ]
    },

    fallback: {
      response: "I didn’t understand that. Try asking about courses or placements."
    },

    course_roadmaps: {
      keywords: ["course", "roadmap", "learn"],
      response: "Select a domain to explore.",
      replies: [
        { text: "🌐 Web Development", key: "web_dev" },
        { text: "🐍 Python", key: "python" },
        { text: "📊 Data Science", key: "data_science" },
        { text: "📈 Data Analytics", key: "data_analytics" },
        { text: "☁️ Cloud & DevOps", key: "cloud_devops" },
        { text: "🤖 AI & ML", key: "ai_ml" }
      ]
    },

    web_dev: {
      response:
        "Web Development roadmap:\n\n" +
        "1. HTML, CSS, JavaScript\n" +
        "2. React\n" +
        "3. Backend (Node / Django)\n" +
        "4. Databases\n" +
        "5. Projects + Hosting",
      replies: [
        { text: "Frontend Only", key: "frontend" },
        { text: "Backend Only", key: "backend" }
      ]
    },

    frontend: {
      response:
        "Frontend focus:\n\n" +
        "• HTML, CSS, JavaScript\n" +
        "• React + Hooks\n" +
        "• Tailwind / Bootstrap\n" +
        "• UI projects"
    },

    backend: {
      response:
        "Backend focus:\n\n" +
        "• Node / Django / Spring Boot\n" +
        "• REST APIs\n" +
        "• Authentication\n" +
        "• Databases"
    },

    python: {
      response:
        "Python roadmap:\n\n" +
        "1. Basics + OOP\n" +
        "2. Libraries (NumPy, Pandas)\n" +
        "3. Specialization\n\n" +
        "Good for beginners."
    },

    data_science: {
      response:
        "Data Science path:\n\n" +
        "• Python\n" +
        "• Statistics\n" +
        "• Machine Learning\n" +
        "• Kaggle projects"
    },

    data_analytics: {
      response:
        "Data Analytics path:\n\n" +
        "• Excel + SQL\n" +
        "• Power BI / Tableau\n" +
        "• Basic Python"
    },

    cloud_devops: {
      response:
        "Cloud & DevOps:\n\n" +
        "• Linux + Git\n" +
        "• AWS / Azure\n" +
        "• Docker + CI/CD"
    },

    ai_ml: {
      response:
        "AI & ML roadmap:\n\n" +
        "• Python\n" +
        "• Math (Stats + Linear Algebra)\n" +
        "• ML Algorithms\n\n" +
        "Math-heavy field."
    },

    placement_guidance: {
      keywords: ["placement", "job", "interview"],
      response: "What do you need help with?",
      replies: [
        { text: "📄 Resume", key: "resume" },
        { text: "🎤 Interview", key: "interview" },
        { text: "💡 Projects", key: "projects" }
      ]
    },

    resume: {
      response:
        "Resume tips:\n\n" +
        "• One page only\n" +
        "• Projects first\n" +
        "• GitHub link\n" +
        "• Quantify impact"
    },

    interview: {
      response:
        "Interview prep:\n\n" +
        "• DSA basics\n" +
        "• Explain projects\n" +
        "• Be honest"
    },

    projects: {
      response:
        "Project ideas:\n\n" +
        "• Portfolio website\n" +
        "• E-commerce app\n" +
        "• Data analysis project"
    },

    career_guidance: {
      response:
        "Career confusion is normal.\n\n" +
        "Ask yourself:\n" +
        "• Logic or design?\n" +
        "• Math-heavy or creative?\n" +
        "• Long-term learning?"
    }
  };

  /* ================= FUNCTIONS ================= */

  const saveChat = () => {
    localStorage.setItem("studybot_chat", chatBody.innerHTML);
  };

  const loadChat = () => {
    const saved = localStorage.getItem("studybot_chat");
    if (saved) chatBody.innerHTML = saved;
  };

  const addMessage = (sender, text) => {
    const msg = document.createElement("div");
    msg.className = `message-container ${sender}-message`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerHTML = text.replace(/\n/g, "<br>");

    msg.appendChild(bubble);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
    saveChat();
  };

  const botReply = (key) => {
    typingIndicator.style.display = "flex";

    setTimeout(() => {
      typingIndicator.style.display = "none";

      const data = faqData[key];
      addMessage("bot", data.response);

      if (data.replies) {
        const wrap = document.createElement("div");
        wrap.className = "quick-replies";

        data.replies.forEach(r => {
          const btn = document.createElement("button");
          btn.textContent = r.text;
          btn.onclick = () => {
            addMessage("user", r.text);
            botReply(r.key);
          };
          wrap.appendChild(btn);
        });

        chatBody.appendChild(wrap);
      }
    }, 600);
  };

  const handleSend = () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    const lower = text.toLowerCase();
    let matched = null;

    for (const key in faqData) {
      if (faqData[key].keywords?.some(k => lower.includes(k))) {
        matched = key;
        break;
      }
    }

    botReply(matched || "fallback");
  };

  /* ================= EVENTS ================= */

  sendBtn.onclick = handleSend;
  userInput.addEventListener("keydown", e => e.key === "Enter" && handleSend());

  clearBtn.onclick = () => {
    chatBody.innerHTML = "";
    localStorage.removeItem("studybot_chat");
    botReply("start");
  };

  closeBtn.onclick = () => {
    chatbotContainer.classList.toggle("active");
  };

  /* ================= INIT ================= */

  loadChat();
  if (!chatBody.innerHTML) botReply("start");

});
