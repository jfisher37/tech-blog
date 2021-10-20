const updatePostBtn = document.getElementById('update-post-btn');
const deletePostBtn = document.getElementById('delete-post-btn');
const updatePostForm = document.getElementById('update-post');
const postNumEl = document.getElementById('post-user-id').innerHTML;
const newCommentForm = document.getElementById('new-comment');
const newCommentBtn = document.getElementById('add-comment-btn');

if(updatePostBtn){
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
}
if(deletePostBtn){
    deletePostBtn.addEventListener("click", async () => {
        const response = await fetch(`/post/${postNumEl}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
              console.log(response);
            document.location.replace(`/dashboard`);
          } else {
            alert('Failed to delete post.');
          }
    })
    }

newCommentBtn.addEventListener("click", () => {
    console.log("here!");
    newCommentBtn.setAttribute("style", "display: none;");
    newCommentForm.setAttribute("style", "display: inline-block;")
})

newCommentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

  const content = document.querySelector('#new-comment-content').value.trim();

  if (content) {
    const response = await fetch(`/post/${postNumEl}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(response);
      document.location.replace(`/post/${postNumEl}`);
    } else {
      alert('Failed to add comment.');
    }
  }
}
)

// if(updatePostBtn){
//     updatePostBtn.addEventListener("click", () => {
//         updatePostForm.setAttribute("style", "display: inline-block;")
//     })
    
//     updatePostForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
    
//       const title = document.querySelector('#update-post-title').value.trim();
//       const content = document.querySelector('#update-post-content').value.trim();
    
//       if (title && content) {
//         const response = await fetch(`/post/${postNumEl}`, {
//           method: 'PUT',
//           body: JSON.stringify({ title, content }),
//           headers: { 'Content-Type': 'application/json' },
//         });
    
//         if (response.ok) {
//             console.log(response);
//           document.location.replace(`/post/${postNumEl}`);
//         } else {
//           alert('Failed to update post.');
//         }
//       }
//     }
//     )
//     }