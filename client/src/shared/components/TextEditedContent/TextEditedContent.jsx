import PropTypes from 'prop-types';
import React from 'react';
import { Container, Content, Placeholder } from './TextEditedContent.style';

const TextEditedContent = ({ content, onClick, ...props }) => {
  return (
    <Container className="ql-snow" onClick={onClick}>
      {!content.length > 0 || content === '<p><br></p>' ? (
        <Placeholder {...props}>Add a description...</Placeholder>
      ) : (
        <Content
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
          {...props}
        />
      )}
    </Container>
  );
};
TextEditedContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TextEditedContent;