const searchterm = document.querySelector('.main .col-md-12 #getWord');
const appendmovie=document.querySelector('.main .append_movieinfo');
const appengenre=document.querySelector('.main .start');
const current=document.querySelector('.main #current');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  let api_key='22dc6fe777021bc2c093b981619a59eb';
  let base_url = 'https://api.themoviedb.org/3';
  let img_url = 'https://image.tmdb.org/t/p/w500';
  const API_URL = base_url + '/discover/movie?sort_by=popularity.desc&'+'api_key='+api_key;
  let currentPage = 1;
  let nextPage = 2;
  let prevPage = 3;
  let lastUrl = '';
  let totalPages=100;

  function setGenre()
  {
      let selectedGenre = [];
      genres.forEach((genre)=>
      {
        let btn = document.createElement('button');
        btn.setAttribute('class','btn');
        btn.setAttribute('id',`${genre.id}`);
        btn.innerText=(`${genre.name}`);
        appengenre.appendChild(btn);
        btn.addEventListener('click',()=>
        {
                if(selectedGenre.length==0)
                {
                    selectedGenre.push(genre.id);
                }
                else
                {
                    if(selectedGenre.includes(genre.id))
                    {
                        selectedGenre.forEach((id,ind)=>
                        {
                            if(id==genre.id)
                            {
                                selectedGenre.splice(ind,1);
                            }
                        })
                    }
                    else
                    {
                        selectedGenre.push(genre.id);
                    }
                }
                const Data= API_URL +'&with_genres='+selectedGenre.join(',');
                lastUrl=Data;
                fetch(Data).then(data=>data.json()).then( data=>
                  {
                    getMovies(data,img_url);
                  }
                );
        })
      })
  }
  setGenre();
  function getMovies(data,img_url)
  {
      mapdata(data,img_url);
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;

      current.innerText = currentPage;
      if(currentPage <= 1){
        prev.classList.add('disabled');
        next.classList.remove('disabled');
      }else if(currentPage>= totalPages){
        prev.classList.remove('disabled');
        next.classList.add('disabled');
      }else{
        prev.classList.remove('disabled');
        next.classList.remove('disabled');
      }
      searchterm.scrollIntoView({appengenre: 'smooth'});
  }

  prev.addEventListener('click', () => {
    if(prevPage > 0){
      pageCall(prevPage);
    }
  })
  
  next.addEventListener('click', () => {
    if(nextPage <= totalPages){
      pageCall(nextPage);
    }
  })
 
  function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
      let url = lastUrl + '&page='+page;
      fetch(url).then(data=>data.json()).then(data=>
        {
          getMovies(data,img_url);
        })
    }else{
      key[1] = page.toString();
      let a = key.join('=');
      queryParams[queryParams.length -1] = a;
      let b = queryParams.join('&');
      let url = urlSplit[0] +'?'+ b
      fetch(url).then(data=>data.json()).then(data=>
        {
          getMovies(data,img_url);
        })
    }
  }

searchterm.addEventListener('keyup',(e)=>
{
    let word = e.target.value;
    getMovie(word);
});
async function getMovie(word)
{
    try
    {
        const getData = await fetch(`${base_url}/search/movie?&query=${word}&api_key=${api_key}`);
        let realdata = await getData.json();
        if(word === undefined || word==="")
        {
            return;
        }
        mapdata(realdata,img_url);
    }
    catch(error)
    {
        console.log(error);
    }
}
function mapdata(realdata,url)
{
  console.log(realdata)
    let mapdata = realdata.results;
    if(appendmovie.hasChildNodes())
    {
        let removediv = document.querySelectorAll('.append_movieinfo div');
        for(let i=0;i<removediv.length;i++)
        {
            removediv[i].remove();
        }
    }
    mapdata.map(data=>
     {
        let div = document.createElement('div');
        let img = document.createElement('img');
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        div.setAttribute('class','div');
        img.src=`${url.concat(data.poster_path)}`;
        h2.innerText=`${data.title}`;
        p1.innerText=`Release Date: ${data.release_date}`;
        p2.innerText=`${data.overview}`.substr(0,150)+'...';
        p3.innerText=`Rating: ${data.vote_average}`;
        p4.innerText=`Total Vote: ${data.vote_count}`;
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p2);
        appendmovie.appendChild(div);
     })
}