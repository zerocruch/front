import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import Page from "../../components/Page";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPages } from "../../state";

const PageListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const usr = JSON.parse(useSelector((state) => state.user));
  const pages = useSelector((state) => JSON.parse(usr.pages));



  const getPages = async () => {
    dispatch(setPages({ pages: pages }));
  };

  useEffect(() => {
    getPages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Pages List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">

      {pages.map((page) => (
          <Page
            key={page.id}
            id={page.page_id}
            pageToken={page.access_token}
            type={page.type}
            pagePicturePath={page.type}
            
          />
        ))}
        


      </Box>
    </WidgetWrapper>
  );
};

export default PageListWidget;
