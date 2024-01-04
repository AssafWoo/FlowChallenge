const API_URL = "http://rest.flowsec.xyz/"; // Future - move to env variable


// Future - handle errors in a better way.
// Future - create a more generic function to handle all requests.

export const fetchAllPosts = async () => {
  const response = await fetch(`${API_URL}posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const fetchPaginatedPosts = async (page: number, limit: number = 15) => {
  const response = await fetch(`${API_URL}posts?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}users`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchComments = async () => {
  const response = await fetch(`${API_URL}comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const updatePost = async (postId: number, data: any) => {
  const response = await fetch(`${API_URL}posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
};


export const updateUser = async (userId: number, data: any) => {
  // Future - extract payload to own function
  let payload = {};
  const keys = Object.keys(data);
  if (keys.length === 1 && keys[0].includes(".")) {
    const [outerKey, innerKey] = keys[0].split(".");
    const existingDataResponse = await fetch(`${API_URL}users/${userId}`); // Future - keep users data in global state to avoid fetching it again.
    const existingData = await existingDataResponse.json();

    payload = {
      ...existingData,
      [outerKey]: {
        ...existingData[outerKey],
        [innerKey]: data[keys[0]],
      },
    };
  } else {
    payload = data;
  }

  const response = await fetch(`${API_URL}users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};

export const deletePost = async (postId: number) => {
  const response = await fetch(`${API_URL}posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
  return true;
};
