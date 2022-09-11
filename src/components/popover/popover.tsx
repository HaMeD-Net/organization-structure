import { useSelector, useDispatch } from "react-redux";
import {
  appointmentModal,
  changeFlag,
  mouseCoordinatesX,
  mouseCoordinatesY,
  postModal,
  transferModal,
  treeFlag,
  treeUnitsKey,
  unitModal,
} from "../../redux/treeSlice";
import {DeleteFilled} from "@ant-design/icons"
import { Popconfirm } from "antd";
import React, { useState, useCallback } from "react";
import Strings from "../strings/string";
const PopOver: React.FC = () => {
  const coorX = useSelector(mouseCoordinatesX);
  const coorY = useSelector(mouseCoordinatesY);
  const keys = useSelector(treeUnitsKey);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>();
  // const _mFlag = useSelector(_unitModalFlag);
  const dispatch = useDispatch();

  const showPopconfirm = () => {
    setOpen(true);
  };
  const flag = useSelector(treeFlag);

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(changeFlag(false))

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <aside
      className="popover"
      style={{ left: `${coorX - 205}px`, top: `${coorY}px` }}
    >
      {keys === "organization" || keys === "unit" ? (
        <p
          key="new-unit"
          onClick={() => {
            dispatch(unitModal(true));
            dispatch(changeFlag(false));
          }}
        >
          ایجاد واحد جدید
        </p>
      ) : null}
      {keys !== "post" && (
        <p
          key="new-post"
          onClick={() => {
            dispatch(postModal(true));
            dispatch(changeFlag(false));
          }}
        >
          ایجاد پست جدید
        </p>
      )}
      {keys === "post" && (
        <>
          <p
            key="appointment"
            onClick={() => {
              dispatch(appointmentModal(true));
              dispatch(changeFlag(false));
            }}
          >
            انتصاب/انفصال
          </p>
          <p
            key="transfer"
            onClick={() => {
              dispatch(transferModal(true));
              dispatch(changeFlag(false));
            }}
          >
            انتقال
          </p>
        </>
      )}
      <p key="edit">ویرایش</p>
      <Popconfirm
        title="مورد انتخاب شده حذف شود؟"
        placement="leftBottom"
        open={open}
        onConfirm={handleOk}
        okText={Strings.popConfirm.yes}
        cancelText={Strings.popConfirm.no}
        // okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
        icon={<DeleteFilled />}
        
      >
        <p
          key="delete"
          onClick={() => {
            dispatch(changeFlag(true));
            showPopconfirm();
          }}
        >
          حذف
        </p>
      </Popconfirm>
    </aside>
  );
};

export default PopOver;
