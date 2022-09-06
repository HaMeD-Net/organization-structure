import { Checkbox, Col, Form, Input, Modal, notification, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import useSelection from "antd/lib/table/hooks/useSelection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postModal, toastMessage, _postModalFlag } from "../../../redux/treeSlice";
import Strings from "../../strings/string";

interface Values {
    title: string;
    description: string;
    modifier: string;
  }
  
  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
  }
  
  const { Option } = Select;
  
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
  
const dispatch = useDispatch()
const _pModal = useSelector(_postModalFlag)
    const tailLayout = {
      wrapperCol: { offset: 1, span: 16 },
    };
  
    useEffect(() => {
        dispatch(toastMessage(false));
        form.resetFields();
      }, [_pModal]);
    
      type NotificationType = "success" | "info" | "warning" | "error";
    
      const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
          message: null,
          description: `${Strings.Toast.message}`,
          duration: 3,
        });
      };


    return (
      <Modal
        visible={visible}
        title={Strings.postModal.title}
        okText={Strings.Modal.okText}
        cancelText={Strings.Modal.cancelText}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              dispatch(toastMessage(true));
              openNotificationWithIcon("success");
              dispatch(postModal(false));
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Row gutter={[12, 12]} style={{ alignItems: "end", direction: "rtl" }}>
            <Col span={12}>
              <Form.Item
                {...tailLayout}
                name="unit-parent"
                label="واحد مربوطه"
                rules={[
                  {
                    required: true,
                    message: `${Strings.required.message}`,
                    type: "array",
                  },
                ]}
              >
                <Select>
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...tailLayout}
                name="sort"
                label="ترتیب نمایش"
                rules={[{ required: true, message: `${Strings.required.message}`}]}
              >
                <Input />
              </Form.Item>
            </Col>
  
            <Col span={12}>
              <FormItem
                {...tailLayout}
                name="title"
                label="عنوان"
                rules={[{ required: true, message: `${Strings.required.message}` }]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...tailLayout}
                name="code"
                label="کد"
                rules={[{ required: true, message: `${Strings.required.message}`}]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <Form.Item
                {...tailLayout}
                name="unit-type"
                label="نوع پست"
                rules={[
                  {
                    required: true,
                    message: `${Strings.required.message}`,
                    type: "array",
                  },
                ]}
              >
                <Select>
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...tailLayout} name="active" valuePropName="checked">
                <Checkbox>فعال</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24} className="description">
              <Form.Item {...tailLayout} name="description" label="توضیحات">
                <TextArea rows={5} style={{ marginRight: 10 }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };

  export default CollectionCreateForm