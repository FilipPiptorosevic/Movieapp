import React, { useState } from 'react';
import { Comment, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislike from './LikeDislike';
const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const[CommentValue, setCommentValue] = useState("");
    const[OpenReply, setOpenReply] = useState(false);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const openReply = () => {
        setOpenReply(!OpenReply);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postID: props.postID,
            responseTo: props.comment._id,
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("");
                    setOpenReply(!OpenReply);
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Failed to save comment')
                }
            })
    }

    const deleteMapComment = () => {

        props.CommentLists.map(comment => {
            if(comment._id === props.comment._id) {
                deleteComment();
            }
            if(comment.responseTo === props.comment._id) {
                removeChild();
            }
        })


    }

    const deleteComment = () => {

        const variables = {
            _id: props.comment._id
        }
    
            axios.post('/api/comment/removeComment', variables)
            .then(response => {
                if(response.data.success) {
                    props.removeComment();
                } else {
                    alert('Failed to remove comment');
                }
            })

    }

    const removeChild = () => {

        const variables = {
            responseTo: props.comment._id
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

    const action = [
        <LikeDislike comment commentID={props.comment._id} userID={localStorage.getItem('userId')} />,
        <span onClick={openReply} key='basicReplyTo'>Reply to</span>,
        (user.userData && user.userData.isAdmin) && <span onClick={() => {
            deleteMapComment()
        }}>Delete</span>

    ]

    return (
        <div>
            <Comment 
                actions={action}
                author={props.comment.writer.name + ' ' + props.comment.writer.lastname}
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
        {OpenReply && 
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
            <TextArea
                style={{width: '100%', borderRadius:'5px', marginLeft:'20px'}}
                onChange={handleChange}
                value={CommentValue}
                placeholder="Write here..."                
            />
            <br />
            <Button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</Button>
        </form>
        }
        </div>
    );
}

export default SingleComment;