import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdatePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [device, setDevice] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const postData = await response.json();
        setPost(postData);
        setTitle(postData.title);
        setBody(postData.body);
        setDevice(postData.device);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/posts/update/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, device }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      console.log("Post updated successfully");
      alert("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Update Post</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body"></textarea>
      <input type="text" value={device} onChange={e => setDevice(e.target.value)} placeholder="Device" />
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
};

export default UpdatePostPage;
