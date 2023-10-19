import { List } from "@mantine/core";
import { CommentItem } from "./CommentItem";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { fetchComments } from "../api";

const CommentList = ({ id = "Za45bT41sXg" }) => {
  const {
    isLoading,
    error,
    data: comments,
  } = useQuery(["comments", id], async () => fetchComments(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
