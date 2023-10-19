import { TextInput, ActionIcon, useMantineTheme, rem } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSongsBySearchTerm } from "../api";
import { useSearchStore } from "../store";
import { queryClient } from "../queries";

export function Search(props) {
  const theme = useMantineTheme();
  const { setSongs, setSearchTerm, searchTerm } = useSearchStore(
    (state) => state
  );
  const [value, setValue] = useState(searchTerm ? searchTerm : "");

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(
    ["songs", value],
    () => getSongsBySearchTerm(value),
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  async function handleSearch() {
    await refetch();
    navigate("/search");
  }

  async function refetch() {
    try {
      await queryClient.prefetchQuery(["songs", value], () =>
        getSongsBySearchTerm(value)
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event) {
    setValue(event.currentTarget.value);
    setSearchTerm(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  }

  useEffect(() => {
    async function handleSongsFetched(songs) {
      setSongs(songs);
      setSearchTerm(value);
    }

    if (data) {
      handleSongsFetched(data);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        radius="xl"
        size="md"
        placeholder="Search"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={handleSearch}
            disabled={isLoading}
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
        {...props}
      />
      {error && <div>Error fetching songs</div>}
    </form>
  );
}
