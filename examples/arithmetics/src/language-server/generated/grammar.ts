/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { loadGrammar, Grammar } from 'langium';

let loadedArithmeticsGrammar: Grammar | undefined;
export const ArithmeticsGrammar = (): Grammar => loadedArithmeticsGrammar ||(loadedArithmeticsGrammar = loadGrammar(`{
  "$type": "Grammar",
  "usedGrammars": [],
  "hiddenTokens": [],
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Module",
      "hiddenTokens": [],
      "entry": true,
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "module",
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "ID"
              }
            }
          },
          {
            "$type": "Assignment",
            "feature": "statements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Statement"
              }
            },
            "elements": [],
            "cardinality": "*"
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Statement",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "Definition"
            },
            "elements": []
          },
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "Evaluation"
            },
            "elements": []
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Definition",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "def",
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "ID"
              }
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "(",
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "args",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "arguments": [],
                  "rule": {
                    "$refText": "DeclaredParameter"
                  }
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ",",
                    "elements": []
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "arguments": [],
                      "rule": {
                        "$refText": "DeclaredParameter"
                      }
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Expression"
              }
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "DeclaredParameter",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "arguments": [],
          "rule": {
            "$refText": "ID"
          }
        },
        "elements": []
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Evaluation",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Expression"
              }
            },
            "elements": []
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Expression",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "RuleCall",
        "arguments": [],
        "rule": {
          "$refText": "Addition"
        },
        "elements": []
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Addition",
      "hiddenTokens": [],
      "type": {
        "$type": "ReturnType",
        "name": "Expression"
      },
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "Multiplication"
            },
            "elements": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": "BinaryExpression",
                "feature": "left",
                "operator": "=",
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+",
                      "elements": []
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "arguments": [],
                  "rule": {
                    "$refText": "Multiplication"
                  }
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Multiplication",
      "hiddenTokens": [],
      "type": {
        "$type": "ReturnType",
        "name": "Expression"
      },
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "PrimaryExpression"
            },
            "elements": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": "BinaryExpression",
                "feature": "left",
                "operator": "=",
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*",
                      "elements": []
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "arguments": [],
                  "rule": {
                    "$refText": "PrimaryExpression"
                  }
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "PrimaryExpression",
      "hiddenTokens": [],
      "type": {
        "$type": "ReturnType",
        "name": "Expression"
      },
      "alternatives": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "(",
                "elements": []
              },
              {
                "$type": "RuleCall",
                "arguments": [],
                "rule": {
                  "$refText": "Expression"
                }
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": "NumberLiteral",
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "arguments": [],
                  "rule": {
                    "$refText": "NUMBER"
                  }
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": "FunctionCall",
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "func",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$refText": "AbstractDefinition"
                  }
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "(",
                    "elements": []
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "arguments": [],
                      "rule": {
                        "$refText": "Expression"
                      }
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ",",
                        "elements": []
                      },
                      {
                        "$type": "Assignment",
                        "feature": "args",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "arguments": [],
                          "rule": {
                            "$refText": "Expression"
                          }
                        }
                      }
                    ],
                    "cardinality": "*"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ]
          }
        ]
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\s+",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "terminal": {
        "$type": "RegexToken",
        "regex": "[_a-zA-Z][\\\\w_]*",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "name": "NUMBER",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "terminal": {
        "$type": "RegexToken",
        "regex": "[0-9]+(\\\\.[0-9])?",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*",
        "elements": []
      }
    }
  ],
  "interfaces": [],
  "types": [
    {
      "$type": "Type",
      "typeAlternatives": [
        {
          "$type": "AtomType",
          "refType": {
            "$refText": "Definition"
          }
        },
        {
          "$type": "AtomType",
          "refType": {
            "$refText": "DeclaredParameter"
          }
        }
      ],
      "name": "AbstractDefinition"
    }
  ],
  "isDeclared": true,
  "name": "Arithmetics"
}`));
