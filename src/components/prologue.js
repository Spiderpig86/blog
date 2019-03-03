import React, { Component }  from 'react';
import FontAwesome from 'react-fontawesome';

import { styles } from '../styles/component-styles/proglogue-styles';

class Prologue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curTagFilter: 'All',
        }
    }
    
    render() {
        return (
            <div 
                className="prologue-component"
                style={ styles.prologueComponent }
            >
                <h1>Blog</h1>
                <p>Writing about whatever comes to mind.</p>
                <div style={ styles.prologueSocial }>
                    <a href="#"><FontAwesome name='github' style={ styles.prologueSocialItem } /></a>
                    <a href="#"><FontAwesome name='linkedin' style={ styles.prologueSocialItem } /></a>
                    <a href="#"><FontAwesome name='medium' style={ styles.prologueSocialItem } /></a>
                    <a href="#"><FontAwesome name='instagram' style={ styles.prologueSocialItem } /></a>
                    <a href="#"><FontAwesome name='globe' style={ styles.prologueSocialItem } /></a>
                </div>

                <div style={ styles.prologueTagContainer }>
                    {
                        this.getTopTags().map((tag, i) => {
                            return (
                                <span
                                    className={ this.state.curTagFilter === tag ? 'tag selected' : 'tag'}
                                    onClick={ () => this.filterPosts(tag) }
                                    style={ styles.prologueTagItem }
                                    key={ i }
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
          keys.sort((a, b) => tagOccurs[b] - tagOccurs[a]);

        return ['All', ...keys.slice(0, 4)];
    }

    filterPosts(tag) {
        this.setState({ curTagFilter: tag });
        this.props.updateSelectedTag(tag);
    }
}

export default Prologue;