import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import css from "./App.module.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Explore from "./Explore.js";
import NewPost from "./NewPost.js";
import Activity from "./Activity.js";
import Profile from "./Profile.js";
import Navbar from "./Navbar.js";
import initialStore from 'utils/initialStore';
import uniqueId from 'utils/uniqueId'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  //const [page, setPage] = useState('home');
  const [store, setStore] = useState(initialStore);

  function addLike(postId) {
    const like = {
      userId: store.currentUserId,
      postId, // make sure you understand this shorthand syntax
      datetime: new Date().toISOString()
    };

    setStore({
      ...store,// spread props. make sure you understand this
      likes: store.likes.concat(like)
    });
  }

  function removeLike(postId) {
    setStore({
      ...store,// spread props. make sure you understand this
      likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))
    });
  }

  function addComment(postId, text) {
    const comment = {
      userId: store.currentUserId,
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
      comments: store.comments.concat(comment)
    });
  }

  function addPost(photo, desc) {
    // TODO:
    // 1. Create a new post object (use uniqueId('post') to create an id)
    const newPost = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    }
    console.log(photo);
    // 2. Update the store 
    setStore({
      ...store,
      posts: store.posts.concat(newPost)
    })
  }

  function addFollower(userId){
      const follower = {
        userId: userId,
        followerId: store.currentUserId
      };
      setStore({
        ...store,
        followers: store.followers.concat(follower)
      });
  }

  function removeFollower(userId){
    setStore({
      ...store,// spread props. make sure you understand this
      followers: store.followers.filter(follower => !(follower.userId === userId && follower.followerId === store.currentUserId))
    });
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header />
        <main className={css.content}>
          <Switch>
            <Route path='/explore'>
              <Explore store={store} />
            </Route>
            <Route path='/activity'>
              <Activity store={store} />
            </Route>
            <Route path="/newpost">
              <NewPost store={store}
                addPost={addPost}
                />
            </Route>
            <Route path="/profile/:userId?">
              <Profile store={store}
              onFollow={addFollower}
              onUnfollow={removeFollower} />
            </Route>
            <Route path="/:postId?">
              <Home store={store}
                onLike={addLike}
                onUnlike={removeLike}
                onComment={addComment} />
            </Route>
          </Switch>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;