import React from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Page from "../../components/Page";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";


const PostWidget = ({
  pid,
  pageToken,
  pageId,
  pagePicturePath,
  image,
  video,
  subAtt,
  url,
  likes,
  likesData,
  comments,
  commentsData,
  message,
  created_time,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  //const isLiked = Boolean(likes[loggedInUserId]);
  const isLiked = false;
  //const likeCount = Object.keys(likes).length;
  //const likeCount = postLikes;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  //console.log(image);
  //console.log(video);
  var numberOfComments = 0;

  const patchLike = async () => {
    ;
  }


 /* const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };*/

  return (
    <WidgetWrapper m="2rem 0">
      <Page
        key={pid}
        postId={pid}
        id={pageId}
        pageToken={pageToken}
        type={created_time}
        pagePicturePath={pagePicturePath}
      />

      <Typography color={main} sx={{ mt: "1rem" }}>
        {message}
      </Typography>

      {url && <a key={url} href={url}>{url}</a>}

      


      {!subAtt ? (
        image ? (
            <img
              key={image}
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={image}
              
            />): (<p></p>)

) : (
  subAtt.map((array) => (
    <img
    key={array.media.image.src}
      width="100%"
      height="auto"
      alt="post"
      style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
      src={array.media.image.src}
    />
  ))
)}







    {video && (
        <video controls 
        src={video}
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}>
        <source src={video} type="video/mp4"></source>
        </video>
      )}


{comments ? (comments.map((array)=>{
                numberOfComments+= 1+array.comment_count
            })) : 0}


      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likes}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{numberOfComments}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      
    </WidgetWrapper>
  );
};

export default PostWidget;
