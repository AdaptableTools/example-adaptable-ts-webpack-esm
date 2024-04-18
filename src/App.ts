// AG Grid css
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-balham.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

// AG Grid code
import { Module, ColDef, GridOptions } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import orders from "./orders.json";

// Adaptable css
import "@adaptabletools/adaptable/index.css";
import "@adaptabletools/adaptable/themes/dark.css";

// Adaptable code
import Adaptable from "@adaptabletools/adaptable/agGrid.js";
import { AdaptableOptions } from "@adaptabletools/adaptable/types";

import { dateParseragGrid, shortDateFormatteragGrid } from "./utils";

const columnDefs: ColDef[] = [
  { field: "OrderId", type: "abColDefNumber" },
  { field: "CompanyName", type: "abColDefString" },
  { field: "ContactName", type: "abColDefString" },
  { field: "Employee", type: "abColDefString" },
  {
    field: "InvoicedCost",
    editable: true,
    type: "abColDefNumber",
    valueFormatter: "x.toLocaleString()",
  },
  {
    field: "OrderDate",
    type: "abColDefDate",
    editable: true,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
  },
].map((c: ColDef) => {
  c.floatingFilter = true;
  c.filter = true;
  return c;
});

const gridOptions: GridOptions = {
  sideBar: true,
  enableRangeSelection: true,
  columnDefs,
  rowData: null,
};

const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  userName: "Demo User",
  adaptableId: "Simple Demo",
  licenseKey: "TODO ADD HERE YOUR LICENSE KEY",

  predefinedConfig: {
    Theme: {
      Revision: 3,
      CurrentTheme: "light",
    },
    Layout: {
      Revision: Date.now(),
    },
  },
  notificationsOptions: {
    showProgressBar: true,
  },
};

const agGridModules: Module[] = [
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  StatusBarModule,
  MenuModule,
  RangeSelectionModule,
  RichSelectModule,
  ExcelExportModule,
  GridChartsModule,
  SparklinesModule,
  RowGroupingModule,
  ClipboardModule,
];

Adaptable.init(adaptableOptions, { modules: agGridModules, gridOptions }).then(
  (api) => {
    // we simulate server loading - on AdaptableReady event
    api.eventApi.on("AdaptableReady", ({ adaptableApi }) => {
      console.log("Adaptable Ready!");
      setTimeout(() => {
        adaptableApi.gridApi.addGridData(orders);
      }, 500);
    });
  }
);
