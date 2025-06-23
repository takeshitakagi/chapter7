import { useEffect, useState } from 'react';
import type { Post } from '../types/Post';

import PostCard from './PostCard';
import { Link } from 'react-router-dom';

function TopPage() {

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log("記事の取得に失敗しました;", error);
        setPosts([]);
      }
    };
    fetcher();
  }, [])

  if (posts === null) {
    return <div>記事を読み込み中...</div>
  }

  if (posts.length === 0) {
    return <div>まだ記事がありません。</div>
  }

  return (
    <>
      <ul class='max-w-3xl mx-auto pt-6'>
        {posts.map((post: Post) => (
          <li class='border border-gray-400 mb-5 p-6' key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <PostCard postData={post} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default TopPage;
