import React from 'react';
import publicUrl from "utils/publicUrl.js";
import css from "./Profile.module.css";
import { Link, useParams } from "react-router-dom";
import PostThumbnail from "./PostThumbnail.js";

function Profile(props) {
  const { store } = props; // retrieve store
  let { userId } = useParams();
  if (!userId){
    userId = store.currentUserId;
  }
  function handleFollow(){
    props.onFollow(userId);
  }
  function handleUnfollow(){
    props.onUnfollow(userId);
  }
  let userData = store.users.filter(d => d.id === userId)[0]
  let posts = store.posts.filter(d=> d.userId === userId)
  let followers = store.followers.filter(d => d.userId === userId)
  let following = store.followers.filter(d => d.followerId === userId)
  let follbool = false;
  let followers2 = followers.map(d=>d.followerId);
  if (followers2.filter(d=>d===store.currentUserId).length>0){
    console.log(followers2.filter(d=>d===store.currentUserId))
    follbool = true;
    //console.log(store.currentUserId);
  }
  return (
    <div>
      <header className={css.user}>
        <img src={publicUrl(userData.photo)} alt="Propic"></img>
        <span>{userData.id} </span>
        {follbool && 
        <div>
          <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button>
          </div>}
          {!follbool && userId != store.currentUserId &&
        <div>
          <button className={css.followBtn} onClick={handleFollow}>Follow</button>
          </div>}
      </header>
      <section className={css.bio}>
        <b>{userData.name}</b>
        <p>{userData.bio}</p>
      </section>
      <section className={css.statsNum}>
        <b>{posts.length}</b>
        <b>{followers.length}</b>
        <b>{following.length}</b>
      </section>
      <section className={css.statsTitles}>
        <p>posts</p>
        <p>followers</p>
        <p>following</p>
      </section>
      <section className={css.posts}>
      {posts.map(post => (
          <Link key={post.id} to={`/${post.id}`}>
            <PostThumbnail post={post} />
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Profile;