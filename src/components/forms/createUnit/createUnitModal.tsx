import { Cascader, Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFlag,
  toastMessage,
  unitModal,
  _toastFlag,
  _unitModalFlag,
} from "../../../redux/treeSlice";
import { residences } from "../cities";
import { notification, Space } from "antd";
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

  //   const _tFlag = useSelector(_toastFlag);
  const dispatch = useDispatch();
  const _uModal = useSelector(_unitModalFlag);
  const tailLayout = {
    wrapperCol: { offset: 1, span: 16 },
  };
  useEffect(() => {
    // dispatch(toastMessage(false));
    form.resetFields();
  }, []);

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
      title={Strings.unitModal.title}
      okText={Strings.Modal.okText}
      cancelText={Strings.Modal.cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            dispatch(toastMessage(false));
            openNotificationWithIcon("success");
            dispatch(unitModal(false));
            console.log("createUnitModal rendered!")
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
              label="واحد والد"
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
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
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <FormItem
              {...tailLayout}
              name="title"
              label="عنوان"
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...tailLayout}
              name="code"
              label="کد"
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...tailLayout} name="scope" label="حوزه کاری واحد">
              <Checkbox.Group>
                <Row>
                  <Col span={24} style={{ direction: "rtl" }}>
                    <Checkbox value="A" style={{ lineHeight: "32px" }}>
                      <span>A</span>
                    </Checkbox>
                  </Col>
                  <Col span={24} style={{ direction: "rtl" }}>
                    <Checkbox value="B" style={{ lineHeight: "32px" }} disabled>
                      <span>B</span>
                    </Checkbox>
                  </Col>
                  <Col span={24} style={{ direction: "rtl" }}>
                    <Checkbox value="C" style={{ lineHeight: "32px" }}>
                      <span>C</span>
                    </Checkbox>
                  </Col>
                  <Col span={24} style={{ direction: "rtl" }}>
                    <Checkbox value="D" style={{ lineHeight: "32px" }}>
                      <span>D</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </FormItem>
          </Col>

          <Col span={12}>
            <Form.Item
              {...tailLayout}
              name="unit-type"
              label="نوع واحد"
              rules={[
                {
                  required: false,
                  message: `${Strings.required.message}`,
                  type: "string",
                },
              ]}
            >
              <Select>
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...tailLayout}
              name="work-section"
              label="قسمت کاری واحد"
              rules={[
                {
                  required: false,
                  message: `${Strings.required.message}`,
                  type: "string",
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
              name="Cities"
              label="محل جغرافیایی"
              rules={[
                {
                  type: "array",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <FormItem
              {...tailLayout}
              name="address"
              label="نشانی"
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Input type="textarea" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...tailLayout}
              name="phone"
              label="تلفن"
              rules={[
                {
                  type: "string",
                  required: false,
                  message: `${Strings.required.message}`,
                },
              ]}
            >
              <Input />
            </FormItem>
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

export default CollectionCreateForm;
