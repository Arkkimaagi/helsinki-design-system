(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{azOn:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return m})),a.d(t,"default",(function(){return u}));var n=a("cxan"),i=a("+wNj"),r=(a("ERkP"),a("ZVZ0")),l=a("9Rvw"),b=a("vWOR"),o=a("vD+s"),s=a("fSvc"),c=a("uZau"),m=(a("l1C2"),{});void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/Contributing/design.mdx"}});var p={_frontmatter:m},d=l.a;function u(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(r.b)(d,Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"contributing-to-design"},"Contributing to Design"),Object(r.b)(o.a,{mdxType:"LargeParagraph"},"Consistent design of components ensures a great user experience across services. You can contribute to HDS design libraries by proposing new components or additional features and fixes to existing ones."),Object(r.b)("p",null,"HDS design versions are managed in City of Helsinki Abstract, in a project called ",Object(r.b)(s.a,{href:"https://share.goabstract.com/4be1120f-5c64-4937-9a56-0484b26e20d7",external:!0,mdxType:"Link"},"Helsinki Design System"),"."),Object(r.b)("p",null,"The design assets are also available as a design kit package which is downloadable from the official ",Object(r.b)(s.a,{href:"https://github.com/City-of-Helsinki/helsinki-design-system/releases",external:!0,mdxType:"Link"},"HDS repository releases"),"."),Object(r.b)("h2",{id:"proposing-a-design"},"Proposing a design"),Object(r.b)("p",null,"There are two ways of proposing new designs to be added to HDS."),Object(r.b)("h3",{id:"1-opening-a-new-branch-to-abstract-repository"},"1. Opening a new branch to Abstract repository"),Object(r.b)("p",null,"If you have access to ",Object(r.b)("em",{parentName:"p"},"City of Helsinki")," organisation and ",Object(r.b)("em",{parentName:"p"},"Helsinki Design System")," project in Abstract follow these steps: "),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Create branch from HDS Master branch.")," Branch name should follow naming convention ",Object(r.b)("em",{parentName:"li"},"Feature request: ","[Component name]"),". If a related Jira ticket exists, add the number of the ticket in the end of the branch name (for example ",Object(r.b)("inlineCode",{parentName:"li"},"Feature request: dropdown-multiselect (HDS-000)"),"). "),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Add designs")," related to your proposals to the component or category library file. If a suitable library for the component does not exist yet, add a new library file named ",Object(r.b)("inlineCode",{parentName:"li"},"HDS [component name]")," See ",Object(r.b)("a",Object(n.a)({parentName:"li"},{href:"/contributing/design#guidelines-for-naming-hds-design-files",title:"Guidelines for HDS design library files"}),"Guidelines for HDS design library files")," bellow for more detailed instructions. "),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"When the design is done, make a commit")," along with a description of what changes were made, your component, how should your component be used and where (give an example layout if possible)."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Submit branch for review")," and add HDS designers as reviewers. They will provide feedback and suggest changes if needed.")),Object(r.b)(c.a,{size:"small",label:"Design reviews",type:"alert",className:"siteNotification",mdxType:"Notification"},"Do not merge your branch to Master without an approved review. HDS team will run the merge if the feature is accepted."),Object(r.b)("h3",{id:"2-creating-an-issue-to-github-repository"},"2. Creating an issue to GitHub repository"),Object(r.b)("p",null,"If you do not have an access to City of Helsinki Abstract and HDS repository, you can create an issue in ",Object(r.b)(s.a,{href:"https://github.com/City-of-Helsinki/helsinki-design-system",external:!0,mdxType:"Link"},"HDS GitHub repository"),". "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Use the component name as issue name and label it as ",Object(r.b)("inlineCode",{parentName:"li"},"feature-request"),"."),Object(r.b)("li",{parentName:"ul"},'When writing the issue, follow "What & why" issue template. Be specific.'),Object(r.b)("li",{parentName:"ul"},"You may attach a Sketch file containing the designs to the issue. You can also attach reference screenshots to illustrate your proposal better.")),Object(r.b)("hr",null),Object(r.b)("h2",{id:"guidelines-for-hds-design-library-files"},"Guidelines for HDS design library files"),Object(r.b)("p",null,"When designing together, things tend to get messy. Here are some guidelines and tips that help us keep HDS library files clean, consistent and easy to use for all."),Object(r.b)("h3",{id:"symbol-naming-and-hierarchy"},"Symbol naming and hierarchy"),Object(r.b)("p",null,"The symbol naming and folder structure of HDS Sketch libraries follows a hierarchy based on ",Object(r.b)("em",{parentName:"p"},"CTI (Category-Type-Item)")," naming practice.\nThe CTI taxonomy is a guiding tool for deciding the hierarchy of symbols rather than a strict rule, and it can be adapted if needed."),Object(r.b)("p",null,"The symbols and layer styles are sorted into folders by descending order of complexity in following hierarchy: "),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"Category / Type / Item / Sub item / Variants / State")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Category"))," defines the primitive nature of a property (for example every property in the category ",Object(r.b)("inlineCode",{parentName:"li"},"Colour")," is always a colour)."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Type"))," is a sub-category only applied to property tokens. ")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: Two levels of ",Object(r.b)("em",{parentName:"strong"},"types")," in Colour ",Object(r.b)("em",{parentName:"strong"},"category"))," "),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-type.png",alt:"Two levels of types in Colour *category",style:{maxWidth:"250px"},viewable:!0,mdxType:"Image"})),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Item"))," is the actual ",Object(r.b)("em",{parentName:"li"},"React component")," or ",Object(r.b)("em",{parentName:"li"},"Token"),". A standalone entity that is meaningful on its own, for example a (",Object(r.b)("inlineCode",{parentName:"li"},"Button"),", ",Object(r.b)("inlineCode",{parentName:"li"},"Dropdown"),") or (",Object(r.b)("inlineCode",{parentName:"li"},"Black"),", ",Object(r.b)("inlineCode",{parentName:"li"},"White"),"). "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Sub-item"))," are standalone variants of items (for example Button component has sub-items ",Object(r.b)("inlineCode",{parentName:"li"},"01 Primary"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Secondary"),", ",Object(r.b)("inlineCode",{parentName:"li"},"03 Supplementary"),")."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Variants"))," are interchangeable symbol versions where some attribute of the item is changed (for example ",Object(r.b)("em",{parentName:"li"},"size, layout, colour tint, font weight, breakpoint size, functionality…"),"). Variants can be for example ",Object(r.b)("inlineCode",{parentName:"li"},"400 Regular"),", ",Object(r.b)("inlineCode",{parentName:"li"},"500 Medium"),"… or . ",Object(r.b)("inlineCode",{parentName:"li"},"Left"),", ",Object(r.b)("inlineCode",{parentName:"li"},"Right"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"An item can have several levels of variants."),Object(r.b)("li",{parentName:"ul"},"Variant levels should preferably be sorted in descending order of scale: ",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Theme")," (light/dark)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Role")," (functionality, feature)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Breakpoint")," (HDS breakpoints)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Size")," (small, medium, large…)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Shape")," (horizontal/vertical)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Position"),"/orientation (left/center/right, top/middle/bottom)"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Content")," (parts) "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Layout")," (alignment and position of content/parts) "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Appearance")," (fill, border, status, font weight…)"))))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"State"))," is a variant of a component caused by user interaction. For example Hover, Active, Disabled, Open, Closed etc.")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: The symbol folder structure in ",Object(r.b)("em",{parentName:"strong"},"HDS Button"),", consists of:")),Object(r.b)("ul",{parentName:"blockquote"},Object(r.b)("li",{parentName:"ul"},"Item ",Object(r.b)("inlineCode",{parentName:"li"},"Buttons")),Object(r.b)("li",{parentName:"ul"},"Sub-Items ",Object(r.b)("inlineCode",{parentName:"li"},"01 Primary"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Secondary")," and ",Object(r.b)("inlineCode",{parentName:"li"},"03 Supplementary")),Object(r.b)("li",{parentName:"ul"},"Variants (1st level) ",Object(r.b)("inlineCode",{parentName:"li"},"01 Default")," and ",Object(r.b)("inlineCode",{parentName:"li"},"02 Small")),Object(r.b)("li",{parentName:"ul"},"Variants (2nd level) ",Object(r.b)("inlineCode",{parentName:"li"},"01 Text"),", ",Object(r.b)("inlineCode",{parentName:"li"},"01 Text + icon left"),"…"),Object(r.b)("li",{parentName:"ul"},"States ",Object(r.b)("inlineCode",{parentName:"li"},"01 Enabled"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Hover"),"…")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-folders.png",alt:"Example of symbol folder strucuture",style:{maxWidth:"230px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h4",{id:"suffixes"},"Suffixes"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"- modifier"))," can be used to differentiate same level variants and states of items.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Modifiers are separated from the variant name with a ",Object(r.b)("em",{parentName:"li"},"dash")," ",Object(r.b)("inlineCode",{parentName:"li"},"-")," (for example ",Object(r.b)("inlineCode",{parentName:"li"},"01 Default - 1 row"),", ",Object(r.b)("inlineCode",{parentName:"li"},"01 Default - 2 rows"),"...)."),Object(r.b)("li",{parentName:"ul"},"If a modifier adds something to the variant, a ",Object(r.b)("em",{parentName:"li"},"plus sign")," ",Object(r.b)("inlineCode",{parentName:"li"},"+"),"  can be used instead (for example ",Object(r.b)("inlineCode",{parentName:"li"},"01 Selection"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Selection + text"),"…)."),Object(r.b)("li",{parentName:"ul"},"A modifier should be in ",Object(r.b)("em",{parentName:"li"},"all lower case"),"."),Object(r.b)("li",{parentName:"ul"},"If the variant hierarchy is particularly complex, variation levels can be added as modifiers to helps differentiating variations in the Sketch symbol menu (for example Body text variant ",Object(r.b)("inlineCode",{parentName:"li"},"Body S - Regular - 01 Black - Center"),")."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"(Additional information)"))," can be added in the end of the name within parentheses ",Object(r.b)("inlineCode",{parentName:"li"},"()"),". For example the specific pixel size of a spacing token.")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: + modifiers used for additional features")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-modifiers.png",alt:"+ modifiers used for additional features",style:{maxWidth:"200px"},viewable:!0,mdxType:"Image"})),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: additional info about spacing token pixel values")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-additional.png",alt:"additional info about spacing token pixel values",style:{maxWidth:"200px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h4",{id:"internal-symbol-folders"},"Internal symbol folders"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"x_Parts"))," and ",Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"x_Sections"))," are helper symbols used only to enable customising component symbols in Sketch. They are not in themselves usable as components.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Parts")," are elements needed for building overrides and larger nested symbols, but are not in standalone items. "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("em",{parentName:"li"},"Sections")," are larger customisable blocks of complex components that need to be overridable in Sketch."),Object(r.b)("li",{parentName:"ul"},"Internal symbols are grouped in ",Object(r.b)("inlineCode",{parentName:"li"},"x_Parts")," and ",Object(r.b)("inlineCode",{parentName:"li"},"x_Sections")," folders, at the root level of the library."),Object(r.b)("li",{parentName:"ul"},"The ",Object(r.b)("inlineCode",{parentName:"li"},"x_")," prefix keeps folders at the bottom of the symbol menu."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"xx_Deprecated")),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Old versions of items that are going to be replaced in future but are still supported, are grouped into a folder ",Object(r.b)("inlineCode",{parentName:"li"},"xx_Deprecated")," on the root level of the library."),Object(r.b)("li",{parentName:"ul"},"The ",Object(r.b)("inlineCode",{parentName:"li"},"xx_")," prefix keeps folders at the bottom of the menu, even bellow ",Object(r.b)("inlineCode",{parentName:"li"},"x_Parts")," and ",Object(r.b)("inlineCode",{parentName:"li"},"x_Sections"),".")))),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: ",Object(r.b)("em",{parentName:"strong"},"x_Parts"),", ",Object(r.b)("em",{parentName:"strong"},"x_Sections")," and ",Object(r.b)("em",{parentName:"strong"},"xx_Deprecated")," folders on HDS Footer")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-parts-sections.png",alt:"x_Parts, x_Sections and xx_Deprecated folders on HDS Footer",style:{maxWidth:"200px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h4",{id:"pages"},"Pages"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"All symbols of one component")," are grouped on ",Object(r.b)("inlineCode",{parentName:"li"},"[Component name]")," page.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Symbols are aligned and organised on the page in clear groupings."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Examples of available variations")," of the component should be presented with ",Object(r.b)("inlineCode",{parentName:"li"},"Example")," artboards.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Example artboard name should state the component or feature introduced (for example ",Object(r.b)("inlineCode",{parentName:"li"},"Example - Responsive sizes"),")."),Object(r.b)("li",{parentName:"ul"},"Single component libraries, example artboards are grouped on ",Object(r.b)("inlineCode",{parentName:"li"},"Examples")," page."),Object(r.b)("li",{parentName:"ul"},"In libraries with more than one component, example artboards can be grouped in the ",Object(r.b)("inlineCode",{parentName:"li"},"[Component name]"),"  page together with component symbols."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Additional instructions")," about the using of Sketch symbols can be documented on ",Object(r.b)("inlineCode",{parentName:"li"},"Instructions")," artboards (for example ",Object(r.b)("inlineCode",{parentName:"li"},"Instructions - Footer sections"),").",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"If the library has instructions, they can be groped on the same page with examples named Examples & Instructions."))),Object(r.b)("li",{parentName:"ul"},"Internal symbols are grouped on x_Parts and x_Sections pages."),Object(r.b)("li",{parentName:"ul"},"If the component has may different sections, each section can be grouped to their own page (for example ",Object(r.b)("inlineCode",{parentName:"li"},"x_Section - Navigation"),")."),Object(r.b)("li",{parentName:"ul"},"Deprecated symbols are grouped on xx_Deprecated page. ")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: pages in a single component library ",Object(r.b)("em",{parentName:"strong"},"HDS Navigation"))),Object(r.b)(b.a,{src:"../../static/contributing-sketch-pages-single.png",alt:"Page structure of a single component library",style:{maxWidth:"230px"},viewable:!0,mdxType:"Image"})),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: pages in a multi component library ",Object(r.b)("em",{parentName:"strong"},"HDS Form fields"))),Object(r.b)(b.a,{src:"../../static/contributing-sketch-pages-multi.png",alt:"Page structure of a multi component library",style:{maxWidth:"230px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h4",{id:"library-file-name"},"Library file name"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"HDS ","[Library name]"))," is usually the same as the ",Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Item")," name of the")," in singular form (for example ",Object(r.b)("inlineCode",{parentName:"li"},"HDS Button"),")."),Object(r.b)("li",{parentName:"ul"},"If several items are grouped in one library, the ",Object(r.b)("strong",{parentName:"li"},Object(r.b)("em",{parentName:"strong"},"Category")," of the items")," is used instead (for example ",Object(r.b)("inlineCode",{parentName:"li"},"HDS Typography"),", ",Object(r.b)("inlineCode",{parentName:"li"},"HDS Form Components"),").")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: HDS library file names")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-libraryname.png",alt:"Example of HDS library file names",style:{maxWidth:"250px"},viewable:!0,mdxType:"Image"})),Object(r.b)("hr",null),Object(r.b)("h2",{id:"symbol-naming-practices"},"Symbol naming practices"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Naming language")," is British English (except colour names that follow the brand guidelines)."),Object(r.b)("li",{parentName:"ul"},"Naming should be consistent in design, implementation and documentation."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Taxonomic levels")," are separated with a forward slash ",Object(r.b)("inlineCode",{parentName:"li"},"/")," to make a folder.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"No spaces are used around the forward slash ",Object(r.b)("inlineCode",{parentName:"li"},"/"),"."),Object(r.b)("li",{parentName:"ul"},"Start folder names with a ",Object(r.b)("em",{parentName:"li"},"capital letter"),"."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Emoji prefixes")," and ",Object(r.b)("em",{parentName:"li"},"all caps")," can be used in layer names to make the hierarchy of complex override menus clearer:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"❇️ ",Object(r.b)("strong",{parentName:"li"},"[SECTION NAME]")," can be used to highlight ",Object(r.b)("em",{parentName:"li"},"sections")," (for example ",Object(r.b)("inlineCode",{parentName:"li"},"❇️NAVIGATION"),")."),Object(r.b)("li",{parentName:"ul"},"🔹",Object(r.b)("strong",{parentName:"li"},"[Item]")," can be used to highlight ",Object(r.b)("em",{parentName:"li"},"overridable items"),". The name can also be in ",Object(r.b)("em",{parentName:"li"},"all caps")," to make it more distinct (for example ",Object(r.b)("inlineCode",{parentName:"li"},"🔹Base - link"),", ",Object(r.b)("inlineCode",{parentName:"li"},"🔹DIVIDER"),")."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Sketch smart layout hacks")," may demand extraneous groups to work. In these situations, mark ",Object(r.b)("inlineCode",{parentName:"li"},"(smart layout)")," in the name of the group.")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: Emoji prefixes in ",Object(r.b)("em",{parentName:"strong"},"HDS Footer")," layer names")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-layer-prefix.png",alt:"Emoji prefixes in HDS Footer layer names",style:{maxWidth:"230px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h3",{id:"naming-variant-types"},"Naming variant types"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"The basic form")," of the component can be named ",Object(r.b)("inlineCode",{parentName:"li"},"01 Basic")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Recommended")," variant can be named ",Object(r.b)("inlineCode",{parentName:"li"},"01 Default")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Size")," variants are named with ",Object(r.b)("em",{parentName:"li"},"T-shirt sizes")," ",Object(r.b)("inlineCode",{parentName:"li"},"S"),", ",Object(r.b)("inlineCode",{parentName:"li"},"M"),", ",Object(r.b)("inlineCode",{parentName:"li"},"L"),", ",Object(r.b)("inlineCode",{parentName:"li"},"XL"),", ",Object(r.b)("inlineCode",{parentName:"li"},"2XL"),"…)."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Colour theme")," variants are named ",Object(r.b)("inlineCode",{parentName:"li"},"01 light")," and ",Object(r.b)("inlineCode",{parentName:"li"},"02 Dark")," according to their background colour. "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"breakpoints")," are always named in the same way:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"01 XL Desktop (≥ 1248)")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"02 L Desktop (≥ 992)")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"03 M Tablet (≥ 768)")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"04 S Mobile (≥ 576)")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"05 XS Mobile (≥ 320)"))))),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: Colour theme and breakpoint variants in HDS Footer")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-variants.png",alt:"Colour theme and breakpoint variants of footer",style:{maxWidth:"230px"},viewable:!0,mdxType:"Image"})),Object(r.b)("h3",{id:"sorting-variants"},"Sorting variants"),Object(r.b)("p",null,"Numbering can be used in front of the name for listing symbols in specific order."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Running numbering")," with a leading zero is used for general sorting (for example ",Object(r.b)("inlineCode",{parentName:"li"},"01 Primary"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Secondary"),", ",Object(r.b)("inlineCode",{parentName:"li"},"03 Supplementary"),")."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Semantic numbering")," can be used to help communicating variants (for example naming font weights by css values: ",Object(r.b)("inlineCode",{parentName:"li"},"400 Regular"),", ",Object(r.b)("inlineCode",{parentName:"li"},"500 Medium"),", ",Object(r.b)("inlineCode",{parentName:"li"},"700 Bold"),"."),Object(r.b)("li",{parentName:"ul"},"A good practice is to order variants from simple to complex (for example ",Object(r.b)("inlineCode",{parentName:"li"},"01 Text"),", ",Object(r.b)("inlineCode",{parentName:"li"},"02 Text + heading"),"…).")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("strong",{parentName:"p"},"Example: Sorting variants in ",Object(r.b)("em",{parentName:"strong"},"HDS Typography")," uses custom prefix for alignment")),Object(r.b)(b.a,{src:"../../static/contributing-sketch-symbol-sorting.png",alt:"Sorting variants in HDS Tpography",style:{maxWidth:"180px"},viewable:!0,mdxType:"Image"})),Object(r.b)("hr",null),Object(r.b)("h2",{id:"quality-assurance-checklist"},"Quality assurance checklist"),Object(r.b)("p",null,"With the following checklist you can check your design files before merging them to HDS master."),Object(r.b)("p",null,"Besides checking HDS library files, this list can also be applied to any Sketch project for better organisation."),Object(r.b)("p",null,"This checklist is (in most parts) also available as a ",Object(r.b)(s.a,{href:"https://www.sketch.com/extensions/assistants/",external:!0,mdxType:"Link"},"Sketch Assistant")," that automatically runs a preflight check for Sketch files."),Object(r.b)("p",null,"For more information see the ",Object(r.b)(s.a,{href:"https://github.com/ronijaakkola/hds-assistant",external:!0,mdxType:"Link"},"HDS Assistant Github page"),". You can also ",Object(r.b)(s.a,{href:"sketch://add-assistant?url=https://github.com/City-of-Helsinki/hds-assistant/releases/latest/download/hds-assistant.tgz",external:!0,mdxType:"Link"},"add HDS Assistant directly to Sketch by pressing this link"),"."),Object(r.b)("h3",{id:"styles"},"Styles"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Use shared text and layer styles in components")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Text layers")," are styled with ",Object(r.b)("inlineCode",{parentName:"li"},"HDS Typography")," text styles. "),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Layer fills and borders")," are styled with ",Object(r.b)("inlineCode",{parentName:"li"},"HDS Colour")," shared styles. "),Object(r.b)("li",{parentName:"ul"},"Don’t use local styles. All styles used in HDS components should be found in HDS libraries."),Object(r.b)("li",{parentName:"ul"},"Respect the shared styles. Don’t customise or brake the linking to original style. This can cause trouble, if shared styles are updated later on."),Object(r.b)("li",{parentName:"ul"},"If the style you need is missing from shared styles propose adding a shared style to the HDS style libraries.")),Object(r.b)("h3",{id:"layout"},"Layout"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Align elements and artboards to pixel grid")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Use HDS Spacing values for margins and paddings"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Use ",Object(r.b)("inlineCode",{parentName:"li"},"Spacing")," tokens for components internal spacing."),Object(r.b)("li",{parentName:"ul"},"Use ",Object(r.b)("inlineCode",{parentName:"li"},"Layout")," tokens for margins between elements in layout.")))),Object(r.b)("h3",{id:"layers-and-groups"},"Layers and groups"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Order layers in a hierarchy that is easy to understand from the symbol menu overrides."),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Layer order = order of overrides in the symbol menu."),Object(r.b)("li",{parentName:"ul"},"Layer order and hierarchy should follow the layout order."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Give layers and groups names that state their purpose or content"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Avoid automatically generated names like ",Object(r.b)("inlineCode",{parentName:"li"},"Copy"),", ",Object(r.b)("inlineCode",{parentName:"li"},"Group")," … "))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Group layers that belong together")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Delete hidden layers or groups")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Delete loose layers or groups that are outside artboards")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Delete empty groups")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Ungroup unnecessary groups"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Groups should have at least two items in them."),Object(r.b)("li",{parentName:"ul"},"Avoid groups that have only one another group in them."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Note!")," Sketch smart layout hacks may demand extraneous groups to work. In these situations, mark ",Object(r.b)("inlineCode",{parentName:"li"},"(smart layout)")," in the name of the group.")))),Object(r.b)("h3",{id:"symbols-and-overrides"},"Symbols and overrides"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Follow the HDS guidelines for symbol names and folder hierarchy"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Variant names are easy to understand from the symbol menu and overrides."),Object(r.b)("li",{parentName:"ul"},"Interchangeable variants are grouped so that are easy to swap from the symbol menu and override."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Avoid designing custom parts for components"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Always check if there’s an existing HDS component to answer your need, before making a custom part."),Object(r.b)("li",{parentName:"ul"},"If custom parts are needed for example to make customisable nested symbols, group them in x_Parts folder. See naming conventions for more detail. "))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Overridable text fields default value states the fields purpose")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Hide unnecessary overrides")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Check that the symbol Smart layout works, and allows all the customisation needed"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Margins and paddings are fixed."),Object(r.b)("li",{parentName:"ul"},"Height and width of elements that should not scale are fixed. For example Icons."),Object(r.b)("li",{parentName:"ul"},"Text fields scale in appropriate directions when symbol is scaled."),Object(r.b)("li",{parentName:"ul"},"Text fields scale in appropriate directions when content is customised.")))))}void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/Contributing/design.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-contributing-design-mdx-6ba04edb6871b3f9a1e1.js.map