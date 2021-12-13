const searchterm = document.querySelector('.main .col-md-12 #getWord');
const appendmovie=document.querySelector('.main .append_movieinfo');
searchterm.addEventListener('keyup',(e)=>
{
    let word = e.target.value;
    getMovie(word);
});
async function getMovie(word)
{
    try
    {
        let api_key='22dc6fe777021bc2c093b981619a59eb';
        let base_url = 'https://api.themoviedb.org/3';
        let img_url = 'https://image.tmdb.org/t/p/w500';
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
        div.setAttribute('class','div');
        img.src=`${url.concat(data.poster_path)}`;
        h2.innerText=`${data.title}`;
        p1.innerText=`Release Date: ${data.release_date}`;
        p2.innerText=`${data.overview}`.substr(0,150)+'...';
        p3.innerText=`Rating: ${data.vote_average}`;
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p3);
        div.appendChild(p2);
        appendmovie.appendChild(div);
     })
}