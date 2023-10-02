import {
  FunctionStmtContext,
  PropertyGetStmtContext,
  PropertyLetStmtContext,
  PropertySetStmtContext,
  SubStmtContext,
} from "vb6-antlr4";

export type MethodStmtContext = SubStmtContext | FunctionStmtContext;

export type PropertyStmtContext =
  | PropertySetStmtContext
  | PropertyLetStmtContext
  | PropertyGetStmtContext;

export type ConstantValue = string | number | boolean;
export type PropertyAccessor = "get" | "let" | "set" | null;
