// initial value
const searchParams = new URLSearchParams(window.location.search)
if (searchParams.has('input') && !(searchParams.get('input')=="")) {
  var initialInput = searchParams.get('input');
} else {
  var initialInput = `Hello!

\\begin{align}
  f(x) &= x + 1 \\\\
  g(x) &= x - 1 
\\end{align}

Start writing!
`;
}

// setup editor
require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });
require(["vs/editor/editor.main"], function () {
  // LaTeX language definition
  // https://github.com/microsoft/monaco-editor/issues/3233
  // https://github.com/koka-lang/madoko/blob/master/styles/lang/latex.json
  monaco.languages.register({ id: 'latex' });
  monaco.languages.setMonarchTokensProvider("latex", {
    "displayName":    "Latex",      
    "name":           "latex",
    "mimeTypes":      ["text/latex","text/tex"],
    "fileExtensions": ["tex","sty","cls"],
    
    "lineComment":      "% ",   
      
    "builtin": [
      "addcontentsline", "addtocontents", "addtocounter", "address", "addtolength", "addvspace", "alph", "appendix",
      "arabic", "author", "backslash", "baselineskip", "baselinestretch", "bf", "bibitem", "bigskipamount", "bigskip",
      "boldmath", "boldsymbol", "cal", "caption", "cdots", "centering", "chapter", "circle", "cite", "cleardoublepage",
      "clearpage", "cline", "closing", "color", "copyright", "dashbox", "date", "ddots", "documentclass", "dotfill", "em",
      "emph", "ensuremath", "epigraph", "euro", "fbox", "flushbottom", "fnsymbol", "footnote", "footnotemark",
      "footnotesize", "footnotetext", "frac", "frame", "framebox", "frenchspacing", "hfill", "hline", "href", "hrulefill",
      "hspace", "huge", "Huge", "hyphenation", "include", "includegraphics", "includeonly", "indent", "input", "it", "item",
      "kill", "label", "large", "Large", "LARGE", "LaTeX", "LaTeXe", "ldots", "left", "lefteqn", "line", "linebreak",
      "linethickness", "linewidth", "listoffigures", "listoftables", "location", "makebox", "maketitle", "markboth",
      "mathcal", "mathop", "mbox", "medskip", "multicolumn", "multiput", "newcommand", "newcolumntype", "newcounter",
      "newenvironment", "newfont", "newlength", "newline", "newpage", "newsavebox", "newtheorem", "nocite", "noindent",
      "nolinebreak", "nonfrenchspacing", "normalsize", "nopagebreak", "not", "onecolumn", "opening", "oval", "overbrace",
      "overline", "pagebreak", "pagenumbering", "pageref", "pagestyle", "par", "paragraph", "parbox", "parindent", "parskip",
      "part", "protect", "providecommand", "put", "raggedbottom", "raggedleft", "raggedright", "raisebox", "ref",
      "renewcommand", "right", "rm", "roman", "rule", "savebox", "sbox", "sc", "scriptsize", "section", "setcounter",
      "setlength", "settowidth", "sf", "shortstack", "signature", "sl", "slash", "small", "smallskip", "sout", "space", "sqrt",
      "stackrel", "stepcounter", "subparagraph", "subsection", "subsubsection", "tableofcontents", "telephone", "TeX",
      "textbf", "textcolor", "textit", "textmd", "textnormal", "textrm", "textsc", "textsf", "textsl", "texttt", "textup",
      "textwidth", "textheight", "thanks", "thispagestyle", "tiny", "title", "today", "tt", "twocolumn", "typeout", "typein",
      "uline", "underbrace", "underline", "unitlength", "usebox", "usecounter", "uwave", "value", "vbox", "vcenter", "vdots",
      "vector", "verb", "vfill", "vline", "vphantom", "vspace",
      
      "RequirePackage", "NeedsTeXFormat", "usepackage", "input", "include", "documentclass", "documentstyle",
      "def","edef","defcommand","if","ifdim","ifnum","ifx","fi","else","begingroup","endgroup",
      "definecolor","textcolor","color",
      "eifstrequal","eeifstrequal"
    ],
    "tokenizer": {
      "root": [
        ["(\\\\begin)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})", 
            ["keyword.predefined","white","@brackets",{ "token": "tag.env-$4", "bracket": "@open" },"@brackets"]],
        ["(\\\\end)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})", 
            ["keyword.predefined","white","@brackets",{ "token": "tag.env-$4", "bracket": "@close" }, "@brackets" ]],          
        ["\\\\[^a-zA-Z@]", "keyword" ],  
        ["\\@[a-zA-Z@]+", "keyword.at" ],  
        ["\\\\([a-zA-Z@]+)", { "cases": {
          "$1@builtin": "keyword.predefined",
          "@default": "keyword" 
        }}],  
        { "include": "@whitespace" },
        ["[{}()\\[\\]]", "@brackets"],
        ["#+\\d", "number.arg"],
        ["\\-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)\\s*(?:em|ex|pt|pc|sp|cm|mm|in)", "number.len"]
      ],
  
      "whitespace": [
        ["[ \\t\\r\\n]+", "white"],
        ["%.*$",    "comment"]
      ]
    }
  });
  // create editor
  var editor = monaco.editor.create(
    document.getElementById("input"),
    {
      value: initialInput,
      language: "latex",
      automaticLayout: true,
    }
  );
  // editor.layout({ width, height: contentHeight });
  // first preview
  math(editor.getValue());
  // onInput preview
  editor.getModel().onDidChangeContent((event) => {
    console.log(editor.getValue());
    math(editor.getValue());
  });
});

// update LaTeX viewer
function math(input) {
  // update URL
  let url = new URL(window.location.href);
  let params = url.searchParams;
  params.set('input', input);
  history.pushState(null, null, url);
  // escape
  input = input.replace(/</g, "&lt;");
  input = input.replace(/>/g, "&gt;");
  document.getElementById('output').innerHTML = input;
  // https://qiita.com/kosuke_shimizu/items/187467354c32a7e18d07
  // https://docs.mathjax.org/en/v3.2-latest/web/typeset.html#handling-asynchronous-typesetting
  MathJax.typesetPromise().then(() => {
    // modify the DOM here
    MathJax.typesetPromise();
  }).catch((err) => console.log(err.message));
}
