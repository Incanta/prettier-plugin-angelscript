import { asCScriptNode, eScriptNode } from "angelscript-parser";
import { AstPath, doc, Doc, ParserOptions, Printer } from "prettier";
import printToken from "./print/token";

/* eslint-disable @typescript-eslint/no-unused-vars */
const {
  builders: {
    group,
    conditionalGroup,
    fill,
    ifBreak,
    breakParent,
    join,
    line,
    softline,
    hardline,
    literalline,
    lineSuffix,
    lineSuffixBoundary,
    indent,
    dedent,
    align,
    markAsRoot,
    dedentToRoot,
    trim,
    indentIfBreak,
    label,
    hardlineWithoutBreakParent,
    literallineWithoutBreakParent,
    cursor,
  },
} = doc;
/* eslint-enable @typescript-eslint/no-unused-vars */

function print(
  path: AstPath<asCScriptNode>,
  options: ParserOptions<asCScriptNode>,
  printChild: (path: keyof asCScriptNode) => Doc
): Doc {
  const node = path.getValue();

  const doc = printToken(path, options, printChild);

  if (doc !== null) {
    return doc;
  }

  switch (node.nodeType) {
    case eScriptNode.snUndefined: {
      return "";
    }
    case eScriptNode.snScript: {
      if (node.firstChild !== null) {
        // @ts-ignore
        return printChild("firstChild");
      }
      return "";
    }
    case eScriptNode.snFunction: {
      return "";
    }
    case eScriptNode.snConstant: {
      return "";
    }
    case eScriptNode.snDataType: {
      return "";
    }
    case eScriptNode.snIdentifier: {
      return "";
    }
    case eScriptNode.snParameterList: {
      return "";
    }
    case eScriptNode.snStatementBlock: {
      return "";
    }
    case eScriptNode.snDeclaration: {
      return "";
    }
    case eScriptNode.snExpressionStatement: {
      return "";
    }
    case eScriptNode.snIf: {
      return "";
    }
    case eScriptNode.snFor: {
      return "";
    }
    case eScriptNode.snWhile: {
      return "";
    }
    case eScriptNode.snReturn: {
      return "";
    }
    case eScriptNode.snExpression: {
      return "";
    }
    case eScriptNode.snExprTerm: {
      return "";
    }
    case eScriptNode.snFunctionCall: {
      return "";
    }
    case eScriptNode.snConstructCall: {
      return "";
    }
    case eScriptNode.snArgList: {
      return "";
    }
    case eScriptNode.snExprPreOp: {
      return "";
    }
    case eScriptNode.snExprPostOp: {
      return "";
    }
    case eScriptNode.snExprOperator: {
      return "";
    }
    case eScriptNode.snExprValue: {
      return "";
    }
    case eScriptNode.snBreak: {
      return "";
    }
    case eScriptNode.snContinue: {
      return "";
    }
    case eScriptNode.snDoWhile: {
      return "";
    }
    case eScriptNode.snAssignment: {
      return "";
    }
    case eScriptNode.snCondition: {
      return "";
    }
    case eScriptNode.snSwitch: {
      return "";
    }
    case eScriptNode.snCase: {
      return "";
    }
    case eScriptNode.snImport: {
      return "";
    }
    case eScriptNode.snClass: {
      return "";
    }
    case eScriptNode.snInitList: {
      return "";
    }
    case eScriptNode.snInterface: {
      return "";
    }
    case eScriptNode.snEnum: {
      return "";
    }
    case eScriptNode.snTypedef: {
      return "";
    }
    case eScriptNode.snCast: {
      return "";
    }
    case eScriptNode.snVariableAccess: {
      return "";
    }
    case eScriptNode.snFuncDef: {
      return "";
    }
    case eScriptNode.snVirtualProperty: {
      return "";
    }
    case eScriptNode.snNamespace: {
      return "";
    }
    case eScriptNode.snMixin: {
      return "";
    }
    case eScriptNode.snListPattern: {
      return "";
    }
    case eScriptNode.snNamedArgument: {
      return "";
    }
    case eScriptNode.snScope: {
      return "";
    }
    case eScriptNode.snUnrealDeclarator: {
      return "";
    }
    case eScriptNode.snUnrealDeclaratorObject: {
      return "";
    }
    case eScriptNode.snUnrealDefaultValue: {
      return "";
    }
    case eScriptNode.snUnrealAccess: {
      return "";
    }
    case eScriptNode.snUnrealAccessValue: {
      return "";
    }
    case eScriptNode.snUnrealAccessValueModifier: {
      return "";
    }
    case eScriptNode.snUnrealAccessReference: {
      return "";
    }
  }

  return "";
}

export const printer: Printer = {
  // @ts-ignore
  print,
};
