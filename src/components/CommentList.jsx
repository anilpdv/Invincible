import { List } from "@mantine/core";
import { CommentItem } from "./CommentItem";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CommentList = ({ id = "Za45bT41sXg" }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  const fetchComments = async (id) => {
    try {
      let url = `https://calm-falls-42516-7348eaa4d02b.herokuapp.com/comments/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    >
      <List>
        <motion.h1
          className="text-white text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Comments
        </motion.h1>
        {comments.map((comment) => (
          <CommentItem
            key={comment.cid}
            id={comment.cid}
            name={comment.author}
            comment={comment.text}
            likes={comment.votes}
            date={comment.time}
            image={comment.photo}
          />
        ))}
      </List>
    </motion.div>
  );
};

export default CommentList;
