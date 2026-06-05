import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function BlogDashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const addBlog = async () => {
    try {
      await API.post("/blogs", { title, content });
      setTitle("");
      setContent("");
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const updateBlog = async () => {
    try {
      await API.put(`/blogs/${editingId}`, { title, content });
      setEditingId(null);
      setTitle("");
      setContent("");
      getBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>

      <div className="nav-group">
        <button onClick={() => navigate("/")}>Back to Tasks</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="blog-textarea"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        {editingId ? (
          <button onClick={updateBlog}>Update Blog</button>
        ) : (
          <button onClick={addBlog}>Add Blog</button>
        )}
      </div>

      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <div>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
            </div>
            <div className="btn-group">
              <button onClick={() => editBlog(blog)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogDashboard;
