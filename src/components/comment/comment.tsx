import React from "react";
import { FacebookProvider, Comments } from "react-facebook";

const FacebookComment = () => {
  return (
    <FacebookProvider appId={"895175508526416"}>
      <Comments
        href={'https://www.facebook.com/photo?fbid=658366344372568&set=a.650323801843489'}
      />
    </FacebookProvider>
  );
};

export default FacebookComment;