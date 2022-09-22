import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import Icon from '../../../../../../shared/components/Icon/Icon';
import SelectMenu from '../../../../../../shared/components/SelectMenu/SelectMenu';
import { IssueColors } from '../../../../../../shared/constants/issues';
import {
    IconCont, SectionContainer, SectionContent, SectionTitle
} from '../IssueDetail.style';

function Colors({ value, updateTicketField }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <SectionContainer>
      <SectionTitle>Issue color</SectionTitle>
      <SectionContent
        className="icon-angle-down"
        onClick={() => setIsMenuOpen(true)}
      >
        <IconCont>
          <Icon type={`issue-${value.toLowerCase()}`} size={14} top={2} />
        </IconCont>
        {value}
      </SectionContent>
      <SelectMenu
        value={value}
        isActive={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onChange={(option) =>
          updateTicketField({ field: 'issueColor', value: option.value })
        }
        options={Object.values(IssueColors)
          .filter((color) => color.name !== value)
          .map((option) => ({
            key: option.name,
            value: option.name,
          }))}
        renderValue={({ value: color }) => renderList(color)}
      />
    </SectionContainer>
  );
}

const renderList = (color) => {
  return (
    <Fragment>
      <IconCont>
        <Icon type={`issue-${color.toLowerCase()}`} size={14} top={2} />
      </IconCont>
      {color}
    </Fragment>
  );
};

Colors.propTypes = {
  value: PropTypes.string,
  updateTicketField: PropTypes.func.isRequired,
};

export default Colors;