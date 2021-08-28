import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';
import axios from 'axios';


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

        
        //removeChild();
        
    }, [props.CommentLists, props.parentCommentID])

    const removeChild = () => {

        const variables = {
            responseTo: props.parentCommentID
        }

        axios.post('/api/comment/removeChildComment', variables)
        .then(response => {
            if(response.data.success) {
                props.removeComment();
            } else {
                alert('Failed to remove comment');
            }
        })
    }

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