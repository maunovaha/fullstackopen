const BlogForm = ({ title, author, url, onChangeTitle, onChangeAuthor, onChangeUrl, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title" style={{ display: 'block' }}>Title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => onChangeTitle(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="author" style={{ display: 'block' }}>Author</label>
        <input type="text" name="author" id="author" value={author} onChange={(e) => onChangeAuthor(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="url" style={{ display: 'block' }}>Url</label>
        <input type="text" name="url" id="url" value={url} onChange={(e) => onChangeUrl(e.target.value)} />
      </div>
      <input type="submit" value="Create" />
    </form>
  );
};

export default BlogForm;