import React, { Component }  from 'react';
import Counter from '../helpers/counter';

import { styles } from '../styles/proglogue-styles';
import { INSPECT_MAX_BYTES } from 'buffer';

class Prologue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curTagFilter: 'All',
        }
    }
    
    render() {
        return (
            <div style={ styles.prologueComponent }>
                <h1>Blog</h1>
                <p>Writing about whatever comes to mind.</p>

                <div style={ styles.prologueTagContainer }>
                    <span style={ styles.prologueTagItem }>All</span>
                    {
                        this.getTopTags().map(tag => {
                            return (
                                <span
                                    className={ this.state.curTagFilter === tag ? 'tag selected' : 'tag'}
                                    style={ styles.prologueTagItem }
                                >
                                    { tag }
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    /**
     * Get the top tags for each post
     */
    getTopTags() {
        let popTags = this.props.blogPosts
                        .map(post => post.node.frontmatter.tags)
                        .join(',')
                        .split(',');

        let tagOccurs = popTags.reduce((acc, curr) => {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
          
            return acc;
          }, {});

          let keys = Object.keys(tagOccurs);
          keys.sort((a, b) => tagOccurs[a] - tagOccurs[b]);

        return keys.slice(0, 5);
    }

    filterPosts(tag) {

    }
}

export default Prologue;