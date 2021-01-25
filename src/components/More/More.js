import React from 'react'
import moment from 'moment'

import { pathPrefix } from '../../../config'
import styles from './More.module.scss'

const More = ({ prev, next }) => (
    <div className={ styles['more'] }>
        <h6 className={ styles['more__title'] }>Suggested Posts</h6>
        <div className={ styles['more__links'] }>
            <MoreLink post={prev} />
            <MoreLink post={next} />
        </div>
    </div>
)

const MoreLink = ({ post }) => {

    let path = ''

    if (post) {
        path = ((post.frontmatter.path.indexOf(pathPrefix) < 0) ? pathPrefix : '') + post.frontmatter.path
    }
    
    return (
        <div className={ styles['morelink'] }>
           {
               post ? (
                    <div>
                        <a href={ `${path}` } className={ styles['morelink__title'] }>{ post.frontmatter.title }</a>
                         <p className={ styles['morelink__subtitle'] }>{ moment(post.frontmatter.date).format('MMMM D, YYYY') }</p>
                        <div>
                            {
                                post.frontmatter.description ? (
                                    <p className={ styles['morelink__description'] }>{ post.frontmatter.description }</p>
                                ) : <p className={ styles['morelink__description'] }>No description available.</p>
                            }
                        </div>
                    </div>
            ) : (
                <h6 className={ styles['morelink__title'] }>Hmm... Looks like you've reached the end.</h6>
            )
           }
        </div>
    )
}

export default More