const postForm = document.getElementById("post-form")
const blogList = document.getElementById("blog-list")
let postsArray = []

function renderPosts() {
    blogList.innerHTML = postsArray.map(post => `
        <div class="post">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
            <hr>
        </div>
    `).join("")
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

postForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const postTitle = document.getElementById("title-input").value
    const postBody = document.getElementById("body-input").value
    const data = {
        title: postTitle,
        body: postBody
    }
    postForm.reset()

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
        })
})