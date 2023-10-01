import {
  FunctionStmtContext,
  PropertyGetStmtContext,
  PropertyLetStmtContext,
  PropertySetStmtContext,
  SubStmtContext,
} from "vb6-antlr4";

export type MethodStmContext =
  | SubStmtContext
  | FunctionStmtContext
  | PropertySetStmtContext
  | PropertyLetStmtContext
  | PropertyGetStmtContext;
