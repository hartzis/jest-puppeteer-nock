import React from 'react'
import StaticLink from './StaticLink'

const LinkList = ({ pages = [] }) => {
  return (<div data-testid="list">
    {pages.map(link => <StaticLink key={link._id} link={link} />)}
  </div>);
};

export default LinkList
