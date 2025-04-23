import Post from "@/components/posts/Post";
import PostLayout from "@/components/posts/PostLayout";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const data = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: false,
      created: 1745257120,
      thumbnail: 'self',
      media: null,
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: true,
      created: 1745257120,
      thumbnail: 'self',
      media: {
        reddit_video: {
          fallback_url: 'https://v.redd.it/aur7dfc8h8we1/DASH_720.mp4?source=fallback',
        }
      },
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone',
      title: "Trump Just Attacked the Constitution and Violated His Oath of Office Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      selftext: "Today, President Donald Trump publicly violated his constitutional oath by declaring on Truth Social: \"We cannot give everyone a trial, because to do so would take, without exaggeration, 200 years.\" This statement explicitly rejects the constitutional right to due process, guaranteed to every individual within U.S. jurisdiction by both the Fifth and Fourteenth Amendments.\n\nBy openly dismissing a foundational constitutional protection, President Trump has directly betrayed his oath of office, outlined clearly in Article II, Section 1 of the Constitution: to \"preserve, protect, and defend the Constitution of the United States.\" The President’s role explicitly requires upholding constitutional principles, not disregarding or circumventing them for expediency or political convenience.\n\nThis violation is not merely a policy disagreement or partisan conflict; it is an intentional breach of the fundamental constitutional obligations entrusted to the Presidency. Trump's statement represents an unprecedented threat to the rule of law and undermines the very structure of American democracy. Allowing a President to openly reject constitutional rights sets a dangerous precedent that weakens the foundation of American constitutional governance.\n\nGiven the gravity and clarity of this breach, the Constitution itself provides a remedy: removal from office through impeachment. President Trump's explicit rejection of due process rights demonstrates unequivocally that he is unwilling or unable to uphold the Constitution. For the preservation of constitutional integrity, the rule of law, and the fundamental principles upon which the United States is built, President Trump must be removed from office.",
      is_video: false,
      created: 1745215428,
      thumbnail: 'https://b.thumbs.redditmedia.com/3pPi4DeQSAVSCRft6x7OVZyGOSTJXVe5piYWoHJhbkc.jpg',
      media: null,
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone',
      title: 'The White House has begun process of looking for new secretary of defense',
      selftext: '',
      is_video: false,
      created: 1745215428,
      thumbnail: 'https://b.thumbs.redditmedia.com/wBLgj0wBmNQipVSig02rmiZNoT8IHKggZwNL_K36_IY.jpg',
      media: null,
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: true,
      created: 1745215428,
      thumbnail: 'self',
      media: {
        reddit_video: {
          fallback_url: 'https://v.redd.it/ujjv09ag58we1/DASH_360.mp4?source=fallback',
        }
      },
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: false,
      created: 1745215428,
      thumbnail: 'self',
      media: null,
      author_fullname: 't2_b6is71st',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: false,
      created: 1745215428,
      thumbnail: 'self',
      media: null,
      author_fullname: 't2_b6is71st',
    },
  ]
  const PostArray = data.map((post) => {
    if(post.is_video){
      return  (
        <Post 
          author={post.author_fullname} 
          title={post.title} text={post.selftext} 
          createdAt={post.created} 
          videoUrl={post.media?.reddit_video.fallback_url}
          key={uuidv4()}
        />
      )
    } 
    if(post.url.endsWith('.png') || post.url.endsWith('.jpg') || post.url.endsWith('.jpeg') || post.url.endsWith('.svg')){
      return (
        <Post 
          author={post.author_fullname} 
          title={post.title} text={post.selftext} 
          createdAt={post.created} 
          pictureUrl={post.url}
          key={uuidv4()}
        />
      )
    }
    if(post.thumbnail.endsWith('.png') || post.thumbnail.endsWith('.jpg') || post.thumbnail.endsWith('.jpeg') || post.thumbnail.endsWith('.svg')){
      return (
        <Post
          author={post.author_fullname} 
          title={post.title} text={post.selftext} 
          createdAt={post.created} 
          thumbnailUrl={post.thumbnail}
          key={uuidv4()}
        />
      )
    }
      return (
        <Post 
          author={post.author_fullname} 
          title={post.title} text={post.selftext} 
          createdAt={post.created} 
          key={uuidv4()}
        />
      )
  })
  return (
    <PostLayout Posts={PostArray}/>
  );
}
