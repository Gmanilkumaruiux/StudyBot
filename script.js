document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeBtn = document.getElementById("close-chatbot");
  const clearBtn = document.getElementById("clear-btn");
  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const typingIndicator = document.getElementById("typing-indicator");

  // --- FAQ Data with NEW 'keywords' for search functionality ---
  const faqData = {
    start: {
      // ##### THIS SECTION IS UPDATED #####
      keywords: ["hii", "hlo", "hey", "hello", "hi","heyy"],
      response: "Hello! 👋 I'm your Study Bot. You can ask me about a topic or choose from the options below.",
      replies: [
        { text: "📚 Course Roadmaps", key: "course_roadmaps" },
        { text: "🏆 Placement Guidance", key: "placement_guidance" }
      ]
    },
    fallback: {
      response: "I'm sorry, I couldn't find information on that. Please try another term, or choose from the main options below.",
      replies: [
        { text: "📚 Course Roadmaps", key: "course_roadmaps" },
        { text: "🏆 Placement Guidance", key: "placement_guidance" }
      ]
    },
    course_roadmaps: {
      keywords: ["course", "courses", "roadmap", "roadmaps", "learn", "study", "path"],
      response: "Great! Which field are you interested in?",
      replies: [
        { text: "🌐Web Development", key: "web_development" },
        { text: "📊Data Science", key: "data_science_roadmap" },
        { text: "🐍Python", key: "Python_roadmap"},
        { text: "☕Java", key: "Java_roadmap"},
        { text: "🗄️SQL", key: "SQL_roadmap"},
        { text: "📈Data Analytics", key: "data_Analytics_roadmap"},
        { text: "🔄DevOps", key: "DevOps_roadmap"},
        { text: "☁️Back End", key: "Back_End_roadmap"},
        { text: "🔙Back", key: "start" }
      ]
    },
    placement_guidance: {
      keywords: ["placement", "placements", "job", "jobs", "career", "hiring"],
      response: "Awesome! What do you need help with?",
      replies: [
        { text: "📄 Resume Tips", key: "resume_tips" },
        { text: "🎤 Interview Prep", key: "interview_prep" },
        { text: "💡 Project Ideas", key: "project_ideas" },
        { text: "🔙 Back", key: "start" }
      ]
    },
    web_development: {
      keywords: ["web development", "website", "fullstack", "full stack"],
      response: "Web Development can be split into Frontend (what you see) and Backend (how it works). Which part are you curious about?",
      replies: [
          { text: "🎨 Frontend", key: "frontend_roadmap" },
          { text: "⚙️ Backend", key: "Back_End_roadmap" },
          { text: "🔙 Back", key: "web_development" }
      ]
    },
    frontend_roadmap: {
      keywords: ["frontend", "front-end", "ui", "ux", "user interface"],
      response: "For Frontend, focus on: <ul><li>1. HTML, CSS, JavaScript (The core triad).</li><li>2. A modern framework like React or Vue.</li></ul>",
      replies: [
          { text: "⚙️ Backend", key: "Back_End_roadmap" },
          { text: "🔙 Back", key: "web_development" }
      ]
    },
    data_science_roadmap: {
        keywords: ["data science", "ds"],
        response: `For Data Science, you should focus on:<ul><li><strong>1. Programming:</strong> Python (with Pandas, NumPy, Scikit-learn).</li><li><strong>2. Math:</strong> Statistics and Probability.</li><li><strong>3. Databases:</strong> SQL is a must-have.</li></ul>`,
        replies: [
            { text: "🐍 Python", key: "Python_roadmap" },
            { text: "🔙 Back", key: "course_roadmaps" }
        ]
    },
    Python_roadmap: {
      keywords: ["python", "py"],
      response: "🐍 Python is a versatile language for web development, data science, and automation. A good roadmap is:<ul><li>1. Master the fundamentals (variables, loops, functions, data structures).</li><li>2. Learn Object-Oriented Programming (OOP) concepts.</li><li>3. Explore key libraries like Pandas for data or Django/Flask for web development.</li></ul>",
      replies: [
        { text: "📊 Data Science", key: "data_science_roadmap" },
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    Java_roadmap: {
      keywords: ["java"],
      response: "☕ Java is a powerful choice for large-scale backend systems and Android apps. Focus on:<ul><li>1. Core Java concepts (OOP, data types, collections).</li><li>2. Data Structures and Algorithms.</li><li>3. Learn a framework like Spring/Spring Boot for building robust applications.</li></ul>",
      replies: [
        { text: "☁️ Back End", key: "Back_End_roadmap" },
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    SQL_roadmap: {
      keywords: ["sql", "database", "databases", "dbms"],
      response: "🗄️ SQL is essential for managing and querying databases. Your learning path should be:<ul><li>1. Basic queries: SELECT, FROM, WHERE.</li><li>2. Intermediate: JOINs, GROUP BY, and aggregate functions.</li><li>3. Advanced: Window functions, stored procedures, and indexing.</li></ul>",
      replies: [
        { text: "📈 Data Analytics", key: "data_Analytics_roadmap" },
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    data_Analytics_roadmap: {
      keywords: ["data analytics", "analytics", "analysis"],
      response: "📈 Data Analytics focuses on interpreting data to find insights. You'll need:<ul><li>1. Strong SQL skills to retrieve data.</li><li>2. Proficiency in Excel or Google Sheets.</li><li>3. A visualization tool like Tableau or Power BI.</li><li>4. Basic Python or R for statistical analysis.</li></ul>",
      replies: [
        { text: "🗄️ SQL", key: "SQL_roadmap" },
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    DevOps_roadmap: {
      keywords: ["devops"],
      response: "🔄 DevOps bridges the gap between development and operations. Key skills include:<ul><li>1. Version Control: Git.</li><li>2. CI/CD: Jenkins or GitHub Actions.</li><li>3. Cloud Providers: AWS, Azure, or GCP.</li><li>4. Containers: Docker and Kubernetes.</li></ul>",
      replies: [
        { text: "☁️ Back End", key: "Back_End_roadmap" },
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    Back_End_roadmap: {
      keywords: ["backend", "back end", "server", "server-side"],
      response: "☁️ The Back End is the engine of an application. A general roadmap is:<ul><li>1. Pick a language (Python, Java, Node.js).</li><li>2. Learn its main web framework (Django, Spring, Express).</li><li>3. Understand how to design and build APIs (RESTful APIs).</li><li>4. Master working with databases (SQL & NoSQL).</li></ul>",
      replies: [
        { text: "🔙 Back", key: "course_roadmaps" }
      ]
    },
    resume_tips: {
        keywords: ["resume", "cv", "bio-data"],
        response: `To create a powerful tech resume:<ul><li><strong>Keep it to one page.</strong></li><li><strong>Use the STAR Method</strong> for project descriptions (Situation, Task, Action, Result).</li><li><strong>Highlight Skills & Projects</strong> and link your GitHub/Portfolio.</li></ul>`,
        replies: [
            { text: "🎤 Interview Prep", key: "interview_prep" },
            { text: "🔙 Back", key: "placement_guidance" }
        ]
    },
    interview_prep: {
        keywords: ["interview", "interviews", "prep", "preparation"],
        response: `Interview prep has two parts:<ul><li><strong>Technical Prep:</strong> Focus on Data Structures & Algorithms on platforms like LeetCode.</li><li><strong>Behavioral Prep:</strong> Be ready to talk about your projects and teamwork.</li></ul>`,
        replies: [
            { text: "💡 Project Ideas", key: "project_ideas" },
            { text: "🔙 Back", key: "placement_guidance" }
        ]
    },
    project_ideas: {
        keywords: ["project", "projects", "ideas", "portfolio"],
        response: `Projects prove your skills. Some ideas:<ul><li><strong>Web Dev:</strong> Portfolio Website, Weather App, E-commerce site.</li><li><strong>Data Science:</strong> Analyze a dataset from Kaggle.</li></ul>`,
        replies: [
            { text: "📄 Resume Tips", key: "resume_tips" },
            { text: "🔙 Back", key: "placement_guidance" }
        ]
    }
  };

  // --- Core Functions ---
  const toggleChatbot = () => {
    chatbotContainer.classList.toggle("active");
  };

  const displayMessage = (sender, message) => {
    const msgContainer = document.createElement("div");
    msgContainer.classList.add("message-container", `${sender}-message`);
    const msgBubble = document.createElement("div");
    msgBubble.classList.add("message-bubble");
    msgBubble.innerHTML = message;
    msgContainer.appendChild(msgBubble);
    chatBody.appendChild(msgContainer);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const displayQuickReplies = (replies) => {
    const container = document.createElement("div");
    container.classList.add("quick-replies");
    replies.forEach(r => {
      const btn = document.createElement("button");
      btn.classList.add("quick-reply-btn");
      btn.textContent = r.text;
      btn.dataset.key = r.key;
      container.appendChild(btn);
    });
    chatBody.appendChild(container);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const botReply = (key) => {
    const choice = faqData[key];
    typingIndicator.style.display = "flex";
    setTimeout(() => {
      typingIndicator.style.display = "none";
      displayMessage("bot", choice.response);
      if (choice.replies) displayQuickReplies(choice.replies);
    }, 800);
  };

  const handleSend = () => {
    const text = userInput.value.trim();
    if (!text) return;
    displayMessage("user", text);
    userInput.value = "";

    const lowerText = text.toLowerCase();
    let matchedKey = null;

    for (const key in faqData) {
      if (faqData[key].keywords) {
        if (faqData[key].keywords.some(kw => lowerText.includes(kw))) {
          matchedKey = key;
          break; 
        }
      }
    }
    
    if (matchedKey) {
      botReply(matchedKey);
    } else {
      botReply("fallback");
    }
  };

  // --- Event Listeners ---
  closeBtn.addEventListener("click", toggleChatbot);
  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keyup", (e) => e.key === "Enter" && handleSend());
  clearBtn.addEventListener("click", () => {
      chatBody.innerHTML = "";
      botReply("start"); // Start a new conversation
  });

  chatBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-reply-btn")) {
      const key = e.target.dataset.key;
      displayMessage("user", e.target.textContent);
      document.querySelectorAll(".quick-replies").forEach(el => el.remove());
      botReply(key);
    }
  });

  // Make the chatbot visible by default
  chatbotContainer.classList.add("active");
  
  // Initial greeting
  botReply("start");
});
