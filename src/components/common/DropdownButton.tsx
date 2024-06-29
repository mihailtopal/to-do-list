import { classNames } from "primereact/utils";
import { Dropdown, MenuProps, Space } from "antd";
import style from "./styles.module.css";
interface IItem {
  name: string;
  icon: string;
  function?: () => void;
}
interface IDropdowButtonProps {
  itemsArray: Array<IItem>;
  headIcon: string;
}
const DropdownButton = ({ itemsArray, headIcon }: IDropdowButtonProps) => {
  const itemsConstructor = (items: IItem[]) => {
    return items.map((item) => ({
      label: item.name,
      key: item.name,
      icon: (
        <span
          className={classNames("pi", item.icon)}
          style={{ fontSize: "20px" }}
        ></span>
      ),
    }));
  };

  const items = itemsConstructor(itemsArray);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const item = itemsArray.find((el) => el.name === e.key);
    if (item?.function) item.function();
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className={style.editListButton}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={menuProps}
            trigger={["click"]}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <span className={classNames(style.icons, "pi", headIcon)}></span>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default DropdownButton;
