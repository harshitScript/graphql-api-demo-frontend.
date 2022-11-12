import { Card1 } from "../../../Components/UI/Card";
import { GiAmericanFootballBall } from "react-icons/gi";
import styled from "styled-components";
import Post from "../../../Components/UI/Post";
import usePosts from "../../../hooks/usePosts";
import { NavLink, useParams } from "react-router-dom";

const PostsFeed = ({ pagesCount }) => {
  const { page } = useParams();

  const { posts, postsFetching, postsLoading } = usePosts({
    page,
  });

  const isLoading = postsLoading || postsFetching;

  return isLoading ? (
    <Card1 className="w-3/6 mx-auto mt-10 h-40 grid place-items-center">
      <GiAmericanFootballBall
        size={40}
        color="#ffb7"
        className="animate-bounce"
      />
    </Card1>
  ) : (
    <>
      {pagesCount > 1 ? (
        <PaginationSection title="pages">
          {Array(5)
            .fill("-")
            .map((e, index) => (
              <NavLink
                to={`/posts/${index + 1}`}
                className={({ active }) => (active ? "color-p" : "")}
                key={index}
              >
                {index + 1}
              </NavLink>
            ))}
        </PaginationSection>
      ) : (
        <></>
      )}
      <Card1 className="w-3/6 mx-auto mt-10 max-h-100 overflow-y-auto">
        {posts?.length ? (
          posts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <p className="text-center">Uh oh no post found.</p>
        )}
      </Card1>
    </>
  );
};

const PaginationSection = styled.section`
  width: 30px;
  min-height: 100px;
  background: #ffb7;
  position: fixed;
  z-index: 1;
  left: 0px;
  top: 300px;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  transform: translateX(-20px);
  transition: all 1s ease-out;
  &:hover {
    transform: translateX(0px);
  }
`;

export default PostsFeed;
