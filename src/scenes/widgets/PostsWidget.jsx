import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { array } from 'yup/lib/locale';
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const usr = JSON.parse(useSelector((state) => state.user));
  const pages = useSelector((state) => JSON.parse(usr.pages));



  const getPosts = async () => {

    let data = [];

    for(let page in pages){
      let pagePicturePath = '';
      const response = await fetch(`https://socialsteady.theiomh.repl.co/api/Posts?accessToken=${pages[page].access_token}&pageId=${pages[page].page_id}`, {
        method: "GET",
      });
      if(pages[page].type == 'facebook'){
        pagePicturePath = pages[page].type + ".png";
      }
      data.push([await response.json(), pagePicturePath, pages[page].access_token, pages[page].page_id]);
    }
    
    //const data = await response.json();
    //console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  //get special page posts
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  

  return (
    <>
      {posts.length > 0 &&
        posts.map((array) =>
          array[0].data.map((item) => {
            const attachmentExists = item.attachments;
            var video = null;
            var image = null;
            var subAtt = null;
            var url = null
            if (attachmentExists) {
              if (item.attachments.data[0].media) {
                if (item.attachments.data[0].media.source) {
                  video = item.attachments.data[0].media.source;
                } else if(item.attachments.data[0].media.image.src) {
                  image = item.attachments.data[0].media.image.src;
                  if(item.attachments.data[0].subattachments){
                    if(item.attachments.data[0].subattachments.data){
                      subAtt = item.attachments.data[0].subattachments.data;
                    }
                    
                    //console.log(subAtt);
                  }
                }
              }else if(item.attachments.data[0].url){
                url = item.attachments.data[0].url;
              }
              //console.log(item)
              /*console.log(image);
              console.log(video);
              console.log(subAtt);
              console.log(item.id);*/
      
            }
            return (
              <PostWidget
                key={item.id}
                pid={item.id}
                pageToken={array[2]}
                pageId={array[3]}
                pagePicturePath={array[1]}
                image={image ? image : null}
                video={video ? video : null}
                subAtt={subAtt ? subAtt : null}
                url={url ? url : null}
                likes={item.reactions.summary.total_count}
                likesData={item.reactions.data}
                comments={item.comments ? item.comments.data : []}
                commentsData={item.comments ? item.comments.data : []}
                message={item.message}
                created_time={item.created_time}
              />
            );
          })
        )}
    </>
  );
  
  




  
};

export default PostsWidget;
