const newPostBtn = document.getElementById('add-post-btn');
const newPostForm = document.getElementById('new-post');

newPostBtn.addEventListener("click", () => {
    newPostBtn.setAttribute("style", "display: none;");
    newPostForm.setAttribute("style", "display: inline-block;")
})

newPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

  const title = document.querySelector('#new-post-title').value.trim();
  const content = document.querySelector('#new-post-content').value.trim();

  if (title && content) {
    const response = await fetch('/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(response);
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add post.');
    }
  }
}
)


