export const fetchSongs = async (country, type) => {
  let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${country}&maxResults=200&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

  if (type !== "Default") {
    url += `&videoCategoryId=${type}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  const data = await response.json();
  return data.items;
};

export const getSongsBySearchTerm = async (value) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/search/${value}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch songs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchComments = async (videoId) => {
  try {
    const response = await fetch(
      `https://calm-falls-42516-7348eaa4d02b.herokuapp.com/comments/${videoId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
