import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';


function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        props.CommentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentID) {
                commentNumber++;
            }
        })

        setChildCommentNumber(commentNumber);
    }, [props.CommentLists, props.parentCommentID])

    let renderReplyComment = (parentCommentID) => 
            props.CommentLists.map((comment, index) => (
                   <React.Fragment>
                       {comment.responseTo === parentCommentID && 
                            <div style={{width:'80%', marginLeft:'20px'}}>
                                <SingleComment comment={comment} postID={props.postID} refreshFunction={props.refreshFunction} removeComment={props.removeComment}/>
                                <ReplyComment CommentLists={props.CommentLists} postID={props.postID} refreshFunction={props.refreshFunction} parentCommentID={comment._id} removeComment={props.removeComment} />
                            </div>
                       }
                </React.Fragment>
            ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>
            {ChildCommentNumber > 0 && 
                 <p style={{fontSize:'14px', margin:0, color:'gray'}} onClick={handleChange}><a style={{color:'black'}}>View {ChildCommentNumber} more comment(s)</a></p>
            }

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentID)
            }
            
        </div>
    );
}

export default ReplyComment;