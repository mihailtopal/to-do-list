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
  headIconsize?: string;
  itemsIconSize?: string;
  className?: string;
}
const DropdownButton = ({
  itemsArray,
  headIcon,
  headIconsize,
  itemsIconSize,
  className,
}: IDropdowButtonProps) => {
  const itemsConstructor = (items: IItem[], fontSize: string | undefined) => {
    return items.map((item) => ({
      label: item.name,
      key: item.name,
      icon: (
        <span
          className={classNames("pi", item.icon)}
          style={{ fontSize: fontSize ? fontSize : "20px" }}
        ></span>
      ),
    }));
  };

  const items = itemsConstructor(itemsArray, itemsIconSize);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const item = itemsArray.find((el) => el.name === e.key);
    if (item?.function) item.function();
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className={classNames(style.editListButton, className)}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            overlayStyle={{ fontFamily: "Inter Tight, sans-serif" }}
            menu={menuProps}
            trigger={["click"]}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <span
              style={{
                fontSize: headIconsize ? headIconsize : "28px",
                fontWeight: "800",
              }}
              className={classNames(style.icons, "pi", headIcon)}
            ></span>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

export default DropdownButton;

/*
Component Explanation:

  IItem Interface: This defines the structure for each item in the dropdown menu. Each item has 
a name, an icon (both strings), and an optional function that gets executed when the item is 
clicked.

  IDropdowButtonProps Interface: This defines the props that the DropdownButton component accepts:
1.itemsArray: An array of IItem objects representing the items in the dropdown menu.
2.headIcon: A string representing the icon class for the dropdown button.
3.headIconsize (optional): A string representing the size of the dropdown button icon.
4.itemsIconSize (optional): A string representing the size of the icons in the dropdown menu.

  DropdownButton Component:

1.itemsConstructor Function: Constructs the dropdown menu items from the itemsArray. It maps each 
item to an object with label, key, and icon properties.

2.handleMenuClick Function: Handles the click event for the dropdown menu items. It finds the clicked
 item by its name and executes its associated function if it exists.

3.menuProps Object: Defines the properties for the dropdown menu, including the items and the click handler.
4.JSX Return: Renders the dropdown button with the specified icon and size. When the button 
is clicked, the dropdown menu is displayed with the constructed items.

The component uses classes from primereact for icons and antd for the dropdown menu, 
integrating both libraries seamlessly.
*/
