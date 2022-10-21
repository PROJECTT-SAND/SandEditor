export const monarchLanguage = {
  defaultToken: 'invalid',
  ignoreCase: 'true',
  tokenPostfix: '.sdcod',

  comments: {
    lineComment: '#',
    // blockComment: ["(*", "*)"]
  },

  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  keywords: [
    'func',
    'for',
    'module',
    'to',
    'loop'
  ],

  operators: [
		'<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
		'*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
		'|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
		'*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
		'^=', '@',
	],
  
  brackets: [
		{ open: '{', close: '}', token: 'delimiter.curly' },
		{ open: '[', close: ']', token: 'delimiter.bracket' },
		{ open: '(', close: ')', token: 'delimiter.parenthesis' }
	],

	typeKeywords: [
		'any', 'bool', 'num', 'str', 'obj', 'null'
	],

  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      [/[a-zA-Z_.,=:;$@][\w$]*/, {
        cases: {
          // '@operators': 'delimiter',
          '@keywords': { token: 'keyword' },
          '@default': 'identifier'
        }
      }],

      { include: '@whitespace' },

      [/[{}\[\]()]/, '@brackets'],

			[/@symbols/, {
				cases: {
					'@operators': 'delimiter',
					'@default': ''
				}
			}],

      [/\d+/, 'number'],

      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string'],

      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/'/, 'string', '@string'],

      // [/^:\($*/, {
      //   cases: {
      //     '@typeKeywords': { token: 'type' }
      //   }
      // }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, ''],
      [/(^#.*$)/, 'comment'],
    ],

    string: [
      [/[^\\"|']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"|'/, 'string', '@pop']
    ]
  },
}