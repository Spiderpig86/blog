import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Sidebar = (props) => (
    <div
        style={{
            border: '2px solid #e6e6e6',
            maxWidth: 960,
            padding: '0.5rem',
            marginBottom: '25px'
        }}
    >
        <strong>{props.title}.</strong> {props.description}
    </div>
)

export default Sidebar;