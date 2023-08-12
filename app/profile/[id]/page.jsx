"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts?visibility=public`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  const publicUserPosts = userPosts.filter(post => post.visibility === 'public');

  return (
    <Profile
      name={userName}
      desc={`Explore the World of ${userName}: Dive into ${userName}'s Profile to Discover some amazing Code Snippets `}
      data={publicUserPosts}
    />
  );
};

export default UserProfile;