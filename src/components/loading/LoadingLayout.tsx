'use client'
import PostLayout from '../posts/PostLayout'

export default function LoadingLayout() {
  return <PostLayout data={null} isFetching={true}/>
}

