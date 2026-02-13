import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

/* ===============================
   🔴 SAME CONFIG AS auth.js
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyCMZeKrDeizterXGhYZrgD0s7rOxLM5Ehk",
  authDomain: "mamo-blogs.firebaseapp.com",
  projectId: "mamo-blogs",
  appId: "1:451715305858:web:88e04ee4de7402ab327f9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ===============================
   🔐 PROTECT ADMIN PAGE
================================ */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("index.html");
  }
});


/* ===============================
   🧠 YOUR EXISTING UI LOGIC
================================ */

const blogList = document.getElementById("blogList");
const blogForm = document.getElementById("blogForm");

const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const contentInput = document.getElementById("content");
const editingBlogIdInput = document.getElementById("editingBlogId");

let dummyBlogs = [
  {
    id: "1",
    title: "First blog",
    image: "",
    content: "Demo content for first blog"
  },
  {
    id: "2",
    title: "Second blog",
    image: "",
    content: "Demo content for second blog"
  }
];

// ---------------- render blogs ----------------
function renderBlogs() {
  blogList.innerHTML = "";

  if (dummyBlogs.length === 0) {
    blogList.innerHTML = "<p>No blogs yet.</p>";
    return;
  }

  dummyBlogs.forEach(blog => {

    const row = document.createElement("div");
    row.className = "admin-blog-row";

    row.innerHTML = `
      <span>${blog.title}</span>
      <div class="admin-blog-actions">
        <button class="edit" data-id="${blog.id}">Edit</button>
        <button class="delete" data-id="${blog.id}">Delete</button>
      </div>
    `;

    blogList.appendChild(row);
  });

  attachActions();
}

// ---------------- attach buttons ----------------
function attachActions() {

  document.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", () => {
      editBlog(btn.dataset.id);
    });
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteBlog(btn.dataset.id);
    });
  });

}

// ---------------- delete ----------------
function deleteBlog(id) {
  dummyBlogs = dummyBlogs.filter(b => b.id !== id);
  renderBlogs();

  if (editingBlogIdInput.value === id) {
    resetForm();
  }
}

// ---------------- edit ----------------
function editBlog(id) {

  const blog = dummyBlogs.find(b => b.id === id);
  if (!blog) return;

  editingBlogIdInput.value = blog.id;
  titleInput.value = blog.title;
  imageInput.value = blog.image;
  contentInput.value = blog.content;

  titleInput.focus();
}

// ---------------- add / update ----------------
blogForm.addEventListener("submit", e => {

  e.preventDefault();

  const title = titleInput.value.trim();
  const image = imageInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  const editingId = editingBlogIdInput.value;

  if (editingId) {

    const index = dummyBlogs.findIndex(b => b.id === editingId);

    if (index !== -1) {
      dummyBlogs[index].title = title;
      dummyBlogs[index].image = image;
      dummyBlogs[index].content = content;
    }

  } else {

    dummyBlogs.push({
      id: Date.now().toString(),
      title,
      image,
      content
    });

  }

  renderBlogs();
  resetForm();

});

// ---------------- reset ----------------
function resetForm() {
  editingBlogIdInput.value = "";
  blogForm.reset();
}


/* ===============================
   🚪 REAL LOGOUT
================================ */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.replace("index.html");
    } catch (e) {
      console.error(e);
      alert("Logout failed");
    }
  });
}


// initial load
renderBlogs();