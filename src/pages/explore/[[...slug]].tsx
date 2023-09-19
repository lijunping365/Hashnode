import type { GetServerSideProps, NextPage } from "next";
import { getServerSession, type Session } from "next-auth";
import { ExploreMainBody, Header } from "~/component";
import ExploreSEO from "~/SEO/Explore.seo";
import { authOptions } from "~/server/auth";

const ExplorePage: NextPage = () => {
  return (
    <>
      <ExploreSEO />
      <Header />
      <ExploreMainBody />
    </>
  );
};

export default ExplorePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let session: any = await getServerSession(context.req, context.res, authOptions);
  session = {
    user: {
      id: '1',
      name: 'jackli',
      username: 'jackli',
      email: '123123123',
      image: '',
      handle: {
        name: 'jackli',
      }
    }
  };
  if (
    !session?.user &&
    (context.req.url === "/explore/tags-following" ||
      context.req.url === "/explore/articles-following")
  ) {
    return { props: { session: null }, redirect: { destination: "/" } };
  }

  return {
    props: {
      session: session
        ? (JSON.parse(JSON.stringify(session)) as Session)
        : null,
    },
  };
};
