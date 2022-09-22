import React from 'react';
import { Container, FormInputLabel, Input } from './IconInput.style';

const IconInput = ({ handleChange, label, iconType, ...props }) => (
  <Container>
    <Input
      className={props.value.length ? `highlight` : ''}
      {...props}
      onChange={handleChange}
    />
    {label ? (
      <FormInputLabel
        className={
          props.value.length ? `shrink icon-${iconType}` : `icon-${iconType}`
        }
      >
        {label}
      </FormInputLabel>
    ) : null}
  </Container>
);

export default IconInput;