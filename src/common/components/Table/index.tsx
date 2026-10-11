import {
  DetailsList,
  SelectionMode,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  IColumn,
  DetailsListLayoutMode,
  ConstrainMode,
  IDetailsHeaderProps,
  IRenderFunction,
  ScrollbarVisibility,
  mergeStyleSets,
} from "@fluentui/react";

// TODO: Uvedi sada sort i selection.
// Ovo je genericka tabela koja ume da radi sa bilo kojom strukturom data: T[]

export type Column<T> = Omit<IColumn, "fieldName"> & {
  fieldName: keyof T;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};
export const Table = <T,>({ data, columns }: Props<T>): React.JSX.Element => {
  const renderHeader: IRenderFunction<IDetailsHeaderProps> = (
    props,
    defaultRender,
  ) => {
    if (!props || !defaultRender) {
      return null;
    }
    return (
      <Sticky
        stickyPosition={StickyPositionType.Header}
        isScrollSynced={true}
        stickyBackgroundColor="transparent"
      >
        {defaultRender(props)}
      </Sticky>
    );
  };

  return (
    <div className={tableClass.root}>
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <DetailsList
          items={data}
          columns={columns as IColumn[]}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          constrainMode={ConstrainMode.unconstrained}
          selectionMode={SelectionMode.single}
          onRenderDetailsHeader={renderHeader}
        />
      </ScrollablePane>
    </div>
  );
};

const tableClass = mergeStyleSets({
  root: {
    position: "relative",
    flex: 1,
  },
});

export default Table;
