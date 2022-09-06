import { Popover, Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import {
  BankOutlined,
  BuildOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFlag,
  treeFlag,
  coordinate,
  treeKey,
} from "../../redux/treeSlice";
import PopOver from "../../components/popover/popover";
import CreateUnit from "../../components/forms/createUnit/createUnit";
import OrganizationPosts from "../../components/forms/organizationPosts/organizationPosts";
import AppDisc from "../../components/forms/appoint-disc/appoint-disc";
// import styles from "./tree.module.scss";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "سازمانها",
    key: "organization-1",
    children: [
      {
        title: "واحد شماره 1",
        key: "unit-1",
        icon: <BuildOutlined />,
        children: [
          {
            title: "پست شماره 1",
            key: "post-1",
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: "واحد شماره 2",
        key: "unit-2",
        icon: <BuildOutlined />,
      },
    ],
    icon: <BankOutlined />,
  },
];

const TreeSelector: React.FC = () => {
  const flag = useSelector(treeFlag);
  const dispatch = useDispatch();
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    dispatch(changeFlag(false));
    console.log(flag);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    // console.log("Trigger Expand", keys, info);
  };

  return (
    <>
      <AppDisc />
      <CreateUnit />
      <OrganizationPosts />
      {flag && <PopOver />}
      <DirectoryTree
        multiple
        // defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
        onRightClick={(e) => {
          console.log(e)
          dispatch(changeFlag(true));
          dispatch(treeKey(e.node.key.toString().split("-")[0]));
          dispatch(coordinate(e.event));
        }}
      />
    </>
  );
};

export default TreeSelector;
