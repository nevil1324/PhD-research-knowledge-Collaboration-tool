import React, { useState, useEffect } from "react";
import './SearchResult.css'
import axios from "axios";

const SearchResult = ({ obj, bookmarks, parentCallback }) => {

  const [newComment, setNewComment] = React.useState("")
  const [cardComments, setCardComments] = React.useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [updatedComments, setUpdatedComments] = useState(cardComments.map(() => ''));
  const [prevComments, setPrevComments] = React.useState([]);

  useEffect(() => {
    var emailId = sessionStorage.getItem('userLoggedIn')

    var baseURL = `http://localhost:8080/bookmark/get/${emailId}/${obj.id}`;
    axios.get(baseURL, { givenId: obj.id }).then(res => {
      if (res.data.comments.length != 0) {
        var ans = res.data.comments;
        for (const comment of ans) {
          setCardComments(prev => [...prev, comment]);
          setPrevComments(prev => [...prev, comment])
        }
      }


    })
  }, [])

  const addComment = () => {
    if (newComment) {
      axios.post("http://localhost:8080/comment/add", {
        'emailId': sessionStorage.getItem('userLoggedIn'),
        'paperId': obj.id,
        'comment': newComment,
        'category': obj.categories
      }, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      setCardComments([...cardComments, newComment]);
      setNewComment('');
    }

  }
  const addBookMark = () => {
    axios.post("http://localhost:8080/bookmark/add", {
      'emailId': sessionStorage.getItem("userLoggedIn"),
      'paperId': obj.id
    }).then(res => { })
      .catch(err => { console.log(err) })
    setIsBookmarked(true);
  }

  const removeBookMark = () => {
    axios.post("http://localhost:8080/bookmark/delete", {
      'emailId': sessionStorage.getItem("userLoggedIn"),
      'paperId': obj.id
    }).then(res => {
      console.log(res);
      window.location.reload();
    })
      .catch(err => { console.log(err) })
    setIsBookmarked(false);
  }

  const showGraph = (event) => {
    parentCallback(
      obj
    );
    event.preventDefault();
  }

  const handleDeleteComment = async (index) => {
    const deletedComment = cardComments[index];
    var emailId = sessionStorage.getItem('userLoggedIn')

    try {
      const response = await fetch('http://localhost:8080/comment/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailId: emailId, commentText: deletedComment }),
      });

      if (response.ok) {
        const updatedComments = [...cardComments];
        updatedComments.splice(index, 1)

        setCardComments(updatedComments);
      }
      else {
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (index, value) => {
    const newUpdatedComments = [...cardComments];
    newUpdatedComments[index] = value;
    setCardComments(newUpdatedComments);
  };

  const toggleTextField = async (i) => {
    const btn = document.getElementById("btn" + obj.id + i.toString());
    btn.disabled = !btn.disabled;

    if (btn.disabled) {
      try {
        const emailId = sessionStorage.getItem('userLoggedIn');
        const commentText = prevComments[i];


        const response = await fetch('http://localhost:8080/comment/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailId: emailId,
            commentText: commentText,
            updatedCommentText: cardComments[i],
          }),
        });

        if (response.ok) {
          const newUpdatedComments = [...updatedComments];
          newUpdatedComments[i] = '';
          setUpdatedComments(newUpdatedComments);
          setPrevComments(cardComments);
        } else {
          console.error('Failed to update comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };


  return (
    <div className="paper-detail">
      <div className="title-parent">
        <h6 class="title">Title: {obj.title.replaceAll("\\n", "")}</h6> &nbsp;
        <div class="image-container">
          <img src="/icons/network1.png" className="graph_image" alt="graph" onClick={showGraph} />

          {!bookmarks && (
            <img className="bookmark_image" src={isBookmarked ? "/icons/filled_bookmark.svg" : "/icons/hollow_bookmark.svg"} alt="bookmark" onClick={isBookmarked ? removeBookMark : addBookMark} />

          )}
          {bookmarks && (
            <img className="bookmark_image" src="/icons/filled_bookmark.svg" alt="bookmark" onClick={isBookmarked ? addBookMark : removeBookMark} />

          )}
        </div>
      </div>
      <hr />
      <div className="author-doi-container">
        <p className="authors">
          <strong>Authors: </strong>
          {obj.authors.replaceAll("\\n", "")}          </p>
        <p className="doi">
          <strong>DOI: </strong>
          <a href={`https://www.doi.org/${obj.doi}`} target="_blank">
            {obj.doi}
          </a>
        </p>
      </div>
      <div className="abstract-container" style={bookmarks ? { height: '300px' } : { height: '400px' }}>
        <p className="abstract">
          <strong>Abstract:</strong>
          {obj.abstract.replaceAll("\\n", "")}
        </p>
        <hr />
        <div className="comments">
          <p style={{ marginBottom: '6px', fontWeight: '500', fontSize: '16px' }}>Comments :</p>
          {cardComments.map((comment, index) => (
            <div className="comment-container" key={index}>
              <textarea
                className="comment-text"
                type="text"
                value={cardComments[index]}
                id={"btn" + obj.id + index.toString()}
                onChange={(e) => handleInputChange(index, e.target.value)} disabled
              />
              <div className="edit-btns">
                <img
                  src="../../../icons/edit.png"
                  alt="Modify"
                  onClick={() => toggleTextField(index)}
                />
                <img
                  src="../../../icons/delete.png"
                  alt="Delete"
                  onClick={() => handleDeleteComment(index)}
                  className="delete-icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="comment-input">
        <textarea
          name="comment"
          className="comment"
          cols="20"
          rows="2"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="button" className="comment-btn" onClick={addComment}>Add</button>
      </div>
    </div>
  );
}
export default SearchResult

