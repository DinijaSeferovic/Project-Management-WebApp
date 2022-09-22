import PropTypes from 'prop-types';
import React from 'react';
import {
    Blanket, Container, Content, ModalContainer, Options, Title, Wrapper
} from './Modal.style';

const Modal = ({
  title,
  modalWidth,
  children,
  renderOptions,
  closeOnBlanket,
}) => {
  return (
    <ModalContainer>
      <Blanket
        onClick={() => {
          if (closeOnBlanket) closeOnBlanket();
        }}
      />
      <Container>
        <Wrapper>
          <Content modalWidth={modalWidth}>
            {title && <Title>{title}</Title>}
            {children}
            <Options>{renderOptions()}</Options>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  );
};

Modal.defaultProps = {
  title: undefined,
  modalWidth: 500,
  renderOptions: () => {},
  children: [],
  closeOnBlanket: undefined,
};

Modal.propTypes = {
  title: PropTypes.string,
  modalWidth: PropTypes.number,
  children: PropTypes.array.isRequired,
  renderOptions: PropTypes.func.isRequired,
};

export default Modal;