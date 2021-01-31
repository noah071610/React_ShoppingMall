import { Typography, Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Axios from "axios";
import React, { useState } from "react";
import useInput from "../../../hooks/useInput";
import FileUpload from "../../utils/FileUpload";

const { Title } = Typography;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [TitleValue, onTitleChange] = useInput("");
  const [DescriptionValue, onDescriptionChange] = useInput("");
  const [PriceValue, onPriceChange] = useInput(0);
  const [ContinentValue, onContinentsSelectChange] = useInput(1);
  const [Images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    };

    Axios.post("/api/product", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
