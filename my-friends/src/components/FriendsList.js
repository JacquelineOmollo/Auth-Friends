import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ProtectedRoute from "../components/Routers/ProtectedRoute";
import { Redirect } from "react-router-dom";
import FriendsForm from "../components/FriendsForm";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  const theFriends = () => {
    axiosWithAuth()
      .get("/friends/123")
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    theFriends();
  }, []);
};

const fixFriends = friend => {
  axiosWithAuth()
    .put(`/friends/${friend.id}`, friend)
    .then(res => {
      setFriends(res.data);
      props.history.push("/friends");
    })
    .catch(err => console.log(err.response));
};

const addFriend = friend => {
  axiosWithAuth()
    .post("/friends", friend)
    .then(res => setFriends(res.data))
    .catch(err => console.log(err.response));
};

const removeFriends = id => {
  axiosWithAuth()
    .delete(`/friends/${id}`)
    .then(res => setFriends(res.data))
    .catch(err => console.log(err.response));
};

return (
  <div>
    <ProtectedRoute
      exact
      path="/friends"
      render={props => <FriendsForm {...props} submit={addFriends} />}
    />

    {friends.map(friend => {
      return (
        <FriendCard
          key={friend.id}
          friend={friend}
          removeFriend={removeFriend}
        />
      );
    })}

    <ProtectedRoute
      path="/friends/edit/:id"
      render={props => {
        console.log(props);

        const oldFriends = friends.find(
          friend => friend.id == props.match.params.id
        );

        if (!oldFriends) {
          return <Redirect to="/friends" />;
        }

        return (
          <FriendsForm
            {...props}
            submit={fixFriends}
            initialValues={oldFriends}
          />
        );
      }}
    />
  </div>
);

export default FriendsList;
