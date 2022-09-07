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
import { Popconfirm } from "antd";
import React, { useState, useCallback } from "react";
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
        title="Title"
        placement="leftBottom"
        open={open}
        onConfirm={handleOk}
        // okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <p
          key="delete"
          onClick={() => {
            dispatch(changeFlag(true));
            console.log("flag: ", flag);
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
