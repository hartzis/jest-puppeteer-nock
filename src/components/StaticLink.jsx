import React from 'react'
import { Link } from 'react-router-dom'

const StaticLink = ({ link }) => (
  <div data-testid="link">
    {link.title} <Link to={`/page/${link.path.current}`}>({link.path.current})</Link>
  </div>
)

export default StaticLink
