function E(e,s){if(e===s)return 0;const t=Array.from({length:e.length+1},(n,o)=>o);for(let n=1;n<=s.length;n++){let o=t[0];t[0]=n;for(let r=1;r<=e.length;r++){const m=t[r];t[r]=Math.min(t[r]+1,t[r-1]+1,o+(e[r-1]!==s[n-1])),o=m}}return t[e.length]}function T(e,s,t){const n=e.toLowerCase(),m=Math.max(.5,.9-(n.length>10?.15:n.length*.05));return s.reduce((d,a)=>{let b=0,p=0;return t.forEach(f=>{if(a[f]){const w=a[f].toString().toLowerCase(),$=E(n,w)/Math.max(n.length,w.length);$<=m&&(b+=$,p++)}}),p>0&&d.push({item:a,score:b/p}),d},[]).sort((d,a)=>d.score-a.score)}let x="",u=[],i=[],h=[],k=[],l={};const j=document.getElementById("search-input"),c=j?.dataset?.scope;async function y(){try{const e=document.documentElement.lang||"en",s=await fetch(`/i18n/${e}.json`);s.ok&&(l=await s.json())}catch(e){console.error("Failed to load translations for search:",e)}}async function z(){const t=(await(await fetch("/site.json")).json()).data;k=Object.keys(t),k.forEach(n=>{t[n].forEach(o=>{o.type=n,h.push(o)})})}Promise.all([z(),y()]);document.addEventListener("DOMContentLoaded",L);document.addEventListener("astro:after-swap",L);window.addEventListener("locale-changed",()=>{y()});function L(){const e=document.getElementById("search-input");e&&e.addEventListener("input",s=>{x=s.target.value,I()})}function I(){if(!(!h||h.length===0)){if(!x.trim()){M();return}u=T(x,h,["tv","tt","ta","id"]),i=u.reduce((e,s)=>{const t=s.item.type;return e[t]=e[t]||[],e[t].push(s),e},{}),u.length>0,B()}}function M(){const e=document.getElementById("search-results-wrapper");e.innerHTML=""}const v=(e,s)=>e.item[s]??"",g=(e,s,t,n,o="",r="")=>`
    <li class="flow-root text-center bg-stone-50 dark:bg-stone-800">
      <button 
        onclick="
          event.preventDefault();
          dropdownVisible = false;
          query = '';
          document.getElementById('search-input').value = '';
          setTimeout(() => { window.location.href = '${n}'; }, 25);
        " 
        class="flex justify-around items-center w-full h-16 lg:h-18 border-stone-100 dark:border-stone-950 border rounded-md lg:py-2 px-1 transition duration-150 ease-in-out hover:bg-stone-200 dark:hover:bg-stone-900"
      >
        <div class="flex-shrink-0 text-stone-400">
          ${o?`<div>${o}</div>`:t==="all"&&(e.item.ci||s==="countries")?`
                <svg class="mx-2 inline-block h-5 w-5 drop-shadow-md">
                  <use href="/images/flags.svg#${e.item.id}" xlink:href="#${e.item.id}" />
                </svg>
                `:""}
        </div>
        <div class="min-w-0 flex-1 ml-4 text-left">
          <h4 class="truncate max-w-[90%] text-stone-900 dark:text-stone-200">${v(e,"tt")}</h4>
          ${e.item.tt!==e.item.tv&&e.item.tv?`<p class="truncate mt-1 text-sm text-stone-500 dark:text-stone-300">${v(e,"tv")}</p>`:""}
        </div>
        ${r?`
              <small class="text-stone-600 dark:text-stone-200 mr-4 -ml-4">
                ${v(e,"id")||r}
              </small>`:""}
      </button>
    </li>
  `;function B(){const e=document.getElementById("search-results-wrapper");if(e.innerHTML="",u.length===0)return;const s=`
      <div class="fixed top-18 inset-x-4 z-10 transform shadow-2xl border border-stone-300 dark:border-stone-900 rounded-lg">
        <div class="absolute inset-0 bg-white dark:bg-stone-700" aria-hidden="true">
          <div class="hidden sm:block w-1/2 bg-white dark:bg-stone-700"></div>
          <div class="hidden sm:block w-1/2 bg-stone-50 dark:bg-stone-800"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 py-6 divide-x-2 gap-4 dark:divide-stone-900">
          ${i.languages?`
                <nav class="flex flex-col lg:pb-8">
                  <div class="flex-grow">
                    <div>
                      <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                        ${l.languages||"Languages"}
                      </h3>
                      <ul id="search_languages" class="grid px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2">
                        ${i.languages.slice(0,10).map(t=>g(t,"languages",c,`/languages/${t.item.id}`)).join("")}
                      </ul>
                    </div>
                  </div>
                </nav>`:""}

          ${i.bibles?`
                <div class="flex flex-col">
                  <div class="sm:px-6 px-4 lg:px-8 xl:pl-12 flex-grow">
                    <div>
                      <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                        ${l.bibles||"Bibles"}
                      </h3>
                      <ul id="search_bibles" class="grid px-4 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        ${i.bibles.slice(0,5).map(t=>g(t,"bibles",c,`/bibles/${t.item.id}`)).join("")}
                      </ul>
                    </div>
                  </div>
                </div>`:""}
        </div>

        ${i.countries||i.organizations?`
              <div class="relative mx-auto grid max-w-7xl grid-cols-2 pt-2 lg:pt-4 md:px-4 mt-2 border-t-4 dark:border-stone-900 mb-4 divide-x-2 gap-4 dark:divide-stone-900">
                ${i.countries?`
                      <div>
                        <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                          ${l.countries||"Countries"}
                        </h3>
                        <ul class="grid grid-cols-2 gap-2">
                          ${i.countries.slice(0,2).map(t=>g(t,"countries",c,`/countries/${t.item.id}`)).join("")}
                        </ul>
                      </div>`:""}

                ${i.organizations?`
                      <div>
                        <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                          ${l.organizations||"Organizations"}
                        </h3>
                        <ul class="grid grid-cols-2 gap-2 pl-4">
                          ${i.organizations.slice(0,2).map(t=>g(t,"organizations",c,`/organizations/${t.item.id}`)).join("")}
                        </ul>
                      </div>`:""}
              </div>`:""}
      </div>`;e.insertAdjacentHTML("beforeend",s)}document.addEventListener("click",e=>{const s=document.getElementById("search-results-wrapper");s.contains(e.target)||(s.innerHTML="")});
