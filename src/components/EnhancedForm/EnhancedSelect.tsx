import {
  Button,
  ButtonProps,
  FormGroup,
  FormGroupProps,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  ItemListRendererProps,
  ItemPredicate,
  ItemRenderer,
  Select2,
  Select2Props,
} from "@blueprintjs/select";
import { Fragment, ReactNode, useCallback, useState } from "react";

const EnhancedSelect = (props: {
  controllerConfig: UseControllerProps<FieldValues, any>;
  formgroupProps: FormGroupProps;
  childrenProps: {
    config: {
      titleKey: string;
      groupKey: string;
      filterKeys: string[];
      optionKeysKey: string;
      resultKey: string;
    };
    selectProps: Omit<Select2Props<any>, "itemRenderer" | "onItemSelect">;
  };
  buttonProps?: ButtonProps;
  restChildren?: ReactNode;
}) => {
  const {
    controllerConfig,
    formgroupProps,
    childrenProps: {
      config: { titleKey, groupKey, filterKeys, optionKeysKey, resultKey },
      selectProps,
    },
    buttonProps,
    restChildren,
  } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerConfig);
  const [selectedOption, setSelectedOption] = useState(selectProps.items[0]);
  const filterOption: ItemPredicate<any> = (
    query,
    option,
    _index,
    exactMatch
  ) => {
    const normalizedTitle = option[titleKey].toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return (
        `${filterKeys.map((k) => option[k]).join(" ")}`.indexOf(
          normalizedQuery
        ) >= 0
      );
    }
  };

  const renderOption = useCallback<ItemRenderer<any>>(
    (option, { handleClick, handleFocus, modifiers, query }) => {
      if (!modifiers.matchesPredicate) {
        return null;
      }
      return (
        <MenuItem
          active={modifiers.active}
          disabled={modifiers.disabled}
          key={option[optionKeysKey]}
          label={option[groupKey]}
          onClick={handleClick}
          onFocus={handleFocus}
          roleStructure="listoption"
          text={`${option[titleKey]}`}
          icon={
            modifiers.active ? (
              <Icon icon="small-tick" />
            ) : (
              <Icon icon="blank" />
            )
          }
        />
      );
    },
    [selectedOption]
  );
  const renderGroupedItemList = (listProps: ItemListRendererProps<any>) => {
    const noResults = (
      <MenuItem disabled={true} text="无结果" roleStructure="listoption" />
    );

    // omit noResults if createNewItemFromQuery and createNewItemRenderer are both supplied, and query is not empty
    const createItemView = listProps.renderCreateItem();
    const maybeNoResults = createItemView != null ? null : noResults;

    const menuContent = renderGroupedMenuContent(listProps, maybeNoResults);
    if (menuContent == null && createItemView == null) {
      return null;
    }
    return (
      <Menu
        role="listbox"
        {...listProps.menuProps}
        ulRef={listProps.itemsParentRef}
      >
        {menuContent}
      </Menu>
    );
  };
  const renderGroupedMenuContent = (
    listProps: ItemListRendererProps<any>,
    noResults?: React.ReactNode,
    initialContent?: React.ReactNode | null
  ) => {
    if (listProps.query.length === 0 && initialContent !== undefined) {
      return initialContent;
    }

    const groupedItems = getGroupedItems(listProps.filteredItems);

    const menuContent = groupedItems.map((groupedItem) => (
      <Fragment key={groupedItem.key}>
        <MenuDivider title={groupedItem.group} />
        {groupedItem.items.map((item, index) =>
          listProps.renderItem(item, groupedItem.index + index)
        )}
      </Fragment>
    ));

    return groupedItems.length > 0 ? menuContent : noResults;
  };
  const getGroupedItems = (filteredItems: any[]) => {
    return filteredItems.reduce<
      Array<{ group: string; index: number; items: any[]; key: number }>
    >((acc, item, index) => {
      const group = getGroup(item);

      const lastGroup = acc.at(-1);
      if (lastGroup && lastGroup.group === group) {
        lastGroup.items.push(item);
      } else {
        acc.push({ group, index, items: [item], key: index });
      }

      return acc;
    }, []);
  };
  const getGroup = (item: any) => {
    const firstLetter = item[groupKey][0].toUpperCase();
    return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
  };
  const groupedItemListPredicate = (query: string, items: any[]) => {
    return items
      .filter((item, index) => filterOption(query, item, index))
      .sort((a, b) => getGroup(a).localeCompare(getGroup(b)));
  };
  const handleChange = useCallback((value: any) => {
    setSelectedOption(value);
    field.onChange(value[resultKey]);
  }, []);
  return (
    <FormGroup
      {...formgroupProps}
      helperText={error?.message ? error?.message : formgroupProps.helperText}
      intent={field.value ? (error ? "danger" : "success") : "none"}
    >
      <div className="flex">
        <Select2<any>
          {...selectProps}
          onItemSelect={handleChange}
          itemPredicate={filterOption}
          itemRenderer={renderOption}
          noResults={
            <MenuItem
              disabled={true}
              text="无结果"
              roleStructure="listoption"
            />
          }
          itemListRenderer={groupKey ? renderGroupedItemList : undefined}
          itemListPredicate={groupKey ? groupedItemListPredicate : undefined}
          activeItem={selectedOption}
        >
          <Button
            {...buttonProps}
            rightIcon="caret-down"
            text={selectedOption ? `${selectedOption[titleKey]}` : "请选择"}
          />
        </Select2>
        {restChildren}
      </div>
    </FormGroup>
  );
};

export default EnhancedSelect;
