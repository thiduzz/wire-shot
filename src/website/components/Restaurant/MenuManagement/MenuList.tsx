import { IMenuItem, IMenuItemDetails } from "@local-types/restaurant";
import { IMenuListProps } from "./Menu.types";

export const MenuList = ({
  menu,
  onSelect,
  type = "overview",
}: IMenuListProps) => {
  const onItemSelection = (item: IMenuItemDetails) => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div>
      {Object.keys(menu).length === 0 ? (
        <div>No menu yet</div>
      ) : (
        <div className="flex flex-row flex-wrap justify-start my-12 gap-12 ">
          {Object.entries(menu).map(([key, value], i) => {
            return (
              <div key={key} className="flex flex-col gap-4">
                <div className="font-bold text-lg">{key}</div>
                {value.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row gap-4 justify-between"
                      onClick={() => onItemSelection(item)}
                    >
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        {type === "overview" && (
                          <p className="text-sm  mt-1">{item.description}</p>
                        )}
                      </div>
                      <p className="font-bold"> {item.price} €</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
