console.log(`19_miniblog`);

const headlineObj = document.getElementById(`headline`);
const navObj = document.getElementsByClassName(`navlinks`);
const contentObj = document.getElementById(`content`);


const read = async () => {
    let allcommments = "";
    navObj[0].classList.add(`active`);
    navObj[1].classList.remove(`active`);

    const result = await fetch('http://localhost:3000/blogposts');
    const data = await result.json();

    for (comment of data) {
        allcommments += `<div class="singlepost">
        <div class="commentHeadline">
        <h4>${comment.id} - ${comment.title}</h4>
        <p>Erstellt: ${comment.created}</p>
        </div>
        <hr></br>
        <p>${comment.content}<p>
        </div>
        `;
    }

    contentObj.innerHTML = allcommments;
}



const post = () => {
    navObj[0].classList.remove(`active`);
    navObj[1].classList.add(`active`);
    contentObj.innerHTML = ` <input type="text" id="titelEingabe" placeholder="Hier Titel eingeben">;
    <textarea id="textEingabe" cols="30" rows="10" placeholder ="Hier Text eingeben"></textarea>
    <button id="addPost">Artikel erstellen</button>`;


    
    const addPostObj = document.getElementById('addPost');
    addPostObj.onclick = async () => {

        const titelEingabeObj = document.getElementById('titelEingabe');
        const textEingabeObj = document.getElementById('textEingabe');
      
        if (!(titelEingabeObj.value.length > 0 && textEingabeObj.value.length > 0)) {
            alert('Alle Felder müssen ausgefüllt sein.');
            return;
        }

        const body = {
            title : titelEingabeObj.value,
            content: textEingabeObj.value
        }

        try {
            const response = await fetch('http://localhost:3000/blogposts', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            });

            if (response.ok) {

                responseJson = await response.json();
                read();

            }
        } catch (e) {
            console.log('Error: ' + e);
        }
    }
}

headlineObj.onclick = () => {
    navObj[0].classList.remove(`active`);
    navObj[1].classList.remove(`active`);
    contentObj.innerHTML=`<div class="welcome">
    <h3>Welcome to my Blog</h3>
</div>
    `
}