import React, { Component } from 'react'

import './Pagination.scss';

export default class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.currentPage,
      numPages: props.numPages,
      updateSelectedPage: props.updateSelectedPage,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: nextProps.currentPage,
      numPages: nextProps.numPages,
    })
  }

  render() {
    if (!this.state) {
      return <div></div>
    }

    return (
      <div className="pagination">
        <div
          className={`pagination-item short ${
            this.state.currentPage === 0 ? 'disabled' : ''
          }`}
        >
          <a
            className={this.state.currentPage === 0 ? 'disabled' : ''}
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            onClick={(e) => this.state.updateSelectedPage(this.state.currentPage - 1)}
          >
            Prev
          </a>
        </div>
        {[...Array(this.state.numPages).keys()].map((page) => {
          return (
            <div
              className={`pagination-item short ${
                this.state.currentPage === page ? 'selected' : ''
              }`}
              key={page}
            >
              <a
                style={{ cursor: 'pointer', textDecoration: 'none' }}
                onClick={(e) => this.state.updateSelectedPage(page)}
              >
                {page + 1}
              </a>
            </div>
          )
        })}
        <div
          className={`pagination-item short ${
            this.state.currentPage === this.state.numPages - 1 ? 'disabled' : ''
          }`}
        >
          <a
            className={
              this.state.currentPage === this.state.numPages - 1
                ? 'disabled'
                : ''
            }
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            onClick={(e) => this.state.updateSelectedPage(this.state.currentPage + 1)}
          >
            Next
          </a>
        </div>
      </div>
    )
  }
}
