import React from 'react';
import { Body, Container, Head } from './Table.style';

const TableHead = ({ children }) => <Head className="thead">{children}</Head>;
const TableBody = ({ children }) => <Body className="tbody">{children}</Body>;

const Table = (props) => (
  <Container className="table">{props.children}</Container>
);

Table.Head = TableHead;
Table.Body = TableBody;

export default Table;