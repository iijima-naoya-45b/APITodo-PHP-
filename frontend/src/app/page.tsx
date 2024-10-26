"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { addPost, getPosts } from "../../lib/api"; // api.tsから関数をインポート

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState(""); // 新しい投稿のタイトル
  const [newPostContent, setNewPostContent] = useState(""); // 新しい投稿のコンテンツ

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(); // APIから投稿を取得
        setPosts(data);
      } catch (err) {
        setError("投稿の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 投稿の送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPostTitle || !newPostContent) {
      alert("タイトルとコンテンツを入力してください");
      return;
    }

    try {
      await addPost({ title: newPostTitle, content: newPostContent });
      setNewPostTitle("");
      setNewPostContent("");
      const updatedPosts = await getPosts(); // 更新された投稿リストを取得
      setPosts(updatedPosts);
    } catch (error) {
      setError("投稿の作成に失敗しました");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* 投稿フォーム */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="border p-2 rounded"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="コンテンツを入力"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            投稿を追加
          </button>
        </form>

        {/* 投稿の表示 */}
        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p>投稿はありません</p>
        ) : (
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {posts.map((post) => (
              <li key={post.id} className="mb-2">
                {post.title}: {post.content}
              </li>
            ))}
          </ol>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
