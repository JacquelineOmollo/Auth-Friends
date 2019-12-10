import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import ProtectedRoute from "../components/Routers/ProtectedRoute";
import { Router, Redirect } from "react-router";
import FriendsForm from "../components/FriendsForm";
import Friends from "../components/Friends";

const FriendsList = props => {
  const [my_friends, setFriends] = useState([]);

  const theFriends = () => {
    axiosWithAuth()
      .get("/friends/123")
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => console.log(error.response));
  };

  useEffect(() => {
    theFriends();
  }, []);

  const updatesFriends = friend => {
    axiosWithAuth()
      .put(`/friends/${friend.id}`, friend)
      .then(response => {
        setFriends(response.data);
        props.history.push("/friends");
      })
      .catch(error => console.log(error.response));
  };

  const addFriends = friend => {
    axiosWithAuth()
      .post("/friends", friend)
      .then(response => setFriends(response.data))
      .catch(error => console.log(error.response));
  };

  const removeFriends = id => {
    axiosWithAuth()
      .delete(`/friends/${id}`)
      .then(response => setFriends(response.data))
      .catch(error => console.log(error.response));
  };

  return (
    <div>
      <Router
        exact
        path="/friends"
        render={props => <FriendsForm {...props} submit={addFriends} />}
      />
      {my_friends.map(friend => {
        return (
          <Friends
            key={friend.id}
            friend={friend}
            removeFriends={removeFriends}
          />
        );
      })}

      <Router
        path="/friends/edit/:id"
        render={props => {
          console.log(props);

          const oldFriends = my_friends.find(
            friend => friend.id === props.match.params.id
          );

          if (!oldFriends) {
            return <Redirect to="/friends" />;
          }

          return (
            <FriendsForm
              {...props}
              submit={updatesFriends}
              initialValues={oldFriends}
            />
          );
        }}
      />
    </div>
  );
};
export default FriendsList;
