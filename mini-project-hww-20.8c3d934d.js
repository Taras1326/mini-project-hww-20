let t=document.getElementById("search-form"),e=document.querySelector(".gallery"),a=document.querySelector(".load-more"),i="",s=1,l=0;async function r(){try{let t,r=await fetch(`https://pixabay.com/api/?key=54251385-6f7a6e7accba74a4972a9b1fa&q=${i}&image_type=photo&orientation=horizontal&page=${s}&per_page=12`);if(!r.ok)throw Error("Помилка отримання");let o=await r.json();if(l=o.totalHits,1===s&&0===o.hits.length)return void PNotify.alert({text:"Зображення не знайдено",type:"помилка"});t=o.hits.map(t=>`
    <li>
      <div class="photo-card">
        <img 
          src="${t.webformatURL}" 
          data-large="${t.largeImageURL}"
          alt="${t.tags}" 
        />

        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${t.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${t.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>
            ${t.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${t.downloads}
          </p>
        </div>
      </div>
    </li>
  `).join(""),e.insertAdjacentHTML("beforeend",t),1===s&&PNotify.alert({text:`\u{437}\u{43D}\u{430}\u{439}\u{434}\u{435}\u{43D}\u{43E} ${l} \u{43A}\u{430}\u{440}\u{442}\u{438}\u{43D}\u{43E}\u{43A}`,type:"успіх"}),12*s<l?a.classList.remove("hidden"):(a.classList.add("hidden"),PNotify.alert({text:"кінець",type:"інформація"})),function(){let t=e.firstElementChild;if(!t)return;let{height:a}=t.getBoundingClientRect();window.scrollBy({top:2*a,behavior:"smooth"})}()}catch(t){PNotify.alert({text:"Щось не так",type:"помилка"})}}a.classList.add("hidden"),t.addEventListener("submit",async t=>{t.preventDefault(),(i=t.target.elements.query.value.trim())&&(s=1,e.innerHTML="",a.classList.add("hidden"),await r())}),a.addEventListener("click",async()=>{s+=1,await r()}),e.addEventListener("click",t=>{if("IMG"!==t.target.nodeName)return;let e=t.target.dataset.large;basicLightbox.create(`
    <img src="${e}" width="100%">
  `).show()});
//# sourceMappingURL=mini-project-hww-20.8c3d934d.js.map
