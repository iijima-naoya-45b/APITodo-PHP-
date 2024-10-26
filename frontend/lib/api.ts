export async function getPosts() {
    const response = await fetch("http://localhost:8000/api/posts");
    
    if (!response.ok) {
      throw new Error("投稿の取得に失敗しました");
    }
  
    return response.json();
  }
  
  export async function addPost(post: { title: string; content: string }) {
    const response = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  
    if (!response.ok) {
      throw new Error("投稿の作成に失敗しました");
    }
  
    return response.json();
  }
  