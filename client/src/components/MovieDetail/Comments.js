import React, { useState } from 'react';
import {Button, Input} from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;


function Comments(props) {

    const user = useSelector(state => state.user);
    const removeComment = props.updateRemovedComment;
    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first.');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postID: props.postID
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setComment("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Failed to save comment');
                }
            })
    }


    return (
        <div>
            <br />
            <h3>Comments</h3>
            <hr />

            {props.CommentLists &&
             props.CommentLists.map((comment, index) => (
                 (!comment.responseTo && 
                    <React.Fragment>
                     <SingleComment comment={comment} postID={props.postID} refreshFunction={props.refreshFunction} removeComment={removeComment} />
                     <ReplyComment CommentLists={props.CommentLists} postID={props.postID} refreshFunction={props.refreshFunction} parentCommentID={comment._id} removeComment={removeComment}/>
                 </React.Fragment>)
             ))}

             <br />

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius:'5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write here..."                
                />
                <br />
                <Button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    );
}

export default Comments;