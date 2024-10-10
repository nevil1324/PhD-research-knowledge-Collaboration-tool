/*create a folder mathjax*/
import React, { useEffect } from 'react';

const MathJaxComponent = ({ content }) => {
  useEffect(() => {
    window.MathJax && window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MathJaxComponent;