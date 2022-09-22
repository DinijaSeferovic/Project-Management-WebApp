import PropTypes from 'prop-types';
import React from 'react';
import {
    Blanket, Container, Content, ModalContainer, Options, Title, Wrapper
} from '../Modal.style';

const FormModal = ({
  title,
  modalWidth,
  handleSubmit,
  children,
  renderOptions,
}) => {
  return (
    <ModalContainer>
      <Blanket />
      <Container>
        <Wrapper>
          <Content modalWidth={modalWidth}>
            {title && <Title>{title}</Title>}
            <form onSubmit={handleSubmit}>
              {children}
              <Options>{renderOptions()}</Options>
            </form>
          </Content>
        </Wrapper>
      </Container>
    </ModalContainer>
  );
};

FormModal.propTypes = {
  closeModal: PropTypes.func,
};

export default FormModal;