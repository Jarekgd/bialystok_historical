const IS_STATIC_PREVIEW =
  window.location.protocol === "file:"
  || (
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
    && ["5500", "5501"].includes(window.location.port)
  );

const CHAT_ENDPOINT = IS_STATIC_PREVIEW ? "" : "../ask-history.php";

const LOCAL_CONTEXT = `
Historical Bialystok is a project about a 3D interactive reconstruction of the city inspired by its appearance before the Second World War.
Bialystok has a long history as a meeting place of cultures, languages and religions in north-eastern Poland.
Before the Second World War, the city was home to Polish, Jewish, Belarusian, Russian and other communities.
The war brought catastrophic destruction, and the Jewish community, which had been central to the city for generations, was devastated during the Holocaust.
The reconstruction is intended to help visitors imagine fragments of the city that were lost and connect with historical memory.
`;

const form = document.querySelector("#chat-form");
const questionInput = document.querySelector("#chat-question");
const messages = document.querySelector("#chat-messages");
const statusText = document.querySelector("#chat-status");

function addMessage(text, type) {
  const message = document.createElement("article");
  message.className = `chat-message ${type}-message`;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.appendChild(paragraph);

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function setStatus(text) {
  statusText.textContent = text;
}

function localPrototypeAnswer(question) {
  const lower = question.toLowerCase();

  if (lower.includes("community") || lower.includes("communities") || lower.includes("jewish") || lower.includes("people")) {
    return "Before the Second World War, Bialystok was a multicultural city with Polish, Jewish, Belarusian, Russian and other communities. For a public chatbot, this answer should later be grounded in your project sources and bibliography.";
  }

  if (lower.includes("war") || lower.includes("ww2") || lower.includes("second world")) {
    return "The war brought severe destruction to Bialystok, and the Jewish community was devastated during the Holocaust. A production chatbot should cite the specific sources used for this historical claim.";
  }

  if (lower.includes("reconstruction") || lower.includes("project") || lower.includes("3d")) {
    return "The project presents a 3D interactive reconstruction inspired by Bialystok before the Second World War, helping visitors imagine parts of the city that were lost.";
  }

  return "This prototype has only a small local context. Once connected to an AI backend and curated sources, it can answer more specific questions about Bialystok history.";
}

async function askBackend(question) {
  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      context: LOCAL_CONTEXT
    })
  });

  const responseText = await response.text();
  let data;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    throw new Error("The chatbot server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.error || "The chatbot endpoint returned an error.");
  }

  return data.answer || "No answer was returned.";
}

async function handleQuestion(question) {
  addMessage(question, "user");
  questionInput.value = "";
  setStatus("Thinking...");

  try {
    const answer = CHAT_ENDPOINT
      ? await askBackend(question)
      : localPrototypeAnswer(question);

    addMessage(answer, "bot");
    setStatus("");
  } catch (error) {
    addMessage(error.message, "error");
    setStatus("Something went wrong.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();
  if (!question) return;

  handleQuestion(question);
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.dataset.question;
    questionInput.focus();
  });
});

setStatus("");
