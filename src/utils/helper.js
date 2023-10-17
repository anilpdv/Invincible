export function formatViewCount(viewCount) {
  if (viewCount >= 1000000000) {
    return (viewCount / 1000000000).toFixed(1) + "B";
  } else if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + "K";
  } else {
    return viewCount;
  }
}

export function prettifyDescription(description) {
  const lines = description.split("\n");
  const prettifiedLines = [];

  for (const line of lines) {
    if (line.trim() === "") {
      // Skip empty lines
      continue;
    }

    const trimmedLine = line.trim();
    const separatorIndex = trimmedLine.indexOf(":");
    if (separatorIndex !== -1) {
      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      prettifiedLines.push(`${key}: ${value}`);
    } else {
      prettifiedLines.push(line);
    }
  }

  return prettifiedLines.join("\n");
}

export function formatDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
  const seconds = durationInSeconds % 60;
  let duration = "";
  if (hours > 0) {
    duration += `${hours}:`;
  }
  duration += `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return duration;
}
