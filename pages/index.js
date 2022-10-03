import { PostCard, PostWidget } from '../components'
import { getPosts } from '../services'

export default function Home({ posts }) {
  return (
    <main className='main'>
      <div className='main__inner'>
        <div className='main__item'>
          <h2>Introduction</h2>
          <p>
            Web development comes with a huge set of rules and techniques every website developer
            should know about. If you want a website to look and function as you wish them to, you
            need to get familiar with web technologies that will help you achieve your goal.
          </p>
        </div>
        <div className='main__item'>
          <h2>What is Web Technology?</h2>
          <p>
            You have probably heard the term “web development technologies” before, but did you ever
            think about what it actually means? Since computers can’t communicate with each other
            the way people do, they require codes instead. Web technologies are the markup languages
            and multimedia packages computers use to communicate.
          </p>
        </div>
      </div>

      <div className='posts'>
        <div>
          <PostWidget />
        </div>
        <div>
          {posts.reverse().map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: { posts },
  }
}
