import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  unitModal,
  _toastFlag,
  _unitModalFlag,
  toastMessage,
} from "../../../redux/treeSlice";
import Strings from "../../strings/string";
import CollectionCreateForm from "./createUnitModal";


const CreateUnit: React.FC = () => {
  const _mFlag = useSelector(_unitModalFlag);
  // const _tFlag = useSelector(_toastFlag);
  const dispatch = useDispatch();
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(unitModal(false));
  };
  // useEffect(() => {
  //   dispatch(toastMessage(false));
  // },[]);

  const toast = {
    message: Strings.Toast.message,
    type: 'succcess',
  };


  return (
    <div>
      {/* {_tFlag && <ToastMessage {...toast} />} */}
      <CollectionCreateForm
        visible={_mFlag}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(unitModal(false));
          dispatch(toastMessage(false));
        }}
      />
    </div>
  );
};

export default CreateUnit;
