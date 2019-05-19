import React from 'react'
import moment from 'moment'
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

const MoreLink = (props) => {

    console.log(props)
    const post = props.post
    
    return (
        <div className={ styles['morelink'] }>
           {
               post ? (
                    <div>
                        <a href={ `${post.frontmatter.path}` } className={ styles['morelink__title'] }>{ post.frontmatter.title }</a>
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