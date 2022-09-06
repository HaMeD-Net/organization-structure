import { useSelector, useDispatch } from "react-redux";
import {
  appointmentModal,
  postModal,
  _appointmentModalFlag,
  _postModalFlag,
} from "../../../redux/treeSlice";
import FormDatePicker from "../../datePicker/datePicker";
import Strings from "../../strings/string";
import CollectionCreateForm from "./appointModal";

const AppDisc: React.FC = () => {
  const _appointment = useSelector(_appointmentModalFlag);
  const dispatch = useDispatch();
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(appointmentModal(false));
  };

  return (
    <div>
      <CollectionCreateForm
        visible={_appointment}
        onCreate={onCreate}
        onCancel={() => {
          dispatch(appointmentModal(false));
        }}
      />
    </div>
  );
};

export default AppDisc;
