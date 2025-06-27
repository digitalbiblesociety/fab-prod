function T(e,s){if(e===s)return 0;const t=Array.from({length:e.length+1},(n,r)=>r);for(let n=1;n<=s.length;n++){let r=t[0];t[0]=n;for(let i=1;i<=e.length;i++){const p=t[i];t[i]=Math.min(t[i]+1,t[i-1]+1,r+(e[i-1]!==s[n-1])),r=p}}return t[e.length]}function j(e,s,t){const n=e.toLowerCase(),p=Math.max(.5,.9-(n.length>10?.15:n.length*.05));return s.reduce((d,a)=>{let $=0,x=0;return t.forEach(w=>{if(a[w]){const k=a[w].toString().toLowerCase(),y=T(n,k)/Math.max(n.length,k.length);y<=p&&($+=y,x++)}}),x>0&&d.push({item:a,score:$/x}),d},[]).sort((d,a)=>d.score-a.score)}let b="",h=[],o=[],m=[],L=[];const f=document.getElementById("search-input"),l=f?.dataset?.locale,c=f?.dataset?.t,g=f?.dataset?.scope;async function z(){const t=(await(await fetch("/site.json")).json()).data;L=Object.keys(t),L.forEach(n=>{t[n].forEach(r=>{r.type=n,m.push(r)})})}z();document.addEventListener("DOMContentLoaded",E);document.addEventListener("astro:after-swap",E);function E(){const e=document.getElementById("search-input");e&&e.addEventListener("input",s=>{b=s.target.value,I()})}function I(){if(!(!m||m.length===0)){if(!b.trim()){M();return}h=j(b,m,["tv","tt","ta","id"]),o=h.reduce((e,s)=>{const t=s.item.type;return e[t]=e[t]||[],e[t].push(s),e},{}),h.length>0,B()}}function M(){const e=document.getElementById("search-results-wrapper");e.innerHTML=""}const v=(e,s)=>e.item[s]??"",u=(e,s,t,n,r="",i="")=>`
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
          ${r?`<div>${r}</div>`:t==="all"&&(e.item.ci||s==="countries")?`
                <svg class="mx-2 inline-block h-5 w-5 drop-shadow-md">
                  <use href="/images/flags.svg#${e.item.id}" xlink:href="#${e.item.id}" />
                </svg>
                `:""}
        </div>
        <div class="min-w-0 flex-1 ml-4 text-left">
          <h4 class="truncate max-w-[90%] text-stone-900 dark:text-stone-200">${v(e,"tt")}</h4>
          ${e.item.tt!==e.item.tv&&e.item.tv?`<p class="truncate mt-1 text-sm text-stone-500 dark:text-stone-300">${v(e,"tv")}</p>`:""}
        </div>
        ${i?`
              <small class="text-stone-600 dark:text-stone-200 mr-4 -ml-4">
                ${v(e,"id")||i}
              </small>`:""}
      </button>
    </li>
  `;function B(){const e=document.getElementById("search-results-wrapper");if(e.innerHTML="",h.length===0)return;const s=`
      <div class="fixed top-18 inset-x-4 z-10 transform shadow-2xl border border-stone-300 dark:border-stone-900 rounded-lg">
        <div class="absolute inset-0 bg-white dark:bg-stone-700" aria-hidden="true">
          <div class="hidden sm:block w-1/2 bg-white dark:bg-stone-700"></div>
          <div class="hidden sm:block w-1/2 bg-stone-50 dark:bg-stone-800"></div>
        </div>

        <div class="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 py-6 divide-x-2 gap-4 dark:divide-stone-900">
          ${o.languages?`
                <nav class="flex flex-col lg:pb-8">
                  <div class="flex-grow">
                    <div>
                      <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                        ${c?.languages??"Languages"}
                      </h3>
                      <ul id="search_languages" class="grid px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2">
                        ${o.languages.slice(0,10).map(t=>u(t,"languages",g,`/${l}/languages/${t.item.id}`)).join("")}
                      </ul>
                    </div>
                  </div>
                </nav>`:""}

          ${o.bibles?`
                <div class="flex flex-col">
                  <div class="sm:px-6 px-4 lg:px-8 xl:pl-12 flex-grow">
                    <div>
                      <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                        ${c?.bibles??"Bibles"}
                      </h3>
                      <ul id="search_bibles" class="grid px-4 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        ${o.bibles.slice(0,5).map(t=>u(t,"bibles",g,`/${l}/bibles/${t.item.id}`)).join("")}
                      </ul>
                    </div>
                  </div>
                </div>`:""}
        </div>

        ${o.countries||o.organizations?`
              <div class="relative mx-auto grid max-w-7xl grid-cols-2 pt-2 lg:pt-4 md:px-4 mt-2 border-t-4 dark:border-stone-900 mb-4 divide-x-2 gap-4 dark:divide-stone-900">
                ${o.countries?`
                      <div>
                        <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                          ${c?.countries??"Countries"}
                        </h3>
                        <ul class="grid grid-cols-2 gap-2">
                          ${o.countries.slice(0,2).map(t=>u(t,"countries",g,`/${l}/countries/${t.item.id}`)).join("")}
                        </ul>
                      </div>`:""}

                ${o.organizations?`
                      <div>
                        <h3 class="text-base text-blue-600 mb-4 dark:text-stone-100 text-center font-bold">
                          ${c?.organizations??"Organizations"}
                        </h3>
                        <ul class="grid grid-cols-2 gap-2 pl-4">
                          ${o.organizations.slice(0,2).map(t=>u(t,"organizations",g,`/${l}/organizations/${t.item.id}`)).join("")}
                        </ul>
                      </div>`:""}
              </div>`:""}
      </div>`;e.insertAdjacentHTML("beforeend",s)}document.addEventListener("click",e=>{const s=document.getElementById("search-results-wrapper");s.contains(e.target)||(s.innerHTML="")});
