import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeePost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  function handlePageChange() {
    navigate("/add-posts");
  }

   // Function to handle deletion of a post
   const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Remove the deleted post from the state
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            userId: userId,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

   // Function to handle updating a post
   const handleUpdatePost = (postId) => {
    // Navigate to the update post page
    navigate(`/posts/update/${postId}`);
  };


  return (
    <div>
      <h2>User Posts</h2>
      <button onClick={handlePageChange}>Add Posts</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {posts.map((post, index) => (
          <div
            style={{
              border: "1px solid",
            }}
            key={index}
          >
            <h3>Name:- {post.title}</h3>
            <p>Body:- {post.body}</p>
            <p>Device:- {post.device}</p>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            <button onClick={() => handleUpdatePost(post._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeePost;
