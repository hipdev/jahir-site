import { Suspense } from 'react';

import { Icon } from '@/components/icon';
import { LinkButton } from '@/components/link-button';
import { Section } from '@/components/section';
import { BlogPostItem } from '@/components/views/blog/item';
import { RSSFeedButton } from '@/components/views/blog/rss-feed-button';
import { Intro } from '@/components/views/home/intro';
import { getPopularPosts } from '@/utils/blog';
import { getColoredTextClasses } from '@/utils/colored-text';
import cx from '@/utils/cx';

import Loading from './loading';

const TopBlogPosts = async () => {
  const topPosts = await getPopularPosts();
  return (
    <Suspense fallback={<Loading />}>
      {topPosts.length ? (
        <Section id={'blog'} className={'gap-8'}>
          <div
            className={cx(
              'w-full flex flex-col items-start gap-4',
              'tablet-sm:flex-row tablet-sm:items-center tablet-sm:justify-between',
            )}
          >
            <h2
              className={getColoredTextClasses(
                'orange',
                'yellow',
                'orange',
                false,
              )}
            >
              Top blog posts
            </h2>
            <div
              className={cx(
                'flex flex-row flex-1 items-center gap-4 self-end w-full',
                'tablet-sm:w-auto tablet-sm:justify-end',
              )}
            >
              <RSSFeedButton
                className={'max-mobile-lg:justify-center max-mobile-lg:flex-1'}
              />

              <LinkButton
                title={'View all'}
                href={'/blog'}
                className={cx(
                  'pr-4',
                  'justify-center max-mobile-lg:flex-1',
                  'mobile-lg:self-start mobile-lg:justify-start',
                )}
                data-umami-event={'View all blog posts'}
              >
                <Icon
                  className={'size-5'}
                  path={
                    'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                  }
                />
                <span>View all</span>
              </LinkButton>
            </div>
          </div>

          <ol className={'flex flex-col gap-2'}>
            {topPosts.map((post) => (
              <li className={'block'} key={post.slug}>
                <BlogPostItem post={post} fullDate />
              </li>
            ))}
          </ol>
        </Section>
      ) : null}
    </Suspense>
  );
};

export default function Home() {
  return (
    <>
      <Intro />
      <TopBlogPosts />
    </>
  );
  // <>
  //   <Intro />
  //   <LatestBlogPost>
  //     <ul
  //       title={'The two most recent blog posts'}
  //       className={'list-none flex flex-col gap-6'}
  //     >
  //       <li>
  //         <BlogPostCard
  //           post={latestBlogPost}
  //           viewsCounter={
  //             <ViewsCounter
  //               slug={`blog--${latestBlogPost.slug}`}
  //               inProgress={latestBlogPost.inProgress}
  //               $sm
  //             />
  //           }
  //           showYear
  //           small
  //         />
  //       </li>
  //       <li>
  //         <BlogPostCard
  //           post={latestBlogPostB}
  //           viewsCounter={
  //             <ViewsCounter
  //               slug={`blog--${latestBlogPostB.slug}`}
  //               inProgress={latestBlogPostB.inProgress}
  //               $sm
  //             />
  //           }
  //           showYear
  //           small
  //         />
  //       </li>
  //     </ul>
  //   </LatestBlogPost>
  //   <Projects title={'Featured projects'} />
  // </>
}
