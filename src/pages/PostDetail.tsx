import { useParams } from 'react-router-dom';
import type { Post } from '../types/Post';
import { date } from '../utils/date';
import { useEffect, useState } from 'react';


function PostDetail() {
  const { id } = useParams();
  console.log(`id：${id}`);

    const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      if (id === undefined) {
        console.warn("URLパラメータにidが指定されていません。");
        return;
      }

      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPost(data.post)
      } catch (error) {
        console.log("記事の取得に失敗しました:", error);
        setPost(null);
      }
    }
    fetcher();
  }, [id]);

  if (post === null) {
    return <div>記事を読み込み中...</div>
  }

  const formattedDate = date(post.createdAt);

  return (
    <>
      <div class='w-3xl mx-auto mt-10'>
        <img src={post.thumbnailUrl} alt={post.title} class='mb-4' />
        <div class='p-3'>
          <div class='flex justify-between mb-4 text-sm'>
            <div class='text-gray-400'>{formattedDate}</div>
            <div>{post.categories.map((category: string) => (
              <span key={category} class='border border-blue-600 text-blue-600 ml-4 px-2 py-1 rounded-sm'>{category}</span>
            ))}</div>
          </div>
          <h1 class='text-2xl mb-4'>{post.title}</h1>
          <p dangerouslySetInnerHTML={{__html: post.content}}></p>
        </div>
      </div>
    </>
  );
};
export default PostDetail;
