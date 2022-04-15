import { asCScriptNode, eTokenType } from "angelscript-parser";
import { AstPath, doc, Doc, ParserOptions } from "prettier";

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

export function printOriginal(
  node: asCScriptNode | null,
  originalText: string
): string {
  return node
    ? originalText.substring(node.tokenPos, node.tokenPos + node.tokenLength)
    : "";
}

export default function (
  path: AstPath<asCScriptNode>,
  options: ParserOptions<asCScriptNode>,
  printChild: (path: keyof asCScriptNode | Array<keyof asCScriptNode>) => Doc
): Doc | null {
  const node = path.getValue();

  switch (node.tokenType) {
    case eTokenType.ttEnd: {
      return "";
    }
    case eTokenType.ttWhiteSpace: {
      return "TODO: ttWhiteSpace";
    }
    case eTokenType.ttOnelineComment: {
      return "TODO: ttOnelineComment";
    }
    case eTokenType.ttMultilineComment: {
      return "TODO: ttOnelineComment";
    }
    case eTokenType.ttIdentifier: {
      return printOriginal(node, options.originalText);
    }
    case eTokenType.ttMultilineStringConstant: {
      return "TODO: ttMultilineStringConstant";
    }
    case eTokenType.ttHeredocStringConstant: {
      return "TODO: ttHeredocStringConstant";
    }
    case eTokenType.ttNonTerminatedStringConstant: {
      return "TODO: ttNonTerminatedStringConstant";
    }
    case eTokenType.ttPlus: {
      return "+";
    }
    case eTokenType.ttMinus: {
      return "-";
    }
    case eTokenType.ttStar: {
      return "*";
    }
    case eTokenType.ttSlash: {
      return "/";
    }
    case eTokenType.ttPercent: {
      return "%";
    }
    case eTokenType.ttStarStar: {
      return "**";
    }
    case eTokenType.ttHandle: {
      return "@";
    }
    case eTokenType.ttAddAssign: {
      return "+=";
    }
    case eTokenType.ttSubAssign: {
      return "-=";
    }
    case eTokenType.ttMulAssign: {
      return "*=";
    }
    case eTokenType.ttDivAssign: {
      return "/=";
    }
    case eTokenType.ttModAssign: {
      return "%=";
    }
    case eTokenType.ttPowAssign: {
      return "**=";
    }
    case eTokenType.ttOrAssign: {
      return "|=";
    }
    case eTokenType.ttAndAssign: {
      return "&=";
    }
    case eTokenType.ttXorAssign: {
      return "^=";
    }
    case eTokenType.ttShiftLeftAssign: {
      return "<<=";
    }
    case eTokenType.ttShiftRightLAssign: {
      return ">>=";
    }
    case eTokenType.ttShiftRightAAssign: {
      return ">>>=";
    }
    case eTokenType.ttInc: {
      return "++";
    }
    case eTokenType.ttDec: {
      return "--";
    }
    case eTokenType.ttDot: {
      return ".";
    }
    case eTokenType.ttScope: {
      return "::";
    }
    case eTokenType.ttAssignment: {
      return "=";
    }
    case eTokenType.ttEndStatement: {
      return ";";
    }
    case eTokenType.ttListSeparator: {
      return ",";
    }
    case eTokenType.ttStartStatementBlock: {
      return "{";
    }
    case eTokenType.ttEndStatementBlock: {
      return "}";
    }
    case eTokenType.ttOpenParanthesis: {
      return "(";
    }
    case eTokenType.ttCloseParanthesis: {
      return ")";
    }
    case eTokenType.ttOpenBracket: {
      return "[";
    }
    case eTokenType.ttCloseBracket: {
      return "]";
    }
    case eTokenType.ttAmp: {
      return "&";
    }
    case eTokenType.ttBitOr: {
      return "|";
    }
    case eTokenType.ttBitNot: {
      return "~";
    }
    case eTokenType.ttBitXor: {
      return "^";
    }
    case eTokenType.ttBitShiftLeft: {
      return "<<";
    }
    case eTokenType.ttBitShiftRight: {
      return ">>";
    }
    case eTokenType.ttBitShiftRightArith: {
      return ">>>";
    }
    case eTokenType.ttEqual: {
      return "==";
    }
    case eTokenType.ttNotEqual: {
      return "!=";
    }
    case eTokenType.ttLessThan: {
      return "<";
    }
    case eTokenType.ttGreaterThan: {
      return ">";
    }
    case eTokenType.ttLessThanOrEqual: {
      return "<=";
    }
    case eTokenType.ttGreaterThanOrEqual: {
      return ">=";
    }
    case eTokenType.ttQuestion: {
      return "?";
    }
    case eTokenType.ttColon: {
      return ":";
    }
    case eTokenType.ttIf: {
      return "if";
    }
    case eTokenType.ttElse: {
      return "else";
    }
    case eTokenType.ttFor: {
      return "for";
    }
    case eTokenType.ttWhile: {
      return "while";
    }
    case eTokenType.ttBool: {
      return "bool";
    }
    case eTokenType.ttFuncDef: {
      return "funcdef";
    }
    case eTokenType.ttImport: {
      return "import";
    }
    case eTokenType.ttInt: {
      return "int";
    }
    case eTokenType.ttInt8: {
      return "int8";
    }
    case eTokenType.ttInt16: {
      return "int16";
    }
    case eTokenType.ttInt64: {
      return "in64";
    }
    case eTokenType.ttInterface: {
      return "interface";
    }
    case eTokenType.ttIs: {
      return "is";
    }
    case eTokenType.ttNotIs: {
      return "!is";
    }
    case eTokenType.ttUInt: {
      return "uint";
    }
    case eTokenType.ttUInt8: {
      return "uint8";
    }
    case eTokenType.ttUInt16: {
      return "uint16";
    }
    case eTokenType.ttUInt64: {
      return "uint64";
    }
    case eTokenType.ttFloat: {
      return "float";
    }
    case eTokenType.ttVoid: {
      return "void";
    }
    case eTokenType.ttTrue: {
      return "true";
    }
    case eTokenType.ttFalse: {
      return "false";
    }
    case eTokenType.ttReturn: {
      return "return";
    }
    case eTokenType.ttNot: {
      return "not";
    }
    case eTokenType.ttAnd: {
      return "&&";
    }
    case eTokenType.ttOr: {
      return "||";
    }
    case eTokenType.ttXor: {
      return "^^";
    }
    case eTokenType.ttBreak: {
      return "break";
    }
    case eTokenType.ttContinue: {
      return "continue";
    }
    case eTokenType.ttConst: {
      return "const";
    }
    case eTokenType.ttDo: {
      return "do";
    }
    case eTokenType.ttDouble: {
      return "double";
    }
    case eTokenType.ttSwitch: {
      return "switch";
    }
    case eTokenType.ttCase: {
      return "case";
    }
    case eTokenType.ttIn: {
      return "in";
    }
    case eTokenType.ttOut: {
      return "out";
    }
    case eTokenType.ttInOut: {
      return "inout";
    }
    case eTokenType.ttNull: {
      return "null";
    }
    case eTokenType.ttTypedef: {
      return "typedef";
    }
    case eTokenType.ttEnum: {
      return "enum";
    }
    case eTokenType.ttCast: {
      return "cast";
    }
    case eTokenType.ttPrivate: {
      return "private";
    }
    case eTokenType.ttProtected: {
      return "protected";
    }
    case eTokenType.ttNamespace: {
      return "namespace";
    }
    case eTokenType.ttMixin: {
      return "mixin";
    }
    case eTokenType.ttAuto: {
      return "auto";
    }
  }

  return null;
}
