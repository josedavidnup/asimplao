import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ productValues, setProductValues }) => {
  const { customer } = useSelector((state) => ({ ...state }));
  const FileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadFiles = productValues.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: customer ? customer.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image upload data:", res);
                allUploadFiles.push(res.data);
                setProductValues({ ...productValues, images: allUploadFiles });
              })
              .catch((err) => console.log(err));
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (publid_id) => {
    axios
      .post(
        `/removeimages`,
        { publid_id },
        {
          headers: {
            authtoken: customer ? customer.token : "",
          },
        }
      )
      .then((res) => {
        const { images } = productValues;
        let filteredImages = images.filter((item) => {
          return item.public_id !== publid_id;
        });
        setProductValues({ ...productValues, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={FileUploadAndResize}
          />
        </label>
      </div>
      <div className="row">
        {productValues.images.length > 0 &&
          productValues.images.map((e) => (
            <button
              onClick={() => handleImageRemove(e.public_id)}
              style={{ cursor: "pointer" }}
              key={e.public_id}
            >
              <img
                key={e.public_id}
                src={e.url}
                alt={e.url}
                width={150}
                style={{ borderRadius: 10 }}
                className="ml-3"
              />
            </button>
          ))}
      </div>
    </>
  );
};

export default FileUpload;
