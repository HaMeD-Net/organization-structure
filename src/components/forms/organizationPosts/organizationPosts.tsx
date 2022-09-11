import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Checkbox,
  Row,
  Col,
  Cascader,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { residences } from "../cities";
import { useSelector, useDispatch } from "react-redux";
import { postModal, toastMessage, _postModalFlag } from "../../../redux/treeSlice";
import CollectionCreateForm from "./organizationPostsModal";



const OrganizationPosts: React.FC = () => {
  const _post = useSelector(_postModalFlag);
  const dispatch = useDispatch();
  // const onCreate = (values: any) => {
  //   console.log("Received values of form: ", values);
  //   dispatch(postModal(false));
  // };
  useEffect(() => {
    dispatch(toastMessage(false));
  },[]);
  return (
    <div>
      <CollectionCreateForm
        visible={_post}
        // onCreate={onCreate}
        onCancel={() => {
          dispatch(postModal(false));
        }}
      />
    </div>
  );
};

export default OrganizationPosts;
