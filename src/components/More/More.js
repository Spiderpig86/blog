import React from 'react'
import styles from './More.module.scss'

const More = ({ prev, next }) => (
    <div className={ styles['more'] }>
        <h4 className={ styles['more__title'] }>Suggested Posts</h4>
        <div className={ styles['more__links'] }>
            <MoreLink post={prev} />
            <MoreLink post={next} />
        </div>
    </div>
)

const MoreLink = ({ post }) => (
    <div className={ styles['morelink'] }>
       {
           post ? (
                <div>
                    <a href={ post.frontmatter.path }><span className={ styles['morelink__title'] }>{ post.frontmatter.title }</span></a>
                     <p><span className={ styles['morelink__subtitle'] }>{ post.frontmatter.date }</span></p>
                    <div>
                        {
                            post.frontmatter.description ? (
                                <p>{ post.frontmatter.description }</p>
                            ) : null
                        }
                    </div>
                </div>
        ) : (
            <h6>Hmm... Looks like you've reached the end.</h6>
        )
       }
    </div>
)

export default More