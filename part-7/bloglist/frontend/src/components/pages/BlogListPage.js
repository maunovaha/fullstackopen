import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initBlogs } from '../../reducers/blogReducer';
import BlogList from '../BlogList';
import BlogForm from '../BlogForm';
import Toggleable from '../Toggleable';

const BlogListPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  return (
    <>
      <Toggleable buttonLabel="New blog">
        <BlogForm />
      </Toggleable>
      <h2>Blogs</h2>
      <BlogList />
    </>
  );
};

export default BlogListPage;
