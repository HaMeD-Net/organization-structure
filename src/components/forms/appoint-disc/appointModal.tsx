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
  AutoComplete
} from "antd";
import React, { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  appointmentModal,
  toastMessage,
  _appointmentModalFlag,
} from "../../../redux/treeSlice";
import Strings from "../../strings/string";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
  const [appointmentValue, setAppointmentValue] = useState<Value>();
  const [disconnectionValue, setDisconnectionValue] = useState<Value>();
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
  const handleChangePicker = (vals: any) => {
    console.log("vals", vals);
    if (vals.day && vals.year) {
      setAppointmentValue(vals);
    }
  };

  const options: any = [];


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
            values.appointmentDate = appointmentValue;
            values.disconnectionDate = disconnectionValue;
            form.resetFields();
            console.log("values", values);
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
              {/* <AutoComplete
                style={{ width: 200 }}
                options={options}
                placeholder="جستجو..."
                filterOption={(inputValue, option) =>
                  option!.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              /> */}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...tailLayout} name="active" valuePropName="checked">
              <Checkbox>پست پیش فرض</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8} className="datePickerFa">
            <label>تاریخ انتصاب</label>
            <DatePicker
              value={appointmentValue}
              onChange={setAppointmentValue}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />
          </Col>
          <Col span={8} className="datePickerFa">
            <label>تاریخ انفصال</label>
            <DatePicker
              value={disconnectionValue}
              onChange={setDisconnectionValue}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />
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
