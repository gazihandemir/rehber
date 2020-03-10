const rehberList = document.querySelector('#rehber-list')
const form = document.querySelector('#rehber-form')
function renderRehber(doc){
        let li = document.createElement('li');
        let isim = document.createElement('span');
        let numara = document.createElement('span');
        
        let sil = document.createElement('div');
        sil.textContent ='X';
        li.setAttribute('data-id',doc.id);
        isim.textContent = doc.data().ad;
        
        numara.textContent = doc.data().numara;
        li.appendChild(isim);
        li.appendChild(numara);
        li.appendChild(sil);
        rehberList.appendChild(li);

        sil.addEventListener('click',(e) =>{
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('rehber').doc(id).delete();
        })
}

db.collection('rehber').orderBy('ad').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    //console.log(changes);

    changes.forEach(change =>{
        // console.log(change.doc.data);
        
        if(change.type =='added'){
            renderRehber(change.doc);
        }else if(change.type='removed'){
            let li = rehberList.querySelector('[data-id='+change.doc.id+']');

            rehberList.removeChild(li);
        }

    } )

})

// verileri getirme
/*
db.collection('rehber').get().then((snapshot) =>{
    //console.log(snapshot.docs)
    snapshot.docs.forEach(doc =>{
        console.log(doc.data());
        renderRehber(doc);
    })
})
*/
 /*
db.collection('rehber').where('numara','>').orderBy('ad').get().then((snapshot) =>{
    //console.log(snapshot.docs)
    snapshot.docs.forEach(doc =>{
        console.log(doc.data());
        renderRehber(doc);
    })
})
 */
/*
db.collection('rehber').orderBy('ad').get().then((snapshot) =>{
    //console.log(snapshot.docs)
    snapshot.docs.forEach(doc =>{
        console.log(doc.data());
        renderRehber(doc);
    })
})
*/
// verileri sorgulama
/*db.collection('rehber').where('ad','==','ali').get().then((snapshot) =>{
    //console.log(snapshot.docs)
    snapshot.docs.forEach(doc =>{
        console.log(doc.data());
        renderRehber(doc);
    })
})
*/

// veri ekleme
form.addEventListener('submit',(e) =>{
    e.preventDefault();

    db.collection('rehber').add({
        ad:form.isim.value,
        numara:form.no.value
    });
    form.isim.value='';
    form.no.value='';
})