import React from "react";
import { Link } from "react-router-dom";

const Friends = ({ friend, removeFriend }) => {
  return (
    <div>
      {friend.name} {friend.email} {friend.age}
      <button onClick={() => removeFriend(friend.id)}>Delete</button>
      <Link to={`/friends/edit/${friend.id}`}>Edit</Link>
    </div>
  );
};

export default Friends;
