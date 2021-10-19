const updatePostBtn = document.getElementById('update-post-btn');
const deletePostBtn = document.getElementById('delete-post-btn');
const updatePostForm = document.getElementById('update-post');
const postNumEl = document.getElementById('post-user-id').innerHTML;

console.log(postNumEl);

updatePostBtn.addEventListener("click", () => {
    updatePostForm.setAttribute("style", "display: inline-block;")
})

updatePostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

  const title = document.querySelector('#update-post-title').value.trim();
  const content = document.querySelector('#update-post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/post/${postNumEl}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(response);
      document.location.replace(`/post/${postNumEl}`);
    } else {
      alert('Failed to update post.');
    }
  }
}
)
