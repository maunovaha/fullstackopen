import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { initBlogs, likeBlog } from '../../reducers/blogReducer';
import CommentForm from '../CommentForm';

const BlogPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(blog => blog.id === id);

  const handleLikeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    dispatch(likeBlog(blog));
  };

  // The fact that we need to fetch all blogs in order to view details of a single blog
  // seems wrong. Usually we would fetch only single blog information, but this works
  // for now, so lets go with this.
  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initBlogs());
      setLoading(false);
    };
    fetchBlogs();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <Navigate replace to="/404" />;
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <p><a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a></p>
      <p>
        Likes: {blog.likes}{' '}
        <button type="button" onClick={() => handleLikeBlog(blog.id)}>
          Like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.message} (<em>Sent by: {comment.user.name}</em>)</li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;
