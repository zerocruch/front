import React from 'react';
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPages } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";

const Page = ({postId, id, pageToken, type, pagePicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const pages = useSelector((state) => state.user.pages);
  const [pageName, setPageName] = useState(null);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  //let pageName = '';

  const pagedata = async () => {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name&access_token=${pageToken}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    //console.log(data.name);
    return data.name;
  };

  if(pagePicturePath == 'facebook'){
    pagePicturePath += ".png";
    pagedata().then((result) => {
      setPageName(result);
    });
  }else if(pagePicturePath == 'facebook.png'){
    pagedata().then((result) => {
      setPageName(result);
    });
  }
  
  //const isFriend = pages.find((friend) => friend._id === friendId);
  const isFriend = true;

  const handleClick = () => {
    window.location.href = `https://www.facebook.com/profile.php?id=${id}`;
  };

  const patchPage = async () => {
    ;
  }

  //console.log(JSON.stringify({ postID: postId, accessToken: pageToken }));
  const deletePost = async () => {
    const response = await fetch(
      `https://socialsteady.theiomh.repl.co/api/removePost`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postID: postId, accessToken: pageToken }),

      }
    );
    const data = await response.json();
    console.log(data);
    if(data){
      if (data.success == true){
        window.location.reload();
      }else{
        alert('could not delete Item');
      }
    }
    
  }
/*
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setPages({ friends: data }));
  };
*/
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={pagePicturePath} size="55px" />
        <Box onClick={handleClick}>
        
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {pageName ? (pageName) : ('Loading ...')}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {type}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => deletePost()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
          <PersonRemoveOutlined sx={{ color: primaryDark }} />

      </IconButton>

      <IconButton
        onClick={() => patchPage()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {!isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}

      </IconButton>


    </FlexBetween>
  );
};

export default Page;
