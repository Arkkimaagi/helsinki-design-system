(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"Ox/Y":function(e,t,o){"use strict";o.r(t),o.d(t,"_frontmatter",(function(){return u})),o.d(t,"default",(function(){return f}));var l=o("cxan"),n=o("+wNj"),a=o("ZVZ0"),i=o("9Rvw"),r=o("qbsg"),s=o("l1mD"),b=o("Y1DN"),p=o("sQ7B"),c=o("x0e6"),d=o("vD+s"),u=(o("l1C2"),{});void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/components/dropdown.mdx"}});var m={_frontmatter:u},h=i.a;function f(e){var t,o,f,O=e.components,j=Object(n.a)(e,["components"]);return Object(a.b)(h,Object(l.a)({},m,j,{components:O,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"dropdown"},"Dropdown"),Object(a.b)(s.a,{type:"alert",mdxType:"StatusLabel"},"Pre-release"),Object(a.b)(d.a,{mdxType:"LargeParagraph"},"A dropdown offers user a list of options which one or multiple can be selected. Dropdowns are often used as part of forms and filters."),Object(a.b)("h2",{id:"principles"},"Principles"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"A label should always be provided with dropdowns.")," Aim for labels that are short, concise and easy to understand."),Object(a.b)("li",{parentName:"ul"},"Dropdowns usually have four (4) or more options. When having only 2-4 options, it is usually better to use ",Object(a.b)("a",Object(l.a)({parentName:"li"},{href:"/components/radio-button",title:"Radio button group usage documentation"}),"radio button group"),". Also, if options need to be easily comparable (for example, product pricing), prefer radio buttons over dropdown."),Object(a.b)("li",{parentName:"ul"},'It is recommended to set default option for the dropdown. If the default option is also the recommended option, you can mark the option with text "',Object(a.b)("em",{parentName:"li"},"(recommended)"),'".'),Object(a.b)("li",{parentName:"ul"},"If your dropdown has 8 or more options, consider using the ",Object(a.b)("a",Object(l.a)({parentName:"li"},{href:"/components/dropdown#filterable",title:"Filterable dropdown usage documentation"}),"filterable variant")," so the user can locate the wanted option easier."),Object(a.b)("li",{parentName:"ul"},"Dropdown options should not span over one line. Aim for short texts for all options."),Object(a.b)("li",{parentName:"ul"},"If possible, do input validation in client-side real time and provide the user with immediate feedback after selection.")),Object(a.b)("h2",{id:"accessibility"},"Accessibility"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Placeholder text can be used to give hints and examples to the user what is being selected with the dropdown. ",Object(a.b)("strong",{parentName:"li"},"However, all assistive technologies do not threat placeholder texts as labels and therefore they may ignore them completely.")," Aim to provide the sufficient information to fill the input in the label. Also if possible, set default option for the dropdown so the placeholder is not needed."),Object(a.b)("li",{parentName:"ul"},"In the case of an erroneous selection, aim to provide clear instructions to the user how to correct the mistake. Always provide text description of the error. In dropdowns it is usually possible to filter selectable options for the user to avoid errors completely.")),Object(a.b)("h2",{id:"usage"},"Usage"),Object(a.b)("h3",{id:"default"},"Default"),Object(a.b)("p",null,"Default dropdown serves in most use cases when the user needs to select one from 4 to 7 options. If there are 8 or more options available, consider using ",Object(a.b)("a",Object(l.a)({parentName:"p"},{href:"/components/dropdown#filterable"}),"filterable")," variant."),Object(a.b)(r.c,{__position:2,__code:"<Dropdown\n  id=\"example1\"\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  placeholder=\"Choose one\"\n  label=\"Label\"\n  helper=\"Assistive text\"\n/>\n<Dropdown\n  id=\"example2\"\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  defaultValue={{ label: 'Plutonium' }}\n  label=\"Label\"\n  helper=\"Assistive text\"\n  style={{ marginTop: 'var(--spacing-s)' }}\n  disabled\n/>\n<Dropdown\n  id=\"example3\"\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  defaultValue={{ label: 'Plutonium' }}\n  label=\"Label\"\n  helper=\"Error text\"\n  style={{ marginTop: 'var(--spacing-s)' }}\n  invalid\n/>",__scope:(t={props:j,DefaultLayout:i.a,Playground:r.c,Dropdown:b.a,StatusLabel:s.a,ColorBox:p.a,Text:c.a,LargeParagraph:d.a},t.DefaultLayout=i.a,t._frontmatter=u,t),mdxType:"Playground"},Object(a.b)(b.a,{id:"example1",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"}],placeholder:"Choose one",label:"Label",helper:"Assistive text",mdxType:"Dropdown"}),Object(a.b)(b.a,{id:"example2",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"}],defaultValue:{label:"Plutonium"},label:"Label",helper:"Assistive text",style:{marginTop:"var(--spacing-s)"},disabled:!0,mdxType:"Dropdown"}),Object(a.b)(b.a,{id:"example3",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"}],defaultValue:{label:"Plutonium"},label:"Label",helper:"Error text",style:{marginTop:"var(--spacing-s)"},invalid:!0,mdxType:"Dropdown"})),Object(a.b)("h4",{id:"react-code-example"},"React code example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(l.a)({parentName:"pre"},{className:"language-tsx"}),"/* Enabled */\n<Dropdown\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  placeholder=\"Choose one\"\n  label=\"Label\"\n  helper=\"Assistive text\"\n/>\n\n/* Disabled */\n<Dropdown\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  defaultValue={{ label: 'Plutonium' }}\n  label=\"Label\"\n  helper=\"Assistive text\"\n  disabled\n/>\n\n/* Error */\n<Dropdown\n  options={[\n    { label: 'Plutonium' },\n    { label: 'Americium' },\n    { label: 'Copernicium' },\n  ]}\n  defaultValue={{ label: 'Plutonium' }}\n  label=\"Label\"\n  helper=\"Error text\"\n  invalid\n/>\n")),Object(a.b)("h3",{id:"filterable"},"Filterable"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"NOTE! Accessibility of this component is still in validation.")),Object(a.b)("p",null,"Filterable dropdown variant works exactly like the default one except it allows filtering the options by typing while component is focused. This variant can increase usability when there are 8 or more options available."),Object(a.b)(r.c,{__position:3,__code:'<Dropdown\n  id="example3"\n  options={[\n    { label: \'Plutonium\' },\n    { label: \'Americium\' },\n    { label: \'Copernicium\' },\n  ]}\n  placeholder="Choose one"\n  label="Label"\n  helper="Assistive text"\n  filterable\n/>',__scope:(o={props:j,DefaultLayout:i.a,Playground:r.c,Dropdown:b.a,StatusLabel:s.a,ColorBox:p.a,Text:c.a,LargeParagraph:d.a},o.DefaultLayout=i.a,o._frontmatter=u,o),mdxType:"Playground"},Object(a.b)(b.a,{id:"example3",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"}],placeholder:"Choose one",label:"Label",helper:"Assistive text",filterable:!0,mdxType:"Dropdown"})),Object(a.b)("h4",{id:"react-code-example-1"},"React code example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(l.a)({parentName:"pre"},{className:"language-tsx"}),'<Dropdown\n  id="example3"\n  options={[\n    { label: \'Plutonium\' },\n    { label: \'Americium\' },\n    { label: \'Copernicium\' },\n  ]}\n  placeholder="Choose one"\n  label="Label"\n  helper="Assistive text"\n  filterable\n/>\n')),Object(a.b)("h3",{id:"multi-select"},"Multi-select"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"NOTE! This component is work in progress and is subject to change in the future versions of HDS!")),Object(a.b)("p",null,"Multi-select variant allows the user to select one or more options simultaneously."),Object(a.b)(r.c,{__position:4,__code:'<Dropdown\n  id="example4"\n  options={[\n    { label: \'Plutonium\' },\n    { label: \'Americium\' },\n    { label: \'Copernicium\' },\n  ]}\n  placeholder="Choose one"\n  label="Label"\n  helper="Assistive text"\n  closeMenuOnSelect={false}\n  multiselect\n/>',__scope:(f={props:j,DefaultLayout:i.a,Playground:r.c,Dropdown:b.a,StatusLabel:s.a,ColorBox:p.a,Text:c.a,LargeParagraph:d.a},f.DefaultLayout=i.a,f._frontmatter=u,f),mdxType:"Playground"},Object(a.b)(b.a,{id:"example4",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"}],placeholder:"Choose one",label:"Label",helper:"Assistive text",closeMenuOnSelect:!1,multiselect:!0,mdxType:"Dropdown"})),Object(a.b)("h4",{id:"react-code-example-2"},"React code example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(l.a)({parentName:"pre"},{className:"language-tsx"}),'<Dropdown\n  id="example4"\n  options={[\n    { label: \'Plutonium\' },\n    { label: \'Americium\' },\n    { label: \'Copernicium\' },\n  ]}\n  placeholder="Choose one"\n  label="Label"\n  helper="Assistive text"\n  closeMenuOnSelect={false}\n  multiselect\n/>\n')),Object(a.b)("h2",{id:"demos--api"},"Demos & API"),Object(a.b)("h3",{id:"core"},"Core"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Not included in hds-core!")),Object(a.b)("h3",{id:"react"},"React"),Object(a.b)("p",null,Object(a.b)("a",Object(l.a)({parentName:"p"},{href:"/storybook/react/?path=/story/components-dropdown--default"}),"Dropdowns in hds-react")),Object(a.b)("p",null,Object(a.b)("a",Object(l.a)({parentName:"p"},{href:"/storybook/react/?path=/docs/components-dropdown--default"}),"Dropdown API")))}void 0!==f&&f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/components/dropdown.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-components-dropdown-mdx-eb373d3ac5621ff45291.js.map