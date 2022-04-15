import { asCScriptNode, eScriptNode, eTokenType } from "angelscript-parser";
import { AstPath, doc, Doc, ParserOptions, Printer } from "prettier";
import printToken, { printOriginal } from "./print/token";
import printClass from "./print/class";
import printUnrealDeclaratorObject from "./print/unreal-declarator-object";

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
  printChild: (path: keyof asCScriptNode | Array<keyof asCScriptNode>) => Doc
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
      return printChild("firstChild");
    }
    case eScriptNode.snFunction: {
      break;
    }
    case eScriptNode.snConstant: {
      return printOriginal(node, options.originalText);
    }
    case eScriptNode.snDataType: {
      break;
    }
    case eScriptNode.snIdentifier: {
      if (node.firstChild?.tokenType === eTokenType.ttIdentifier) {
        return printOriginal(node.firstChild, options.originalText);
      }

      // not sure what to do here yet
      break;
    }
    case eScriptNode.snParameterList: {
      break;
    }
    case eScriptNode.snStatementBlock: {
      break;
    }
    case eScriptNode.snDeclaration: {
      break;
    }
    case eScriptNode.snExpressionStatement: {
      break;
    }
    case eScriptNode.snIf: {
      break;
    }
    case eScriptNode.snFor: {
      break;
    }
    case eScriptNode.snWhile: {
      break;
    }
    case eScriptNode.snReturn: {
      break;
    }
    case eScriptNode.snExpression: {
      break;
    }
    case eScriptNode.snExprTerm: {
      break;
    }
    case eScriptNode.snFunctionCall: {
      break;
    }
    case eScriptNode.snConstructCall: {
      break;
    }
    case eScriptNode.snArgList: {
      break;
    }
    case eScriptNode.snExprPreOp: {
      break;
    }
    case eScriptNode.snExprPostOp: {
      break;
    }
    case eScriptNode.snExprOperator: {
      break;
    }
    case eScriptNode.snExprValue: {
      break;
    }
    case eScriptNode.snBreak: {
      break;
    }
    case eScriptNode.snContinue: {
      break;
    }
    case eScriptNode.snDoWhile: {
      break;
    }
    case eScriptNode.snAssignment: {
      return [" ", "=", " ", printChild("firstChild")];
    }
    case eScriptNode.snCondition: {
      break;
    }
    case eScriptNode.snSwitch: {
      break;
    }
    case eScriptNode.snCase: {
      break;
    }
    case eScriptNode.snImport: {
      break;
    }
    case eScriptNode.snClass: {
      return printClass(path, options, printChild);
    }
    case eScriptNode.snInitList: {
      break;
    }
    case eScriptNode.snInterface: {
      break;
    }
    case eScriptNode.snEnum: {
      break;
    }
    case eScriptNode.snTypedef: {
      break;
    }
    case eScriptNode.snCast: {
      break;
    }
    case eScriptNode.snVariableAccess: {
      break;
    }
    case eScriptNode.snFuncDef: {
      break;
    }
    case eScriptNode.snVirtualProperty: {
      break;
    }
    case eScriptNode.snNamespace: {
      break;
    }
    case eScriptNode.snMixin: {
      break;
    }
    case eScriptNode.snListPattern: {
      break;
    }
    case eScriptNode.snNamedArgument: {
      break;
    }
    case eScriptNode.snScope: {
      break;
    }
    case eScriptNode.snUnrealDeclarator: {
      switch (node.tokenType) {
        case eTokenType.ttUProperty: {
          return indent(group(["UPROPERTY", printChild("firstChild")]));
        }
        case eTokenType.ttUFunction: {
          return group(["UFUNCTION", printChild("firstChild")]);
        }
      }
      return "";
    }
    case eScriptNode.snUnrealDeclaratorObject: {
      const objectGroup = Symbol("unrealDeclaratorObject");
      return group(
        [
          "(",
          softline,
          printUnrealDeclaratorObject(path, options, printChild),
          ifBreak(dedent([softline, ")"]), ")", { groupId: objectGroup }),
        ],
        { id: objectGroup }
      );
    }
    case eScriptNode.snUnrealDefaultValue: {
      // the firstChild of this node is a snExpressionStatement
      return fill(["default", " ", printChild("firstChild")]);
    }
    case eScriptNode.snUnrealAccess: {
      break;
    }
    case eScriptNode.snUnrealAccessValue: {
      break;
    }
    case eScriptNode.snUnrealAccessValueModifier: {
      break;
    }
    case eScriptNode.snUnrealAccessReference: {
      break;
    }
    case eScriptNode.snEmptyLine: {
      // since we add lines in between declarations and
      // expressions in things like ./class.ts, we can just print
      // an empty string here; the new line will get printed accordingly
      return "";
    }
  }

  // this is a fall back to just print what was there
  // we don't support whatever this case is yet, so don't be
  // destructive
  return printOriginal(node, options.originalText);
}

export const printer: Printer = {
  // @ts-ignore
  print,
};
