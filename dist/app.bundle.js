(()=>{function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function e(t,e,n,r,a){var c=document.getElementById("liste"),o=document.createElement("div");o.classList.add("col-12","col-md-6","pb-3"),c.append(o);var d=document.createElement("div");d.classList.add("card","border","bg-light","shadow","p-3","mb-5","rounded"),o.append(d);var l=document.createElement("div");l.classList.add("card-body"),d.append(l);var i=document.createElement("div");i.classList.add("row"),l.append(i);var s=document.createElement("img");s.classList.add("img-fluid","p-1"),s.setAttribute("src",e),s.setAttribute("alt",t),i.append(s);var u=document.createElement("div");u.classList.add("col-6","col-sm-7","mt-3"),i.append(u);var m=document.createElement("h5");m.classList.add("card-title"),m.textContent=t,u.append(m);var p=document.createElement("div");p.classList.add("col-6","col-sm-5","text-end","mt-3"),i.append(p);var f=document.createElement("h5");f.classList.add("card-title"),f.textContent=new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(r/100),p.append(f);var v=document.createElement("p");v.classList.add("card-text","text-truncate"),v.textContent=n,l.append(v);var y=document.createElement("a");y.classList.add("btn","btn-secondary","stretched-link"),y.setAttribute("href","./src/article.html?_id="+a),y.setAttribute("alt",t),y.textContent="Voir cet article",l.append(y)}fetch("http://localhost:3000/api/furniture").then((function(t){return t.json()})).then((function(n){console.log(n);var r,a=function(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var a=0,c=function(){};return{s:c,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,d=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var t=r.next();return d=t.done,t},e:function(t){l=!0,o=t},f:function(){try{d||null==r.return||r.return()}finally{if(l)throw o}}}}(n);try{for(a.s();!(r=a.n()).done;){var c=r.value;console.log("+"),e(c.name,c.imageUrl,c.description,c.price,c._id)}}catch(t){a.e(t)}finally{a.f()}})).catch((function(t){document.getElementById("error-display").style.display="block",console.log("Erreur Catch: "+t)}))})();