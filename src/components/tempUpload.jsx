import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
const TempUpload = () => {
  const channelId = "UCyhE_KITB2vQXc4feR0sKf";

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("video", event.target.video.files[0]);
    formData.append("title", event.target.title.value);
    formData.append("channelID", channelId);
    formData.append("Category", event.target.category.value);
    formData.append("Description", event.target.Description.value);

    axios
      .post("http://54.82.119.53:5573/transcode", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handlechange(event) {
    console.log({ [event.target.name]: event.target.value });
  }

  return (
    <div className='dashboard'>
      <div className='leftNav--and--mainpage'>
        <div>leftNAv</div>
        <div className='mainpage'>
          <form onSubmit={handleSubmit} encType='multipart/form-data' className='dashboard--form'>
            <label htmlFor='video'>Upload video</label>
            <input type='file' name='video' id='video' />
            <input type='file' name='thumbnail' />
            <input type='text' name='title' />
            <input type='text' name='category' />
            <textarea
              name='Description'
              type='text'
              onChange={handlechange}
              rows='5'
              className='description--input'
              style={{ resize: "none" }}
            ></textarea>
            <button>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TempUpload;
