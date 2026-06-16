import Link from 'next/link'
import { getLatestPosts } from '@/lib/getLatestBlogs'
import { extractContentPreview } from '@/lib/extractContentPreview'
import Image from 'next/image'

export default async function BlogSection() {
  const posts = await getLatestPosts()

  return (
    <section className="py-8 md:py-12" id="blog">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xl md:text-2xl font-extralight uppercase text-[var(--skyBlue)]">
            BLOGS
          </p>
          <h2 className="font-roboto-condensed text-balance text-3xl md:text-5xl font-extrabold uppercase leading-tight sm:text-5xl text-white">
            Information Hub
          </h2>
          <p className="mx-auto max-w-5xl text-base md:text-lg text-white mt-4 md:font-thin md:tracking-wider">
            Simplifying trends and insights without sounding like a user manual, <br /> so your
            business can have a competitive edge.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {posts.map((post) => {
            const imageUrl =
              post.heroImage && typeof post.heroImage === 'object'
                ? (post.heroImage.url ?? '')
                : typeof post.heroImage === 'string'
                  ? post.heroImage
                  : ''
            return (
              <div className="group block overflow-hidden hover:shadow-md transition duration-300 relative text-white">
                {/* <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group block overflow-hidden hover:shadow-md transition duration-300 relative text-white"
              > */}
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={imageUrl}
                    width={400}
                    height={250}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="mt-4">
                  <span className="text-sm text-[#9A9A9A]">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>

                  <h3 className="mt-3 text-[1.1rem] leading-snug ">{post.title}</h3>

                  <p className="mt-3 text-base leading-6 line-clamp-3 font-thin tracking-wider">
                    {extractContentPreview(post.content)}
                  </p>

                  {/* <Link
                    href="about"
                    target="_blank"
                    className="triangle-cta text-white py-3 px-6 block mt-4 inline-block mt-8"
                  >
                    <span className="flex items-center gap-2">Know More</span>
                  </Link> */}
                </div>
                {/* </Link> */}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
