import"./hoisted.UDKN0QyT.js";import"./index.U3IA9L3b.js";function v(e){return Array.isArray?Array.isArray(e):ne(e)==="[object Array]"}const fe=1/0;function pe(e){if(typeof e=="string")return e;let t=`${e}`;return t==="0"&&1/e===-fe?"-0":t}function ge(e){return e==null?"":pe(e)}function x(e){return typeof e=="string"}function se(e){return typeof e=="number"}function me(e){return e===!0||e===!1||be(e)&&ne(e)==="[object Boolean]"}function re(e){return typeof e=="object"}function be(e){return re(e)&&e!==null}function m(e){return e!=null}function P(e){return!e.trim().length}function ne(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const we="Incorrect 'index' type",ke=e=>`Invalid value for key ${e}`,xe=e=>`Pattern length exceeds max of ${e}.`,ye=e=>`Missing ${e} property in key`,ve=e=>`Property 'weight' in key '${e}' must be a positive integer`,K=Object.prototype.hasOwnProperty;class Ce{constructor(t){this._keys=[],this._keyMap={};let s=0;for(const r of t){let n=ae(r);this._keys.push(n),this._keyMap[n.id]=n,s+=n.weight}for(const r of this._keys)r.weight/=s}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ae(e){let t=null,s=null,r=null,n=1,a=null;if(x(e)||v(e))r=e,t=Q(e),s=D(e);else{if(!K.call(e,"name"))throw new Error(ye("name"));const i=e.name;if(r=i,K.call(e,"weight")&&(n=e.weight,n<=0))throw new Error(ve(i));t=Q(i),s=D(i),a=e.getFn}return{path:t,id:s,weight:n,src:r,getFn:a}}function Q(e){return v(e)?e:e.split(".")}function D(e){return v(e)?e.join("."):e}function Ee(e,t){let s=[],r=!1;const n=(a,i,o)=>{if(m(a))if(!i[o])s.push(a);else{let l=i[o];const c=a[l];if(!m(c))return;if(o===i.length-1&&(x(c)||se(c)||me(c)))s.push(ge(c));else if(v(c)){r=!0;for(let d=0,h=c.length;d<h;d+=1)n(c[d],i,o+1)}else i.length&&n(c,i,o+1)}};return n(e,x(t)?t.split("."):t,0),r?s:s[0]}const Me={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},Se={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},Ne={location:0,threshold:.6,distance:100},Ae={useExtendedSearch:!1,getFn:Ee,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};let u={...Se,...Me,...Ne,...Ae};const Ie=/[^ ]+/g;function _e(e=1,t=3){const s=new Map,r=10**t;return{get(n){const a=n.match(Ie).length;if(s.has(a))return s.get(a);const i=1/a**(.5*e),o=Number.parseFloat(Math.round(i*r)/r);return s.set(a,o),o},clear(){s.clear()}}}class J{constructor({getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){this.norm=_e(s,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((s,r)=>{this._keysMap[s.id]=r})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,x(this.docs[0])?this.docs.forEach((t,s)=>{this._addString(t,s)}):this.docs.forEach((t,s)=>{this._addObject(t,s)}),this.norm.clear())}add(t){const s=this.size();x(t)?this._addString(t,s):this._addObject(t,s)}removeAt(t){this.records.splice(t,1);for(let s=t,r=this.size();s<r;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(t,s){return t[this._keysMap[s]]}size(){return this.records.length}_addString(t,s){if(!m(t)||P(t))return;let r={v:t,i:s,n:this.norm.get(t)};this.records.push(r)}_addObject(t,s){let r={i:s,$:{}};this.keys.forEach((n,a)=>{let i=n.getFn?n.getFn(t):this.getFn(t,n.path);if(m(i)){if(v(i)){let o=[];const l=[{nestedArrIndex:-1,value:i}];for(;l.length;){const{nestedArrIndex:c,value:d}=l.pop();if(m(d))if(x(d)&&!P(d)){let h={v:d,i:c,n:this.norm.get(d)};o.push(h)}else v(d)&&d.forEach((h,f)=>{l.push({nestedArrIndex:f,value:h})})}r.$[a]=o}else if(x(i)&&!P(i)){let o={v:i,n:this.norm.get(i)};r.$[a]=o}}}),this.records.push(r)}toJSON(){return{keys:this.keys,records:this.records}}}function ie(e,t,{getFn:s=u.getFn,fieldNormWeight:r=u.fieldNormWeight}={}){const n=new J({getFn:s,fieldNormWeight:r});return n.setKeys(e.map(ae)),n.setSources(t),n.create(),n}function Le(e,{getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){const{keys:r,records:n}=e,a=new J({getFn:t,fieldNormWeight:s});return a.setKeys(r),a.setIndexRecords(n),a}function $(e,{errors:t=0,currentLocation:s=0,expectedLocation:r=0,distance:n=u.distance,ignoreLocation:a=u.ignoreLocation}={}){const i=t/e.length;if(a)return i;const o=Math.abs(r-s);return n?i+o/n:o?1:i}function ze(e=[],t=u.minMatchCharLength){let s=[],r=-1,n=-1,a=0;for(let i=e.length;a<i;a+=1){let o=e[a];o&&r===-1?r=a:!o&&r!==-1&&(n=a-1,n-r+1>=t&&s.push([r,n]),r=-1)}return e[a-1]&&a-r>=t&&s.push([r,a-1]),s}const A=32;function Te(e,t,s,{location:r=u.location,distance:n=u.distance,threshold:a=u.threshold,findAllMatches:i=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:l=u.includeMatches,ignoreLocation:c=u.ignoreLocation}={}){if(t.length>A)throw new Error(xe(A));const d=t.length,h=e.length,f=Math.max(0,Math.min(r,h));let p=a,g=f;const b=o>1||l,S=b?Array(h):[];let y;for(;(y=e.indexOf(t,g))>-1;){let w=$(t,{currentLocation:y,expectedLocation:f,distance:n,ignoreLocation:c});if(p=Math.min(w,p),g=y+d,b){let C=0;for(;C<d;)S[y+C]=1,C+=1}}g=-1;let _=[],N=1,z=d+h;const ue=1<<d-1;for(let w=0;w<d;w+=1){let C=0,E=z;for(;C<E;)$(t,{errors:w,currentLocation:f+E,expectedLocation:f,distance:n,ignoreLocation:c})<=p?C=E:z=E,E=Math.floor((z-C)/2+C);z=E;let G=Math.max(1,f-E+1),R=i?h:Math.min(f+E,h)+d,L=Array(R+2);L[R+1]=(1<<w)-1;for(let k=R;k>=G;k-=1){let T=k-1,Y=s[e.charAt(T)];if(b&&(S[T]=+!!Y),L[k]=(L[k+1]<<1|1)&Y,w&&(L[k]|=(_[k+1]|_[k])<<1|1|_[k+1]),L[k]&ue&&(N=$(t,{errors:w,currentLocation:T,expectedLocation:f,distance:n,ignoreLocation:c}),N<=p)){if(p=N,g=T,g<=f)break;G=Math.max(1,2*f-g)}}if($(t,{errors:w+1,currentLocation:f,expectedLocation:f,distance:n,ignoreLocation:c})>p)break;_=L}const O={isMatch:g>=0,score:Math.max(.001,N)};if(b){const w=ze(S,o);w.length?l&&(O.indices=w):O.isMatch=!1}return O}function $e(e){let t={};for(let s=0,r=e.length;s<r;s+=1){const n=e.charAt(s);t[n]=(t[n]||0)|1<<r-s-1}return t}class oe{constructor(t,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:a=u.includeMatches,findAllMatches:i=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:l=u.isCaseSensitive,ignoreLocation:c=u.ignoreLocation}={}){if(this.options={location:s,threshold:r,distance:n,includeMatches:a,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c},this.pattern=l?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const d=(f,p)=>{this.chunks.push({pattern:f,alphabet:$e(f),startIndex:p})},h=this.pattern.length;if(h>A){let f=0;const p=h%A,g=h-p;for(;f<g;)d(this.pattern.substr(f,A),f),f+=A;if(p){const b=h-A;d(this.pattern.substr(b),b)}}else d(this.pattern,0)}searchIn(t){const{isCaseSensitive:s,includeMatches:r}=this.options;if(s||(t=t.toLowerCase()),this.pattern===t){let g={isMatch:!0,score:0};return r&&(g.indices=[[0,t.length-1]]),g}const{location:n,distance:a,threshold:i,findAllMatches:o,minMatchCharLength:l,ignoreLocation:c}=this.options;let d=[],h=0,f=!1;this.chunks.forEach(({pattern:g,alphabet:b,startIndex:S})=>{const{isMatch:y,score:_,indices:N}=Te(t,g,b,{location:n+S,distance:a,threshold:i,findAllMatches:o,minMatchCharLength:l,includeMatches:r,ignoreLocation:c});y&&(f=!0),h+=_,y&&N&&(d=[...d,...N])});let p={isMatch:f,score:f?h/this.chunks.length:1};return f&&r&&(p.indices=d),p}}class M{constructor(t){this.pattern=t}static isMultiMatch(t){return X(t,this.multiRegex)}static isSingleMatch(t){return X(t,this.singleRegex)}search(){}}function X(e,t){const s=e.match(t);return s?s[1]:null}class Be extends M{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const s=t===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Fe extends M{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const r=t.indexOf(this.pattern)===-1;return{isMatch:r,score:r?0:1,indices:[0,t.length-1]}}}class Oe extends M{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const s=t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Re extends M{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const s=!t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class Pe extends M{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const s=t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class De extends M{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const s=!t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class le extends M{constructor(t,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:a=u.includeMatches,findAllMatches:i=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:l=u.isCaseSensitive,ignoreLocation:c=u.ignoreLocation}={}){super(t),this._bitapSearch=new oe(t,{location:s,threshold:r,distance:n,includeMatches:a,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class ce extends M{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let s=0,r;const n=[],a=this.pattern.length;for(;(r=t.indexOf(this.pattern,s))>-1;)s=r+a,n.push([r,s-1]);const i=!!n.length;return{isMatch:i,score:i?0:1,indices:n}}}const j=[Be,ce,Oe,Re,De,Pe,Fe,le],Z=j.length,je=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,We="|";function He(e,t={}){return e.split(We).map(s=>{let r=s.trim().split(je).filter(a=>a&&!!a.trim()),n=[];for(let a=0,i=r.length;a<i;a+=1){const o=r[a];let l=!1,c=-1;for(;!l&&++c<Z;){const d=j[c];let h=d.isMultiMatch(o);h&&(n.push(new d(h,t)),l=!0)}if(!l)for(c=-1;++c<Z;){const d=j[c];let h=d.isSingleMatch(o);if(h){n.push(new d(h,t));break}}}return n})}const Ue=new Set([le.type,ce.type]);class Ve{constructor(t,{isCaseSensitive:s=u.isCaseSensitive,includeMatches:r=u.includeMatches,minMatchCharLength:n=u.minMatchCharLength,ignoreLocation:a=u.ignoreLocation,findAllMatches:i=u.findAllMatches,location:o=u.location,threshold:l=u.threshold,distance:c=u.distance}={}){this.query=null,this.options={isCaseSensitive:s,includeMatches:r,minMatchCharLength:n,findAllMatches:i,ignoreLocation:a,location:o,threshold:l,distance:c},this.pattern=s?t:t.toLowerCase(),this.query=He(this.pattern,this.options)}static condition(t,s){return s.useExtendedSearch}searchIn(t){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let a=0,i=[],o=0;for(let l=0,c=s.length;l<c;l+=1){const d=s[l];i.length=0,a=0;for(let h=0,f=d.length;h<f;h+=1){const p=d[h],{isMatch:g,indices:b,score:S}=p.search(t);if(g){if(a+=1,o+=S,r){const y=p.constructor.type;Ue.has(y)?i=[...i,...b]:i.push(b)}}else{o=0,a=0,i.length=0;break}}if(a){let h={isMatch:!0,score:o/a};return r&&(h.indices=i),h}}return{isMatch:!1,score:1}}}const W=[];function Je(...e){W.push(...e)}function H(e,t){for(let s=0,r=W.length;s<r;s+=1){let n=W[s];if(n.condition(e,t))return new n(e,t)}return new oe(e,t)}const B={AND:"$and",OR:"$or"},U={PATH:"$path",PATTERN:"$val"},V=e=>!!(e[B.AND]||e[B.OR]),Ge=e=>!!e[U.PATH],Ye=e=>!v(e)&&re(e)&&!V(e),q=e=>({[B.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function de(e,t,{auto:s=!0}={}){const r=n=>{let a=Object.keys(n);const i=Ge(n);if(!i&&a.length>1&&!V(n))return r(q(n));if(Ye(n)){const l=i?n[U.PATH]:a[0],c=i?n[U.PATTERN]:n[l];if(!x(c))throw new Error(ke(l));const d={keyId:D(l),pattern:c};return s&&(d.searcher=H(c,t)),d}let o={children:[],operator:a[0]};return a.forEach(l=>{const c=n[l];v(c)&&c.forEach(d=>{o.children.push(r(d))})}),o};return V(e)||(e=q(e)),r(e)}function Ke(e,{ignoreFieldNorm:t=u.ignoreFieldNorm}){e.forEach(s=>{let r=1;s.matches.forEach(({key:n,norm:a,score:i})=>{const o=n?n.weight:null;r*=Math.pow(i===0&&o?Number.EPSILON:i,(o||1)*(t?1:a))}),s.score=r})}function Qe(e,t){const s=e.matches;t.matches=[],m(s)&&s.forEach(r=>{if(!m(r.indices)||!r.indices.length)return;const{indices:n,value:a}=r;let i={indices:n,value:a};r.key&&(i.key=r.key.src),r.idx>-1&&(i.refIndex=r.idx),t.matches.push(i)})}function Xe(e,t){t.score=e.score}function Ze(e,t,{includeMatches:s=u.includeMatches,includeScore:r=u.includeScore}={}){const n=[];return s&&n.push(Qe),r&&n.push(Xe),e.map(a=>{const{idx:i}=a,o={item:t[i],refIndex:i};return n.length&&n.forEach(l=>{l(a,o)}),o})}class I{constructor(t,s={},r){this.options={...u,...s},this.options.useExtendedSearch,this._keyStore=new Ce(this.options.keys),this.setCollection(t,r)}setCollection(t,s){if(this._docs=t,s&&!(s instanceof J))throw new Error(we);this._myIndex=s||ie(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){m(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const s=[];for(let r=0,n=this._docs.length;r<n;r+=1){const a=this._docs[r];t(a,r)&&(this.removeAt(r),r-=1,n-=1,s.push(a))}return s}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:r,includeScore:n,shouldSort:a,sortFn:i,ignoreFieldNorm:o}=this.options;let l=x(t)?x(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return Ke(l,{ignoreFieldNorm:o}),a&&l.sort(i),se(s)&&s>-1&&(l=l.slice(0,s)),Ze(l,this._docs,{includeMatches:r,includeScore:n})}_searchStringList(t){const s=H(t,this.options),{records:r}=this._myIndex,n=[];return r.forEach(({v:a,i,n:o})=>{if(!m(a))return;const{isMatch:l,score:c,indices:d}=s.searchIn(a);l&&n.push({item:a,idx:i,matches:[{score:c,value:a,norm:o,indices:d}]})}),n}_searchLogical(t){const s=de(t,this.options),r=(o,l,c)=>{if(!o.children){const{keyId:h,searcher:f}=o,p=this._findMatches({key:this._keyStore.get(h),value:this._myIndex.getValueForItemAtKeyId(l,h),searcher:f});return p&&p.length?[{idx:c,item:l,matches:p}]:[]}const d=[];for(let h=0,f=o.children.length;h<f;h+=1){const p=o.children[h],g=r(p,l,c);if(g.length)d.push(...g);else if(o.operator===B.AND)return[]}return d},n=this._myIndex.records,a={},i=[];return n.forEach(({$:o,i:l})=>{if(m(o)){let c=r(s,o,l);c.length&&(a[l]||(a[l]={idx:l,item:o,matches:[]},i.push(a[l])),c.forEach(({matches:d})=>{a[l].matches.push(...d)}))}}),i}_searchObjectList(t){const s=H(t,this.options),{keys:r,records:n}=this._myIndex,a=[];return n.forEach(({$:i,i:o})=>{if(!m(i))return;let l=[];r.forEach((c,d)=>{l.push(...this._findMatches({key:c,value:i[d],searcher:s}))}),l.length&&a.push({idx:o,item:i,matches:l})}),a}_findMatches({key:t,value:s,searcher:r}){if(!m(s))return[];let n=[];if(v(s))s.forEach(({v:a,i,n:o})=>{if(!m(a))return;const{isMatch:l,score:c,indices:d}=r.searchIn(a);l&&n.push({score:c,key:t,value:a,idx:i,norm:o,indices:d})});else{const{v:a,n:i}=s,{isMatch:o,score:l,indices:c}=r.searchIn(a);o&&n.push({score:l,key:t,value:a,norm:i,indices:c})}return n}}I.version="7.0.0";I.createIndex=ie;I.parseIndex=Le;I.config=u;I.parseQuery=de;Je(Ve);function qe(e,t){const s=t.id,r=e.sortedCol===s;return e.sortedCol=r?"":s,t.type==="int"||t.type==="year"||t.type==="bool"?e.table.sort((n,a)=>{const i=n[s]!==void 0&&n[s]!==null?Number(n[s]):-1/0,o=a[s]!==void 0&&a[s]!==null?Number(a[s]):-1/0;return r?o-i:i-o}):e.table.sort((n,a)=>{const i=n[s]??"",o=a[s]??"";return r?o.localeCompare(i):i.localeCompare(o)})}const ee=(e,t)=>{const s=(i,o)=>[(i+1)*o-o,(i+1)*o],[r,n]=s(e.currentPage,e.size),a=e.table.slice(r,n);t.innerHTML="";for(const i of a){const o=document.createElement("tr");o.className=e.classes.tr;for(const l of e.head){const c=document.createElement("td");c.className=`${l.class??""} ${l.id} ${e.classes.tableColumn??""}`,l.type&&c.setAttribute("data-type",l.type);const d=i[l.id]??"",h=st(e,d,l.type,e.locale),f=new DocumentFragment;if(l.icon&&f.appendChild(et(l.icon,i[l.icon.id]??"")),l.img&&f.appendChild(tt(l.img,i[l.img.id]??"")),f.appendChild(document.createTextNode(h)),l.subtitle){const p=document.createElement("em");p.className=e.classes.tableCellSubtitle,p.innerText=i[l.subtitle]??"",f.appendChild(p)}if(l.link){const p=document.createElement("a");p.className=e.classes.tableCellLink,p.href=`${l.link.base?l.link.base:""}${i[l.link.id]}`,p.appendChild(f),c.appendChild(p)}else c.appendChild(f);l.suffix&&d!==""&&c.appendChild(e.safeHtml(l.suffix)),l.hideZeros&&d===0&&c.classList.add("hidden"),o.appendChild(c)}t.appendChild(o)}},et=(e,t)=>{const s=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","use");return r.setAttribute("href",`${e.base}${t}`),r.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`#${t}`),e.class&&s.setAttribute("class",e.class),s.appendChild(r),s},tt=(e,t)=>{const s=document.createElement("img");return s.setAttribute("src",`${e.base}${t}${e.ext??""}`),e.class&&s.setAttribute("class",e.class),s},st=(e,t,s,r)=>{if(s==="int")return new Intl.NumberFormat(r).format(t);if(s==="date"||s==="year"){if(s==="date"){const n=new Date(t);return new Intl.DateTimeFormat(r).format(n)}else if(s==="year"){const n=new Date(t,0,1);return new Intl.DateTimeFormat(r,{year:"numeric"}).format(n)}}return s==="bool"?t?e.checkMark:e.xMark:t},rt={pagination:"",sortArrow:"",arrowUp:"absolute right-2 top-1.5 text-sm",arrowDown:"absolute right-2 bottom-1.5 text-sm",paginationButton:"w-auto h-10 px-4 inline-flex justify-center items-center border dark:border-stone-900",paginationButtonCurrent:"text-lg font-bold text-[#F8BB39]",paginationNav:"relative z-0 flex mt-4 justify-center rounded-md -space-x-px dark:text-[#f8f8f0]",downloadButton:"relative inline-flex items-center bg-white dark:bg-stone-700 px-2 h-12 dark:text-[#f8f8f0] ring-1 ring-inset ring-stone-400 dark:ring-stone-800 focus:z-10",downloadDropdown:"absolute left-0 z-50 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",downloadDropdownButton:"text-stone-700 dark:text-[#f8f8f0] hover:dark:bg-stone-900 hover:bg-stone-200 w-full block px-4 py-2 text-sm text-left",downloadDropdownInfo:"text-center text-xs text-stone-700 dark:text-[#f8f8f0] py-2",fieldsetWrap:"block mt-8 w-full bg-gray-200 dark:bg-stone-700 text-sm font-semibold p-3 text-stone-900 dark:text-[#f8f8f0] border-b border-stone-200 dark:border-stone-500 rounded-t-lg",fieldsetFilterWrap:"mb-4 dark:bg-stone-900 border border-stone-200 dark:border-stone-950 p-2",fieldset:"mb-4 dark:bg-stone-900 border border-stone-200 dark:border-stone-950 p-2",filterContainer:"hidden sm:flex flex-col lg:w-1/5 ltr:mr-4 rtl:ml-4",filterButton:"text-sm relative px-2 py-1 my-2 w-full flex items-center justify-center cursor-pointer rounded-lg border dark:text-[#f8f8f0] dark:bg-stone-800 border-stone-200 dark:border-stone-500 shadow-sm",filterButtonActive:"bg-stone-400 dark:bg-stone-950 text-white border-stone-800",tableContainer:"flex flex-col w-full relative z-10 max-w-7xl mx-auto",tableColumn:"whitespace-nowrap px-3 py-2 text-sm text-stone-800 dark:text-[#f8f8f0] border border-stone-200 dark:border-stone-800 relative truncate max-w-[240px]",searchInput:"relative indent-6 block w-full h-12 px-4 text-sm shadow-lg border border-stone-400 dark:border-stone-800 dark:bg-stone-700 text-stone-800 dark:text-stone-300 placeholder-stone-800 dark:placeholder-stone-100 ltr:rounded-tl-xl rtl:rounded-tr-xl",searchIcon:"absolute block w-6 h-6 z-30 mt-3 mx-2 text-white",searchWrapper:"w-full h-12 flex-shrink",sizeSelectContainer:"w-36 relative",sizeSelect:"appearance-none w-full h-full bg-white dark:bg-stone-700 dark:text-[#f8f8f0] text-center ring-1 ring-inset ring-stone-400 dark:ring-stone-800 rtl:rounded-tl-lg ltr:rounded-tr-lg",tableHeader:"flex flex-row mt-8 h-12",tableCellLink:"text-[#F8BB39]",table:"w-full",thead:"bg-stone-100 dark:bg-stone-700",tbody:"divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-800 border border-stone-500 dark:border-none",th:"relative px-1 py-3 rtl:pr-7 ltr:text-left rtl:text-right text-sm font-semibold text-stone-900 dark:text-[#f8f8f0] cursor-pointer",tr:"dark:even:bg-stone-900",td:"whitespace-nowrap px-3 py-2 text-sm text-stone-800 dark:text-[#f8f8f0] border border-stone-200 dark:border-stone-800 relative truncate max-w-[240px]"},nt=(e={})=>{const t={...rt};for(const s of Object.keys(e))s.startsWith("_")?t[s.substring(1)]=e[s]:t[s]=e[s];return t};function at(e){if(e.filters.length>0){const t=document.createElement("div");t.className=e.classes.filterContainer,t.id="fuzzy_filters",e.filters.forEach((s,r)=>{const n=document.createElement("div");n.className=e.classes.fieldsetWrap,n.textContent=s.name,t.appendChild(n);const a=ot(s,r,lt,e);t.appendChild(a)}),e.container.appendChild(t)}}function it(e,t,s){const r=document.createElement("button");return r.className=`${e.filterButton} ${t.active?e.filterButtonActive:""}`,r.textContent=t.title,r.onclick=s,r}function ot(e,t,s,r){const n=document.createElement("fieldset");return n.className=r.classes.fieldset,e.options.forEach((a,i)=>{const o=it(r.classes,a,()=>s(r,t,i));n.appendChild(o)}),n}function lt(e,t,s){let r=e.data;e.filters[t].options[s].active=e.filters[t].options[s].values!=="",e.filters[t].filterType==="radio"&&e.filters[t].options.forEach((a,i)=>{i!==s&&(e.filters[t].options[i].active=!1)}),e.filters[t].options[s].active=!0;for(const a of e.filters)for(const i of a.options.filter(o=>o.active))console.log(i),r=r.filter(o=>{const l=i.value.test(o[a.filterColumn]);return i.active=!0,i.inverse?!l:l});e.currentPage=0,e.table=r,e.updateTable(),e.fuse=new I(e.table,{shouldSort:!0,includeMatches:!0,threshold:.3,location:0,distance:50,maxPatternLength:12,minMatchCharLength:1,keys:e.head.filter(a=>a.searchable!==!1).map(a=>a.id)}),e.paginationUpdate(e);const n=document.getElementById("fuzzy_filters");e.filters.forEach((a,i)=>{const o=n.children[i*2+1];a.options.forEach((l,c)=>{const d=o.children[c],h=e.classes.filterButtonActive.split(" ");for(const f of h)l.active?d.classList.add(f):d.classList.remove(f)})})}function he(e,t){if(!e.paginationNav){e.paginationNav=document.createElement("nav"),e.paginationNav.id="paginationNav",e.classes.paginationNav&&(e.paginationNav.className=e.classes.paginationNav);const s=document.createElement("div");e.classes.tablePagination&&(s.className=e.classes.tablePagination),s.id="paginationContainer",s.appendChild(e.paginationNav),t.appendChild(s)}F(e)}const F=e=>{const t=e.paginationNav,s=Math.ceil(e.table.length/e.size);e.displayPages=dt(e.currentPage,s,4),t.innerHTML="";const r=document.createDocumentFragment();if(e.currentPage>0&&!e.paginationArrowButtonsDisabled){const n=te(e,"back");r.appendChild(n)}for(const n of e.displayPages){const a=ct(e,n);r.appendChild(a)}if(e.currentPage<s-1&&!e.paginationArrowButtonsDisabled){const n=te(e,"forward");r.appendChild(n)}t.appendChild(r)};function te(e,t){const s=document.createElement("button");return s.textContent=t==="back"?"<":">",s.classList.add(...e.classes.paginationButton.split(" ")),e.classes.paginationArrow&&s.classList.add(...e.classes.paginationArrow.split(" ")),s.onclick=()=>{e.currentPage+=t==="back"?-1:1,e.updateTable(),F(e)},s}function ct(e,t){if(t==="..."){const r=document.createElement("span");return r.classList.add(...e.classes.paginationButton.split(" ")),r.textContent="...",r}const s=document.createElement("button");return s.textContent=e.numberFormatter.format(t+1),s.classList.add(...e.classes.paginationButton.split(" ")),e.currentPage===t&&s.classList.add(...e.classes.paginationButtonCurrent.split(" ")),s.onclick=()=>{e.currentPage=t,e.updateTable(),F(e)},s}function dt(e,t,s){const r=[],n=Math.max(e-s,0),a=Math.min(e+s,t-1);n>1?r.push(0,"..."):n===1&&r.push(0);for(let i=n;i<=a;i++)r.push(i);return a<t-2?r.push("...",t-1):a===t-2&&r.push(t-1),r}function ht(e){const t=document.createElement("label");t.className=e.classes.searchWrapper;const s=document.createElement("input");s.type="search",s.id="fuzzy_search",s.placeholder=e.t?.search_placeholder??"Search",s.className=e.classes.searchInput;const r=document.createElement("span");return r.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>`,r.className=e.classes.searchIcon,t.appendChild(r),t.appendChild(s),s.oninput=()=>{if(e.searchBox.value!=="")e.table=e.fuse.search(e.searchBox.value).slice(0,100).map(n=>n.item);else{let n=e.data;for(const a of e.filters)for(const i of a.options.filter(o=>o.active))n=n.filter(o=>{const l=i.value.test(o[a.filterColumn]);return i.active=!0,i.inverse?!l:l});e.table=n}e.currentPage=0,e.updateTable(),he(e)},e.searchBox=s,t}function ut(e){const t=["JSON","TSV","CSV"],s=document.createElement("details");s.id="fuzzy_download_details",s.className="relative";const r=document.createElement("summary");r.className=e.classes.downloadButton;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("fill","none"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke","currentColor"),n.setAttribute("class","w-6 h-6"),n.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />',r.appendChild(n);const a=document.createElement("div");a.className=e.classes.downloadDropdown,a.innerHTML=`<p class="${e.classes.downloadDropdownInfo}">(Download current filtered dataset)</p>`;for(const i of t){const o=document.createElement("button");o.className=e.classes.downloadDropdownButton,o.textContent=i,o.onclick=()=>ft(e.table,i),a.appendChild(o)}return s.appendChild(r),s.appendChild(a),document.addEventListener("click",i=>{!s.contains(i.target)&&s.hasAttribute("open")&&s.removeAttribute("open")}),s}function ft(e,t){const s=(l,c)=>{const d=Object.keys(l[0]).join(c),h=l.map(f=>Object.values(f).join(c)).join(`
`);return`${d}
${h}`};let r,n,a;switch(t){case"TSV":r="text/tab-separated-values",n="data.tsv",a=s(e,"	");break;case"CSV":r="text/csv",n="data.csv",a=s(e,",");break;default:r="application/json",n="data.json",a=JSON.stringify(e,null,2);break}const i=new Blob([a],{type:r}),o=document.createElement("a");o.download=n,o.href=URL.createObjectURL(i),document.body.appendChild(o),o.click(),document.body.removeChild(o)}function pt(e){const t=document.createElement("div");e.classes.sizeSelectContainer&&(t.className=e.classes.sizeSelectContainer);const s=document.createElement("label");s.setAttribute("for","fuzzy_size_select"),s.className="sr-only",s.textContent="Select Page Size",t.appendChild(s);const r=document.createElement("select");r.id="fuzzy_size_select",e.classes.sizeSelect&&(r.className=e.classes.sizeSelect),t.appendChild(r);const n=new Intl.NumberFormat(e.locale);for(const a of e.pageSizes){const i=document.createElement("option");i.value=a,i.textContent=n.format(a),a===e.size&&(i.selected=!0),r.appendChild(i)}return r.value=e.size,r.addEventListener("change",a=>{e.size=a.target.value,e.currentPage=0,e.paginationUpdate(),e.updateTable()}),t}class gt{constructor(t,s,r,n){this.container=document.getElementById(t),s?(this.data=[...s],this.table=[...s]):(this.data=[...JSON.parse(this.container.dataset.rows)],this.table=[...JSON.parse(this.container.dataset.rows)]),this.searchBox,this.query="",this.sortedCol="",this.filters=n.filters??[],this.head=r,r?this.head=r:this.head=[...JSON.parse(this.container.dataset.head)],this.filteredTable=[],this.size=n.pageSize??this.container?.dataset?.pageSize??10,this.currentPage=0,this.pageSizes=n.pageSizes??this.container?.dataset?.pageSizes??[10,150,500,1e3,5e3],this.paginationArrowButtonsDisabled=n?.paginationArrowButtonsDisabled,this.classes=nt(n.classes),this.checkMark=n?.checkMark??this.container?.dataset?.checkMark??"✓",this.xMark=n?.xMark??this.container?.dataset?.xMark??"✗",this.locale=n.locale??"en",this.numberFormatter=new Intl.NumberFormat(this.locale),this.t=n.t??{search_placeholder:"Search"},this.vernacularNumerals=n.vernacularNumerals??!0,this.fuse=new I(this.table,{shouldSort:!0,includeMatches:!0,threshold:.3,location:0,distance:50,maxPatternLength:12,minMatchCharLength:1,useExtendedSearch:!0,keys:this.head.filter(a=>a.searchable!==!1).map(a=>a.id)}),this.render()}setData(t){this.update(()=>{this.data=t,this.table=t,this.filteredTable=t.filter(()=>!0)})}render=()=>{this.container.innerHTML="",at(this);const t=document.createElement("div");t.className=this.classes.tableContainer;const s=document.createElement("div");s.className=this.classes.tableHeader,s.appendChild(ht(this)),s.appendChild(ut(this)),s.appendChild(pt(this));const r=document.createElement("table");r.className=this.classes.table;const n=document.createElement("thead");this.classes.thead&&(n.className=this.classes.thead);for(const i of this.head){const o=document.createElement("th");o.className=`${this.classes.th??""} ${i.class??""}`,o.textContent=i.name;const l=document.createElement("span"),c=document.createElement("span");l.className=this.classes.arrowUp,c.className=this.classes.arrowDown,l.textContent="▲",c.textContent="▼",l.style.opacity=.35,c.style.opacity=.35,o.appendChild(l),o.appendChild(c),o.addEventListener("click",()=>{for(const h of document.querySelectorAll("th span"))h.style.opacity=.35;o.classList.toggle("ascending")?(l.style.opacity=1,c.style.opacity=.35):(c.style.opacity=1,l.style.opacity=.35),this.table=qe(this,i),this.updateTable()}),n.appendChild(o)}r.appendChild(n);const a=document.createElement("tbody");a.id="fuzzy-rows",this.classes.tbody&&(a.className=this.classes.tbody),ee(this,a),r.appendChild(a),t.appendChild(s),t.appendChild(r),he(this,t),this.container.append(t)};safeHtml=t=>{const s=document.createElement("div");s.innerHTML=t;for(const r of["script","iframe","link","style","object","embed"]){const n=s.getElementsByTagName(r);for(let a=n.length-1;a>=0;a--)n[a].parentNode.removeChild(n[a])}return s.firstChild};paginationUpdate=()=>F(this);updateTable=()=>ee(this,document.getElementById("fuzzy-rows"))}const mt={zh:"zh-u-nu-hanidec",hn:"hi-IN-u-nu-deva",te:"te-IN-u-nu-telu",ta:"ta-IN-u-nu-deva",bn:"bn-IN-u-nu-beng",ar:"ar-u-nu-arab",mr:"mr-IN-u-nu-deva"};function bt(e,t){if(typeof t=="string"&&/^\/.*\/$/.test(t)){let s=t.match(/\/(.*?)\/([gimsuy]*)$/);return new RegExp(s[1],s[2])}return t}document.addEventListener("astro:page-load",()=>{const e=document.getElementById("FuzzyTableWrapper"),t={pagination:"",sortArrow:"",arrowUp:"absolute right-2 top-1.5 ext-sm",arrowDown:"absolute right-2 bottom-1.5 text-sm",searchIcon:"absolute block w-6 h-6 z-30 mt-3 mx-2 text-stone-400 dark:text-white",searchInput:"relative indent-6 block w-full h-12 px-4 text-sm shadow-lg border border-stone-400 dark:border-stone-800 dark:bg-stone-700 text-stone-800 dark:text-stone-300 placeholder-stone-800 dark:placeholder-stone-100 rtl:rounded-tr-xl",paginationButton:"w-16 h-10 inline-flex justify-center items-center border dark:border-stone-900",paginationButtonCurrent:"text-lg font-bold text-primary-500",paginationNav:"relative z-0 flex mt-4 justify-center rounded-md -space-x-px dark:text-[#f8f8f0]",downloadButton:"relative inline-flex items-center bg-white dark:bg-stone-700 px-2 h-12 dark:text-[#f8f8f0] border border-stone-400 dark:border-stone-800 focus:z-10",downloadDropdown:"absolute left-0 z-50 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",downloadDropdownButton:"text-stone-700 dark:text-[#f8f8f0] hover:dark:bg-stone-900 hover:bg-stone-200 w-full block px-4 py-2 text-sm text-left",downloadDropdownInfo:"text-center text-xs text-stone-700 dark:text-[#f8f8f0] py-2",fieldsetWrap:"block mt-8 w-full bg-gray-200 dark:bg-stone-700 text-sm font-semibold p-3 text-stone-900 dark:text-[#f8f8f0] border-b border-stone-200 dark:border-stone-500 rounded-t-lg",fieldsetFilterWrap:"mb-4 dark:bg-stone-900 border border-stone-200 dark:border-stone-950 p-2",fieldset:"mb-4 dark:bg-stone-900 border border-stone-200 dark:border-stone-950 p-2",filterContainer:"hidden sm:flex flex-col lg:w-1/5 ltr:mr-4 rtl:ml-4",filterButton:"text-sm relative px-2 py-1 my-2 w-full flex items-center justify-center cursor-pointer rounded-lg border dark:text-[#f8f8f0] dark:bg-stone-800 border-stone-200 dark:border-stone-500 shadow-sm",filterButtonActive:"bg-stone-400 dark:bg-stone-950 text-white border-stone-800",tableContainer:"flex flex-col w-full relative z-10 max-w-7xl mx-auto",tableColumn:"whitespace-nowrap px-3 py-2 text-sm text-stone-800 dark:text-[#f8f8f0] border border-stone-200 dark:border-stone-800 relative truncate max-w-[240px]",sizeSelect:"appearance-none w-full h-full px-6 bg-white dark:bg-stone-700 dark:text-[#f8f8f0] text-center border-stone-400 dark:border-stone-800 rtl:rounded-tl-lg ltr:rounded-tr-lg",tableHeader:"flex flex-row mt-8 h-12",tableCellLink:"text-primary-700 dark:text-primary-400 block py-1",tableCellSubtitle:"block text-sm text-stone-500 dark:text-stone-400 tracking-wide",table:"w-full w-6xl overflow-x-scroll",thead:"bg-stone-100 dark:bg-stone-700",tbody:"divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-800 border border-stone-500 dark:border-none",th:"relative px-1 py-3 rtl:pr-7 ltr:text-left rtl:text-right text-sm font-semibold text-stone-900 dark:text-[#f8f8f0] cursor-pointer",tr:"even:bg-stone-100 dark:even:bg-stone-900",td:"whitespace-nowrap px-3 py-2 text-sm text-stone-800 dark:text-[#f8f8f0] border border-stone-200 dark:border-stone-800 relative truncate max-w-[240px]"},s=JSON.parse(e?.dataset?.filters,bt);e&&new gt("FuzzyTableWrapper",JSON.parse(e.dataset.rows),JSON.parse(e.dataset.head),{t:e.dataset.t,filters:s??[],classes:t,locale:mt[e.dataset.locale]??"en-US",pageSize:50,pageSizes:[50,100,500,2e3]})});