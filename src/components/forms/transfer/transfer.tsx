import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toastMessage,
  transferModal,
  _transferFlag,
} from "../../../redux/treeSlice";
import CollectionCreateForm from "./transferModal";

const Transfer: React.FC = () => {
  const _transfer = useSelector(_transferFlag);
  const dispatch = useDispatch();
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(transferModal(false));
  };
  useEffect(() => {
    dispatch(toastMessage(false));
  }, []);
  return (
    <div>
      <CollectionCreateForm
        visible={_transfer}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(transferModal(false));
        }}
      />
    </div>
  );
};

export default Transfer;
