import type { Post } from '../types/Post';
import { date } from '../utils/date';

interface PostCardProps {
  postData: Post;
}

function PostCard({postData}: PostCardProps) {

  const formattedDate = date(postData.createdAt);

  return (
    <>
      <div class='flex justify-between mb-4 items-center'>
        <div class='text-gray-400 text-sm'>{formattedDate}</div>
        <div>
          {postData.categories.map((categoryItem: string) => (
            <span key={categoryItem} class='text-blue-600 border border-blue-600 py-1 px-2 rounded-sm ml-3 text-sm'>
              { categoryItem }
            </span>
          ))}
        </div>
      </div>
      <h1 class='text-2xl mb-4'>{postData.title}</h1>
      <p class='line-clamp-2' dangerouslySetInnerHTML={{__html:postData.content}} />
    </>
  );
};
export default PostCard;
