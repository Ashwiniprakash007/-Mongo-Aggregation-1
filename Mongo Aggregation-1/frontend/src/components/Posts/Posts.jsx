import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [device, setDevice] = useState("");
    const navigate =useNavigate()

  
    const handleAddPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "userId": userId
          },
          body: JSON.stringify({ title, body, device,  }),
        });
        
        if (!response.ok) {
          throw new Error("Failed to add post");
        }
  
        // Reset form fields after successful post addition
        setTitle("");
        setBody("");
        setDevice("");
        alert("Post added successfully");
      } catch (error) {
        console.error("Error adding post:", error);
        alert("Error adding post. Please try again later.");
      }
    };
  return (
    <div>
      <h2>Posts</h2>
      <br />
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <br />
      <input
        type="text"
        placeholder="Device"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
      ></input>
      {/* <select
        value={device}
        onChange={(e) => setDevice(e.target.value)}
      >
        <option value="Mobile">Mobile</option>
        <option value="PC">PC</option>
        <option value="Tablet">Tablet</option>
      </select> */}
      <br />
      <button onClick={handleAddPost}>Add</button>
    </div>
  );
};
export default Posts;
