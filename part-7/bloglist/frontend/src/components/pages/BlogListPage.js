import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initBlogs } from '../../reducers/blogReducer';
import BlogList from '../BlogList';
import BlogForm from '../BlogForm';
import Toggleable from '../Toggleable';

const BlogListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  return (
    <>
      <Toggleable buttonLabel="New blog">
        <BlogForm />
      </Toggleable>
      <BlogList />
    </>
  );
};

export default BlogListPage;
