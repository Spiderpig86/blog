import React, { Component }  from 'react';
import Counter from '../helpers/counter';

class Prologue extends Component {
    
    render() {
        return (
            <div style={{
                padding: '2rem 4rem',
                textAlign: 'center',
            }}>
                <h1>Blog</h1>
                <p>Writing about whatever comes to mind.</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    {
                        // this.getTopTags().map(tag => {
                        //     <li>tag</li>
                        // })
                    }
                    {
                        this.getTopTags()}
                </div>
            </div>
        );
    }

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

        return keys;
    }
}

export default Prologue;