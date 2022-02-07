import styled from "styled-components";
import { Form, Input, Button, Select } from "antd";
import { PageHero } from "../components";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AddAuction = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [prePrice, setPrePrice] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [cate, setCate] = useState();
  const [shipping, setShipping] = useState(true);
  const [form] = Form.useForm();

  const AddAuction = () => {
    // event.preventDefault();

    const AddAuctionPost = async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("des", description);
      formData.append("content", content);
      formData.append("pre_price", prePrice);
      formData.append("last_price", lastPrice);
      formData.append("cate", cate);
      // formData.append("avatar",avatar.current);

      try {
        await axios.post("http://127.0.0.1:8000/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        history.push("/DangNhap");
      } catch (err) {
        console.log(err);
      }
    };
    AddAuctionPost();
  };

  const onShippingChange = (value) => {
    switch (value) {
      case "yes":
        form.setFieldsValue({
          note: "Free ship",
        });
        return;

      case "no":
        form.setFieldsValue({
          note: "None free ship",
        });
    }
  };

  const onActiveChange = (value) => {
    switch (value) {
      case "yes":
        form.setFieldsValue({
          note: "Active",
        });
        return;

      case "no":
        form.setFieldsValue({
          note: "None Active",
        });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <main>
      <PageHero title="AddAuction" />
      <Wrapper className="content">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={AddAuction}
        >
          <Form.Item
            value={name}
            name="name"
            label="name"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            value={description}
            name="description"
            label="description"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            value={content}
            name="content"
            label="content"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setContent(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            value={prePrice}
            name="pre_price"
            label="pre_price"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setPrePrice(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            value={lastPrice}
            name="last_price"
            label="last_price"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setLastPrice(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            value={cate}
            name="cate"
            label="cate"
            rules={[{ required: true }]}
          >
            <Input
              className="input"
              onChange={(event) => setCate(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Shipping"
            label="Shipping"
            rules={[{ required: true }]}
          >
            <Select
              className="input"
              placeholder="Select a option and change input text above"
              onChange={onShippingChange}
              allowClear
            >
              <Option value="yes">yes</Option>
              <Option value="no">no</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input className="input" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item name="active" label="active" rules={[{ required: true }]}>
            <Select
              className="input"
              placeholder="Select a option and change input text above"
              onChange={onActiveChange}
              allowClear
            >
              <Option value="yes">yes</Option>
              <Option value="no">no</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input className="input" />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </main>
  );
};
export default AddAuction;

const Wrapper = styled.section`
  .content {
    padding: 50px;
    width: 90vw;
    max-width: "1060px";
    margin: 0 auto;
  }
  .information {
    letter-spacing: var(--spacing);
  }
  .input {
    width: 25rem;
    padding: 0.2rem;
    border-radius: var(--radius);
    border-color: var(--clr-black);
  }
  .submit-btn {
    border-radius: var(--radius);
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
    margin-left: 45%;
    background: var(--clr-primary-10);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
`;
