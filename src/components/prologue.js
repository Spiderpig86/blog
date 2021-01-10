import { Link } from 'gatsby'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import { styles } from '../styles/component-styles/proglogue-styles'

class Prologue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curTagFilter: 'All',
    }
  }

  render() {
    return (
      <div className="prologue-component" style={styles.prologueComponent}>
        <h1>Blog</h1>
        <p>Writing about whatever comes to mind.</p>
        <div style={styles.prologueSocial}>
          <a
            className="prologue__social-links"
            href="https://github.com/Spiderpig86"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="github" style={styles.prologueSocialItem} />
          </a>
          <a
            className="prologue__social-links"
            href="https://www.linkedin.com/in/serbis/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="linkedin" style={styles.prologueSocialItem} />
          </a>
          <a
            className="prologue__social-links"
            href="https://medium.com/@serbis"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="medium" style={styles.prologueSocialItem} />
          </a>
          <a
            className="prologue__social-links"
            href="https://www.instagram.com/dammitstan/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="instagram" style={styles.prologueSocialItem} />
          </a>
          <a
            className="prologue__social-links"
            href="http://stanleylim.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="globe" style={styles.prologueSocialItem} />
          </a>
        </div>

        <div className="prologue-tag-container" style={styles.prologueTagContainer}>
          {this.props.blogPosts &&
            this.getTopTags().map((tag, i) => {
              return (
                <span
                  className={
                    this.state.curTagFilter === tag ? 'tag selected' : 'tag'
                  }
                  onClick={() => this.filterPosts(tag)}
                  style={styles.prologueTagItem}
                  key={i}
                >
                  {tag}
                </span>
              )
            })}
          <span className="tag" style={styles.prologueTagItem}>
            <Link to="/tags">More...</Link>
          </span>
        </div>
      </div>
    )
  }

  /**
   * Get the top tags for each post
   */
  getTopTags() {
    let popTags = this.props.blogPosts
      .map((post) => post.node.frontmatter.tags)
      .join(',')
      .split(',')

    let tagOccurs = popTags.reduce((acc, curr) => {
      if (typeof acc[curr] === 'undefined') {
        acc[curr] = 0
      }
      acc[curr] += 1

      return acc
    }, {})

    let keys = Object.keys(tagOccurs)
    keys.sort((a, b) => tagOccurs[b] - tagOccurs[a])

    return ['All', ...keys.slice(0, 3)]
  }

  filterPosts(tag) {
    this.setState({ curTagFilter: tag })
    this.props.updateSelectedTag(tag)
  }
}

export default Prologue
