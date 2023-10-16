import { TextInput, ActionIcon, useMantineTheme, rem } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { useSearchStore } from "../store";
import { useNavigate } from "react-router-dom";

export function Search(props) {
  const theme = useMantineTheme();
  const { setSongs, setSearchTerm, searchTerm } = useSearchStore(
    (state) => state
  );
  const [value, setValue] = useState(searchTerm ? searchTerm : "");

  const navigate = useNavigate();
  async function fetchSongs() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/search/` + value
      );
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      console.log(data);
      setSongs(data);
      setSearchTerm(value);
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={() => {
            console.log("Search");
            fetchSongs();
          }}
        >
          <IconArrowRight
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      }
      {...props}
    />
  );
}
