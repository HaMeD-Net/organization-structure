import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentModal,
  toastMessage,
  _appointmentModalFlag,
} from "../../../redux/treeSlice";
import FormDatePicker from "../../datePicker/datePicker";
import Strings from "../../strings/string";

type Day = {
  day: number;
  month: number;
  year: number;
};

interface Values {
  post: string;
  personnel: string;
  active: boolean;
  appDate: Day;
  discDate: Day;
  description: string;
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

  const dispatch = useDispatch();
  const _appointment = useSelector(_appointmentModalFlag);

  const tailLayout = {
    wrapperCol: { offset: 1, span: 16 },
  };

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: null,
      description: `${Strings.Toast.message}`,
      duration: 3,
    });
  };

  useEffect(() => {
    dispatch(toastMessage(false));
    form.resetFields();
  }, [_appointment]);

  return (
    <Modal
      visible={visible}
      title={Strings.appointModal.title}
      okText={Strings.Modal.okText}
      cancelText={Strings.Modal.cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            form.resetFields();
            onCreate(values);
            dispatch(toastMessage(true));
            openNotificationWithIcon("success");
            dispatch(appointmentModal(false));
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
          <Col span={8}>
            <Form.Item
              {...tailLayout}
              name="post"
              label="پست"
              rules={[
                {
                  required: true,
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
          <Col span={8}>
            <Form.Item
              {...tailLayout}
              name="personnel"
              label="پرسنل"
              rules={[
                {
                  required: true,
                  message: `${Strings.required.message}`,
                  type: "string",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...tailLayout} name="active" valuePropName="checked">
              <Checkbox>پست پیش فرض</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <FormItem
              {...tailLayout}
              name="appDate"
              label="تاریخ انتصاب"
              rules={[
                {
                  required: true,
                  message: `${Strings.required.message}`,
                  type:"date"
                },
              ]}
            >
              <FormDatePicker />
            </FormItem>
          </Col>
          <Col span={12}>
            <Form.Item
              {...tailLayout}
              name="discDate"
              label="تاریخ انفصال"
              rules={[
                {
                  required: true,
                  message: `${Strings.required.message}`,
                  type: "string",
                },
              ]}
            >
              <FormDatePicker />
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
