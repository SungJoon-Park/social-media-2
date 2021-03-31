import React, { useState } from "react";
import css from "./Post.module.css";
import timespan from "utils/timespan.js";
import publicUrl from "utils/publicUrl.js";
import { Link } from "react-router-dom";




function Post(props) {

  const [comment, setComment] = useState('');
  const [toggleComment, setToggleComment] = useState(false); // hidden initially

  function handleLike() {
    props.onLike(props.post.id);
  }


  function handleSubmitComment(event) {
    props.onComment(props.post.id, comment); // this calls addComment from App.js
    setComment(''); //reset
    setToggleComment(false); //close comment box
    event.preventDefault(); // prevent page refresh
  }

  function handleUnlike() {
    props.onUnlike(props.post.id);
  }

  return (
    <article className={css.post}>
      <header className={css.header}>
        <Link className={css.user} to={`/profile/${props.user.id}`}>
          <img src={publicUrl(props.user.photo)} alt="User Profile" />
          <span>{props.user.id} </span>
        </Link>
      </header>
      <section className={css.content}>
        <div className={css.imgContainer}>
          <img src={publicUrl(props.post.photo)} alt="Post" />
        </div>
      </section>

      <section className={css.actions}>
        <button>
          {props.likes.self ? (
            <img
              onClick={handleUnlike}
              src="https://cdn.glitch.com/f70d577d-f905-45ee-bb92-042bfa767970%2Funlike.svg?v=1614382900439"
              alt="Unlike Action"
            />
          ) : (
            <img
              onClick={handleLike}
              src="https://cdn.glitch.com/f70d577d-f905-45ee-bb92-042bfa767970%2Flike.svg?v=1614382900207"
              alt="Like Action"
            />
          )}
        </button>
        <button onClick={e => setToggleComment(!toggleComment)}>
          <img src={publicUrl('/assets/comment.svg')} alt='Comment Action' />
        </button>
      </section>
      <section className={css.activity}>
        <div className={css.likes}>{props.likes.count} likes</div>
        <div className={css.comments}>
          <div>
            <span>
              <Link className={css.user} to={`/profile/${props.post.userId}`}>
                {props.post.userId}
              </Link>
            </span>
            <span>{props.post.desc}</span>
          </div>
          {props.comments.map((comment, i) => (
            <div key={i}>
              <span>
              <Link className={css.user} to={`/profile/${comment.userId}`}>
                {comment.userId}
                </Link>
              </span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
        <time className={css.time}>
          {timespan(props.post.datetime).toUpperCase()} AGO
        </time>
      </section>
      {toggleComment &&
        <form className={css.addComment} onSubmit={handleSubmitComment}>
          <input type="text" placeholder="Add a comment…" value={comment} onChange={e => setComment(e.target.value)} />
          <button type="submit">Post</button>
        </form>
      }
    </article>

  );
}

export default Post;
