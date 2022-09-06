import { useSelector, useDispatch } from "react-redux";
import {
  appointmentModal,
  mouseCoordinatesX,
  mouseCoordinatesY,
  postModal,
  treeUnitsKey,
  unitModal,
} from "../../redux/treeSlice";

const PopOver: React.FC = () => {
  const coorX = useSelector(mouseCoordinatesX);
  const coorY = useSelector(mouseCoordinatesY);
  const keys = useSelector(treeUnitsKey);
  // const _mFlag = useSelector(_unitModalFlag);
  const dispatch = useDispatch();
  return (
    <aside
      className="popover"
      style={{ left: `${coorX - 205}px`, top: `${coorY}px` }}
    >
      {keys === "organization" || keys === "unit" ? (
        <p key="new-unit" onClick={() => dispatch(unitModal(true))}>
          ایجاد واحد جدید
        </p>
      ) : null}
      {keys !== "post" && (
        <p key="new-post" onClick={() => dispatch(postModal(true))}>
          ایجاد پست جدید
        </p>
      )}
      {keys === "post" && (
        <>
          <p key="appointment" onClick={() => dispatch(appointmentModal(true))}>
            انتصاب/انفصال
          </p>
          <p key="transfer">انتقال</p>
        </>
      )}
      <p key="edit">ویرایش</p>
      <p key="delete">حذف</p>
    </aside>
  );
};

export default PopOver;
