import { Text, Avatar } from "@mantine/core";
import { IconThumbUp } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function CommentItem({ id, name, comment, likes, date, image }) {
  return (
    <div className="p-3 text-white">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        <Avatar src={image} alt={name} radius="xl" />
        <div className="ml-3 mb-1">
          <Text size="sm" fw={900}>
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {date}
          </Text>
        </div>
      </motion.div>
      <motion.p
        className="pl-14 pb-2 text-sm font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      >
        {comment}
      </motion.p>
      <motion.div
        className="flex items-center pl-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      >
        <IconThumbUp size={20} color="gray" />
        <Text size="xs" c="dimmed" pl={5}>
          {likes}
        </Text>
      </motion.div>
    </div>
  );
}
