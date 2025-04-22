import { Card } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const data = [
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
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone',
      title: 'Noteworthy technology acquisitions 2021',
      selftext: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      is_video: true,
      created: 1745215428,
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
  const CardArray = data.map((post) => {
    if(post.is_video){
      return  (
        <Card className="max-w-140 m-8" key={uuidv4()}>
          <div>
            <div className="flex justify-between mb-1 text-base">
              <div className="flex">
                <HiUserCircle className="h-full mr-1 text-neutral-400"/>
                <p className="text-neutral-400">{post.author_fullname}</p>
              </div>
              <div className="flex">
                <HiOutlineClock className="text-neutral-500 h-full ml-1 mr-1"/>
                <p className="text-neutral-500">5 days ago</p>
              </div> 
            </div>
            <video className="w-full rounded-md" controls>
              <source src={post.media?.reddit_video.fallback_url} className="block"/>
              Your browser does not support the video tag.
            </video>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          {
            post.selftext ?           
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.selftext}
            </p> : null
          }
        </Card>
      )
    } 
    if(post.url.endsWith('.png') || post.url.endsWith('.jpg') || post.url.endsWith('.jpeg') || post.url.endsWith('.svg')){
      return (
        <Card className="max-w-140 m-8" key={uuidv4()}>
          <div>
            <div className="flex justify-between mb-1 text-base">
              <div className="flex">
                <HiUserCircle className="h-full mr-1 text-neutral-400"/>
                <p className="text-neutral-400">{post.author_fullname}</p>
              </div>
              <div className="flex">
                <HiOutlineClock className="text-neutral-500 h-full ml-1 mr-1"/>
                <p className="text-neutral-500">5 days ago</p>
              </div> 
            </div>
            <img src={post.url} className="rounded-md"/>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          {
            post.selftext ?           
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.selftext}
            </p> : null
          }
        </Card>
      )
    }
    if(post.thumbnail.endsWith('.png') || post.thumbnail.endsWith('.jpg') || post.thumbnail.endsWith('.jpeg') || post.thumbnail.endsWith('.svg')){
      return (
        <Card className="max-w-140 m-8" key={uuidv4()}>
          <div>
            <div className="flex justify-between mb-1 text-base">
              <div className="flex">
                <HiUserCircle className="h-full mr-1 text-neutral-400"/>
                <p className="text-neutral-400">{post.author_fullname}</p>
              </div>
              <div className="flex">
                <HiOutlineClock className="text-neutral-500 h-full ml-1 mr-1"/>
                <p className="text-neutral-500">5 days ago</p>
              </div> 
            </div>
            
          </div>
          <div>
            <img src={post.thumbnail} className="float-right rounded-md m-1"/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
          </div>
          {
            post.selftext ?           
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.selftext}
            </p> : null
          }
        </Card>
      )
    } else {
      return (
        <Card className="max-w-140 m-8" key={uuidv4()}>
          <div>
            <div className="flex justify-between mb-1 text-base">
              <div className="flex">
                <HiUserCircle className="h-full mr-1 text-neutral-400"/>
                <p className="text-neutral-400">{post.author_fullname}</p>
              </div>
              <div className="flex">
                <HiOutlineClock className="text-neutral-500 h-full ml-1 mr-1"/>
                <p className="text-neutral-500">5 days ago</p>
              </div> 
            </div>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          {
            post.selftext ?           
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.selftext}
            </p> : null
          }
        </Card>
      )
    }
  })
  CardArray
  return (
    <div className="w-full flex justify-center">
      <div className="w-140">
        {CardArray.filter((_, index) => {
          return index % 2 === 0
        })}
      </div>
      <div className="w-140">
        {CardArray.filter((_, index) => {
          return index % 2 === 1
        })}
      </div>
    </div>
  );
}
