console.log('Hola Mundo')

const dire= 'http://localhost:4000/api/bands'
const contenedor = document.querySelector('.contenedor');

fetch(dire)
.then(res =>res.json())
.then(banda=>{

  const li = banda.map(e=>{
    return `<li class="li" id='li${e.id}'><div class="nombre">${e.name}</div>
    <p class="estado">${e.genre}</p>
      
      </li>`
    }).join('')

    // <button class="eliminar" onclick="eliminar(${e.id})">Eliminar</button>
    // <button class="discos" onclick="verDiscos(${e.id})"> Ver Discos</button>

    contenedor.innerHTML= li;
})

const eliminar = e=>{

  fetch(`${dire}/${e}`, {method:'delete'})
 .then(res=>{
  
  document.getElementById(`li${e}`).remove()
  })

}

const verDiscos = e=>{
  fetch(`${dire}/${e}/albums`)
  .then(res =>res.json())
  .then(disco =>{

    const li = disco.map(e=>{
      return `<li id='li${e.id}'><h4>${e.name}</h4>
      <span class="estado">Year: ${e.year}</span>
      </li>`
      }).join('')
  
    contenedor.innerHTML= li;
  })
}

const form = document.getElementById('nueva_banda');
form.onsubmit = e=>{
  e.preventDefault();

  const nuevaBanda = document.querySelector('#nueva_banda input[name="banda"]').value;
  const nuevoGenero = document.querySelector('#nueva_banda input[name="genero"]').value;
  const banda = {
    name: nuevaBanda,
    genre:nuevoGenero
  }

  console.log(banda);

  fetch(dire, {
    method: 'POST',
    body: JSON.stringify(banda),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  .then(res => res.json())

  .then(banda=>{
    const agregarBanda=`<li id='li${banda.id}'><h2>${banda.name}</h2>
    <span class="estado">${banda.genre}</span>
      <button class="eliminar" onclick="eliminar(${banda.id})">Eliminar</button>
      <button class="discos" onclick="verDiscos(${banda.id})"> Ver Discos</button>
      </li>`

    contenedor.innerHTML+=agregarBanda;
  })
}
